
document.addEventListener("deviceready", function () {
    $("#strengthbtn").addClass("selectedE");

    // Ladda in övningar till add-vy

    var exercises = JSON.parse(storage.getItem("UserExercises"));
    var strOptions = "";
    var cardioOptions = "";
    if (exercises) {

        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].type === "Strenght") {

                strOptions += '<option>' + exercises[i].name + '</option>';
            }

            else {
                cardioOptions += '<option>' + exercises[i].name + '</option>';
            }
        }
        $("#listOfExercise").append(strOptions);
        $("#cardioExercises").append(cardioOptions);
    }


    $("#strengthbtn").click(function () {
        $("#strengthprogram").show();
        $("#cardioprogram").hide();
        $("#otherprogram").hide();
        $("#strengthbtn").addClass("selectedE");
        $("#cardiobtn").removeClass("selectedE");
        $("#otherbtn").removeClass("selectedE");
    });

    $("#cardiobtn").click(function () {
        $("#cardioprogram").show();
        $("#strengthprogram").hide();
        $("#otherprogram").hide();
        $("#strengthbtn").removeClass("selectedE");
        $("#cardiobtn").addClass("selectedE");
        $("#otherbtn").removeClass("selectedE");
    });

    $("#otherbtn").click(function () {
        $("#cardioprogram").hide();
        $("#strengthprogram").hide();
        $("#otherprogram").show();
        $("#strengthbtn").removeClass("selectedE");
        $("#cardiobtn").removeClass("selectedE");
        $("#otherbtn").addClass("selectedE");
    });

    // ADD STRENGTH WORKOUT
    $("#addwo").click(function () {

        var exerciseChosen = [];

        $(".oneexercise").each(function (index, element) {
            var option = $(element).find("#listOfExercise").val();
            var nrOfSets = $(element).find(".sets").val();

            var setArray = []; // antal reps, antal kilo

            for (var i = 0; i < nrOfSets; i++) {

                setArray.push({ reps: null, weight: null });
            }

            if (index === 0) {
                exerciseChosen = [{ name: option, sets: setArray }];
            }

            else {
                exerciseChosen.push({ name: option, sets: setArray });
            }
        });

        var objectToStore = {
            "sessionName": $("#programname").val(),
            "date": new Date($("#strDatePicker").val()),
            "exercises": exerciseChosen
        };
        storage.setItem("currentWO", JSON.stringify(objectToStore));


        window.location = "run.html";
    });

    if (storage.getItem("WOToRerun") != null) {
        var WOToRerun = JSON.parse(storage.getItem("WOToRerun"));
        var appendString = "";

        $("#programname").val(WOToRerun.sessionName);
        for (var i = 0; i < WOToRerun.exercises.length; i++) {

            appendString += '<div class="oneexercise"> <select id="listOfExercise" style="width:70%;"> <option value="" disabled selected>' + WOToRerun.exercises[i].name + '</option>';

            var strOptions2 = "";
            var exercises2 = JSON.parse(storage.getItem("UserExercises"));

            for (var j = 0; j < exercises2.length; j++) {
                if (exercises2[i].type === "Strenght") {

                    strOptions2 += '<option>' + exercises2[j].name + '</option>';
                }
            }
            appendString += strOptions2;

            appendString += '</select > <input class="sets" value="' + WOToRerun.exercises[i].sets.length + '" style="width: 20%;" type="number" placeholder=" Sets" /> <input type="button" class="deletefield" value="x" /> </div > ';
        }

        $("#exercises").html(appendString);
        storage.removeItem("WOToRerun");

    }
    // ADD CARDIO WORKOUT
    $("#addcardio").click(function () {

        var datePickerDate = JSON.stringify(new Date($("#cardioDatePicker").val()));

        var dateToSave = JSON.parse(datePickerDate);

        var jsonObjecToSend = {
            "exercises": null,
            "date": dateToSave,
            "type": "Cardio",
            "duration": $('#cardiotime').val(),
            "distance": $('#distance').val(),
            "sessionUserNote": $('#cardionotes').val(),
            "sessionName": $("#cardioExercises").val()
        };


        $.ajax({
            url: currentDomain + "/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function (result) {
                alert("Workout Saved successfully!");
                window.location = "main.html";
            },
            error: function (result) {
                alert("Error at save");
            }
        });
    });

    // ADD OTHER WORKOUT
    $("#addother").click(function () {

        var datePickerDate = JSON.stringify(new Date($("#otherDatePicker").val()));

        var dateToSave = JSON.parse(datePickerDate);

        var jsonObjecToSend = {
            "exercises": null,
            "date": dateToSave,
            "type": "Other",
            "duration": $('#othertime').val(),
            "distance": null,
            "sessionUserNote": $('#othernotes').val(),
            "sessionName": $("#othername").val()
        };


        $.ajax({
            url: currentDomain + "/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function (result) {
                alert("Workout Saved successfully!");
                window.location = "main.html";
            },
            error: function (result) {
                alert("Error at save");
            }
        });

    });
});