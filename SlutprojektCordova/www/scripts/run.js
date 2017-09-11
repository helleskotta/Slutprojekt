document.addEventListener("deviceready", function() {

    // Run program

    var currentWO = JSON.parse(storage.getItem("currentWO"));
    $("#nameofProgram").html(currentWO.sessionName);

    var content = "";

    // Alla övningar
    for (var k = 0; k < currentWO.exercises.length; k++) {

        var exerciseString = "";
        exerciseString += '<div class="exerciseWrapper"><h2 style="font-weight:bold; text-align:left;"> ' + currentWO.exercises[k].exerciseChoice + '</h2>' + '<table class="ovning" style="width:100%; border-bottom: 2px dashed #dbdbdb; padding:2px 5px 20px 0;"> <tr> <td style="width:25%;"></td> <td style="width:40%;">Reps</td> <td style="width:40%;">Kg</td> <td style="width:5%;"></td> </tr>';

        // En övning
        for (var j = 0; j < currentWO.exercises[k].sets.length; j++) {
            var oneRow = '<tr> <td style="font-weight:bold; font-size:14px;">SET' + (j + 1) + '</td> <td>';
            if (currentWO.exercises[k].sets[j].reps === null) {
                oneRow += '<input class="repsCount" type="number" style="width:50%;" />';
            } else {
                oneRow += '<input class="repsCount" value="' + currentWO.exercises[k].sets[j].reps + '" type="number" style="width:50%;" />';
            }
            oneRow += '</td > <td>';
            if (currentWO.exercises[k].sets[j].weight === null) {
                oneRow += '<input class="weightCount" type="number" style="width:50%;" />';

            } else {
                oneRow += '<input value="' + currentWO.exercises[k].sets[j].weight + '" type="number" style="width:50%;" />';
            }

            oneRow += '</td> <td><input type="button" class="deletefield" style="padding: 1px; font-size:20px; background:transparent; color:#888; text-align:right; text-transform:lowercase;" value="x" /></td> </tr > ';
            exerciseString += oneRow;
        }

        var endof = "";
        endof += '<tr> <td> <img class="addanotherrun" src="images/add40.png" style="margin:auto; width:20px; height:20px;" /> </td> <td></td><td><br /><br /><input type="button" class="finishOneExercise" value="Finish exercise" /></td></tr> </table></div>'
        exerciseString += endof;

        content += exerciseString;
    }

    $("#fullprogram").append(content);



    // ADD FINISHED STRENGTH WORKOUT
    $("#addfinishedwo").click(function() {

        var exerciseArray = [];

        $(".exerciseWrapper").each(function(index, element) {
            var setArray = [];

            var repsCount = [];
            $(element).find(".repsCount").each(function(repsCountIndex, repsCountElement) {
                repsCount[repsCountIndex] = $(repsCountElement).val();
            });

            var weightCount = [];
            $(element).find(".weightCount").each(function(weightCountIndex, weightCountElement) {
                weightCount[weightCountIndex] = $(weightCountElement).val();
            });

            for (var i = 0; i < repsCount.length; i++) {

                setArray.push({ Reps: repsCount[i], Weight: weightCount[i] });
            }

            var exerciseName = $(element).find("h2").html();
            var exercise = {
                "name": exerciseName,
                "sets": setArray,
            };

            exerciseArray.push(exercise);
        })

        // Spara ner passet till databasen
        var jsonObjecToSend = {
            "exercises": exerciseArray,
            "date": JSON.parse(storage.getItem("currentWO")).date,
            "type": "Strength",
            "duration": null,
            "distance": null,
            "sessionUserNote": "Give me a real value", //TODO
            "sessionName": $("#nameofProgram").html(),
        };

        //storage.setItem("currentWO", jsonObjecToSend);

        $.ajax({
            url: "http://localhost:49902/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function(result) {
                alert("Workout Saved successfully!")
                window.location = "main.html";
            },
            error: function(result) {
                alert("Error att save")
            }
        });

    });
});