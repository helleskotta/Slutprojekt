document.addEventListener("deviceready", function () {
    $("#strengthbtn").addClass("selectedE");

    // Ladda in övningar till add-vy
    var strOptions = "";
    var cardioOptions = "";
    var exercises = JSON.parse(storage.getItem("UserExercises"));
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

            var setArray = [] // antal reps, antal kilo

            for (var i = 0; i < nrOfSets; i++) {

                setArray.push({ reps: null, weight: null });
            }

            if (index === 0) {
                exerciseChosen = [{ name: option, sets: setArray }];
            }

            else {
                exerciseChosen.push({ name: option, sets: setArray });
            }
        })

        var objectToStore = {
            "sessionName": $("#programname").val(),
            "date": new Date($(".datepicker").val()),
            "exercises": exerciseChosen
        }
        storage.setItem("currentWO", JSON.stringify(objectToStore));

        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
        window.location = "run.html";
    });

    // ADD CARDIO WORKOUT
    $("#addcardio").click(function () {

        var datePickerDate = JSON.stringify(new Date($(".datepicker").val()));

        var dateToSave = JSON.parse(datePickerDate);

        var jsonObjecToSend = {
            "exercises": null,
            "date": dateToSave,
            "type": "Cardio",
            "duration": $('#cardiotime').val(),
            "distance": $('#distance').val(),
            "sessionUserNote": $('#cardionotes').val(), 
            "sessionName": $("#cardioExercises").val(),
        };


        $.ajax({
            url: "http://localhost:49902/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function (result) {
                alert("Workout Saved successfully!")
                window.location = "main.html";
            },
            error: function (result) {
                alert("Error at save")
            }
        });
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
    });

    // ADD OTHER WORKOUT
    $("#addother").click(function() {

        var datePickerDate = JSON.stringify(new Date($(".datepicker").val()));

        var dateToSave = JSON.parse(datePickerDate);

        var jsonObjecToSend = {
            "exercises": null,
            "date": dateToSave,
            "type": "Other",
            "duration": $('#othertime').val(),
            "distance": null,
            "sessionUserNote": $('#othernotes').val(),
            "sessionName": $("#othername").val(),
        };


        $.ajax({
            url: "http://localhost:49902/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function(result) {
                alert("Workout Saved successfully!")
                window.location = "main.html";
            },
            error: function(result) {
                alert("Error at save")
            }
        });
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
      
    });
});