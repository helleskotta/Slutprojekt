document.addEventListener("deviceready", function () {

    // Run program

    var currentWO = JSON.parse(storage.getItem("WOToEdit"));
    var setNr = 1;
    $("#nameofProgram").html(currentWO.sessionName).click(function () {
        if (document.getElementById("changeTitel")) {
            console.log("Hello");
        }
        else {
            var testMagicString = "";
            testMagicString = '<h2><input id="changeTitel" type="text" value ="' + currentWO.sessionName + '"></h2>';
            $("#nameofProgram").html(testMagicString);
        }
    });

    var content = "";

    // Alla övningar
    for (var k = 0; k < currentWO.exercises.length; k++) {

        var exerciseString = "";
        exerciseString += '<div class="exerciseWrapper"><h2 style="font-weight:bold; text-align:left;"> ' + currentWO.exercises[k].name + '</h2><h3 class="totalSets"></h3>' + '<table class="ovning" style="width:100%; padding:2px 5px 20px 0;"> <tr> <td style="width:25%;"></td> <td style="width:40%;">Reps</td> <td style="width:40%;">Kg</td> <td style="width:5%;"></td> </tr>';

        // En övning
        for (var j = 0; j < currentWO.exercises[k].sets.length; j++) {
            var oneRow = '<tr> <td style="font-weight:bold; font-size:14px;">SET ' + setNr++ + '</td> <td>';
            if (currentWO.exercises[k].sets[j].reps === null) {
                oneRow += '<input class="repsCount" type="number" style="width:50%;" />';
            } else {
                oneRow += '<input class="repsCount" value="' + currentWO.exercises[k].sets[j].reps + '" type="number" style="width:50%;" />';
            }

            oneRow += '</td > <td>';

            if (currentWO.exercises[k].sets[j].weight === null) {
                oneRow += '<input class="weightCount" type="number" style="width:50%;" />';

            } else {
                oneRow += '<input class="weightCount" value="' + currentWO.exercises[k].sets[j].weight + '" type="number" style="width:50%;" />';
            }
            oneRow += '</td> <td><input type="button" class="deletefield" style="width:100%;" value="x" /></td> </tr > ';
            exerciseString += oneRow;
        }
        var endof = "";
        endof += '<tfoot><tr> <td> <img class="addanotherrun" src="images/add40.png" style="margin:auto; width:20px; height:20px;" /> </td> <td style="width:280px;"></td><td></td></tr></tfoot> </table></div>';

        if (k >= currentWO.exercises.length - 1) {
            endof += '<br />'
        }
        else {
            endof += '<hr style="border:1px dotted #dbdbdb;"/>';
        }
        exerciseString += endof;
        content += exerciseString;
        setNr = 1;
    }

    $("#fullprogram").append(content);
    $(".totalSets").hide();

    // Remove-knapp i run
    $(".ovning").on('click', '.deletefield', function () {
        $(this).closest('tr').remove();
    });

    // lägg till ett till set
    $(".addanotherrun").click(function () {
        var clone = "";
        setNr = $(this).parents().eq(3).find("tbody >tr").length;
        clone += '<tr> <td style="font-weight:bold; font-size:14px;">SET ';
        clone += setNr;
        clone += '</td>';
        clone += '<td><input class="repsCount" type="number" style="width:50%;"></td> <td><input class="weightCount" type="number" style="width:50%;"></td> <td><input style="width:100%;" type="button" class="deletefield" value="x"></td> </tr>';
        $(this).parents().eq(3).find("tbody").append(clone);
    });

    // Spara (local storage) och dölj en övning 
    $(".finishOneExercise").click(function () {
        //storage.setItem("WOToEdit", JSON.stringify(logIt()));

        $(this).parent().parent().parent().parent().find("tbody").toggle();
        $(this).parent().parent().find(".addanotherrun").toggle();
        $(this).parents().eq(4).find(".totalSets").toggle().html("Sets: " + ($(this).parents().eq(3).find("tbody >tr").length - 1));
    });

    // CANCEL WORKOUT
    $("#cancelWO").click(function () {
        // NY "VY": Are you sure you want to cancel your workout? à la View app yada
        storage.removeItem("WOToEdit");
    });

    // save edit STRENGTH WORKOUT
    $("#saveeditWO").click(function () {
        var jsonObjectToSend = logIt();

        //storage.setItem("currentWO", jsonObjecToSend);

        $.ajax({
            url: currentDomain + "/member/EditWorkout",
            type: "POST",
            data: jsonObjectToSend,
            success: function (result) {
                alert("Workout edited successfully!");
                storage.removeItem("WOToEdit");
                window.location = "main.html";
            },
            error: function (result) {
                alert("Error at save");
            }
        });

    });
});


function logIt() {

    var exerciseArray = [];

    $(".exerciseWrapper").each(function (index, element) {
        var setArray = [];

        var repsCount = [];
        $(element).find(".repsCount").each(function (repsCountIndex, repsCountElement) {
            repsCount[repsCountIndex] = $(repsCountElement).val();
        });

        var weightCount = [];
        $(element).find(".weightCount").each(function (weightCountIndex, weightCountElement) {
            weightCount[weightCountIndex] = $(weightCountElement).val();
        });

        for (var i = 0; i < repsCount.length; i++) {

            setArray.push({ reps: repsCount[i], weight: weightCount[i] });
        }

        var exerciseName = $(element).find("h2").html();
        var exercise = {
            "name": exerciseName,
            "sets": setArray,
        };

        exerciseArray.push(exercise);

    })
    var jsonObjectToSend = {
        "exercises": exerciseArray,
        "date": JSON.parse(storage.getItem("WOToEdit")).date,
        "type": "Strength",
        "duration": null,
        "distance": null,
        "sessionUserNote": "Give me a real value", //TODO
        "sessionName": $("#nameofProgram").html(),
    };

    return jsonObjectToSend;

};