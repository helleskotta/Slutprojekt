document.addEventListener("deviceready", function () {
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
    });

    $("#cardiobtn").click(function () {
        $("#cardioprogram").show();
        $("#strengthprogram").hide();
        $("#otherprogram").hide();
    });

    $("#otherbtn").click(function () {
        $("#cardioprogram").hide();
        $("#strengthprogram").hide();
        $("#otherprogram").show();
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
                exerciseChosen = [{ exerciseChoice: option, sets: setArray }];
            }

            else {
                exerciseChosen.push({ exerciseChoice: option, sets: setArray });
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
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
        window.location = "calendar.html";
    });

    // ADD OTHER WORKOUT
    $("#addother").click(function () {
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
        window.location = "calendar.html";
    });
});