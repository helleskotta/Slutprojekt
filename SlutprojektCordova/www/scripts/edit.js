var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

$("#editStr").hide();
$("#viewForEdit").hide();
$("#viewForEditCardio").hide();
$("#viewForEditOther").hide();
$("#homeicon").removeClass("selectedicon");
$("#calendaricon").addClass("selectedicon");
$("#statsicon").removeClass("selectedicon");

document.addEventListener("deviceready", function () {
    var currentWO = JSON.parse(storage.getItem("WOToEdit"));
    var setNr = 1;
    var viewSetNr = 1;


    if (currentWO.type === "Strength") {
        $("#editStr").hide();
        $("#viewForEdit").show();
        $("#viewForEditCardio").hide();
        $("#viewForEditOther").hide();
    }

    else if (currentWO.type === "Cardio") {
        $("#editStr").hide();
        $("#viewForEdit").hide();
        $("#viewForEditCardio").show();
        $("#viewForEditOther").hide();
    }

    else {
        $("#editStr").hide();
        $("#viewForEdit").hide();
        $("#viewForEditCardio").hide();
        $("#viewForEditOther").show();
    }

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

    // Edit 
    $("#editWObtn").click(function () {
        $("#editStr").show();
        $("#viewForEdit").hide();
    });

    // Rerun
    $("#rerunbtn").click(function () {
        // TODO: DUPLICERA 
    });

    // Delete 
    $(".deleteWO").click(function () {

        var jsonObjectToSend = logIt();

        //storage.setItem("currentWO", jsonObjecToSend);

        $.ajax({
            url: currentDomain + "/member/DeleteWorkout",
            type: "POST",
            data: jsonObjectToSend,
            success: function (result) {
                alert("Workout was deleted");
                storage.removeItem("WOToEdit");
                window.location = "main.html";
            },
            error: function (result) {
                alert("Error at save");
            }
        });


        // TODO: RADERA PASSET 
    });

    // Back to calendar view from viewing Cardio
    $(".backToCal").click(function () {
        window.location = "calendar.html";
    });

    // Edit Cardio
    $("#editCardio").click(function () {
        // TODO: REDIGERA PASSET
    });

    var content = "";
    var viewContent = "";

    // Edit
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

    // View 
    for (var k = 0; k < currentWO.exercises.length; k++) {
        viewContent += '<div class="exerciseWrapperView"><h2 style="font-weight:bold; text-align:left;"> ' + currentWO.exercises[k].name + '</h2>' + '<table class="ovning" style="width:100%; padding:2px 5px 20px 0;"> <tr> <td style="width:25%;"></td> <td style="width:40%;">Reps</td> <td style="width:40%;">Kg</td> <td style="width:5%;"></td> </tr>';

        // En övning
        for (var j = 0; j < currentWO.exercises[k].sets.length; j++) {
            viewContent += '<tr> <td style="font-weight:bold; font-size:14px;">SET ' + viewSetNr++ + '</td> <td>' + currentWO.exercises[k].sets[j].reps + '</td> <td>' + currentWO.exercises[k].sets[j].weight;
        }
        viewContent += '</table></div>';

        if (k >= currentWO.exercises.length - 1) {
            viewContent += '<br />'
        }
        else {
            viewContent += '<hr style="border:1px dotted #dbdbdb;"/>';
        }
        viewSetNr = 1;
    }

    // Cardio
    var displayDate = new Date(currentWO.date).getDate() + " " + months[new Date(currentWO.date).getMonth()] + ", " + new Date(currentWO.date).getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + new Date(currentWO.date).getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    var cardioContent = "";
    var otherContent = "";
    var notes = currentWO.sessionUserNote;

    if (currentWO.sessionUserNote === null) {
        notes = '<i>No notes about this workout</i>';
    }

    cardioContent += '<h2><b>Date</b><br /><h2 style="text-transform:lowercase;">' + displayDate + '<h2><b>Distance</b><br /><h2 style="text-transform:lowercase;">' + currentWO.distance + ' km</h2> <br /> <h2><b>Duration</b><br /><h2 style="text-transform:lowercase;">' + currentWO.duration + ' minutes</h2> <br /> <h2><b>Notes</b><br /><h2 style="text-transform:lowercase;">' + notes + '</h2><br /><br />';


    otherContent += '<h2><b>Date</b><br /><h2 style="text-transform:lowercase;">' + displayDate + '<h2><br /><br /><b>Duration</b><br /><h2 style="text-transform:lowercase;">' + currentWO.duration + ' minutes</h2> <br /> <h2><b>Notes</b><br /><h2 style="text-transform:lowercase;">' + notes + '</h2><br /><br />';

    // Push the views
    $("#fullprogram").append(content);
    $("#viewfullprogram").append(viewContent);
    $("#viewfullcardioprogram").append(cardioContent);
    $("#viewfullotherprogram").append(otherContent);
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