var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

document.addEventListener("deviceready", function () {
    $("#date").html(d.getDate() + " " + months[d.getMonth()]);
    
    $("#homeicon").addClass("selectedicon");
    $("#calendaricon").removeClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");
    
    $.ajax({
        url: "http://localhost:49902/Member/Index",
        type: "get",
        success: function (result) {
            console.log("Ok" + result);
            //storage.setItem("WorkoutSessions", JSON.stringify(result));
        },
        error: function (result) {
            alert("fel vid storage")
        }
    });


    //var result = JSON.parse(storage.getItem("WorkoutSessions"));
    //var prevContent = "";
    //var todayContent = "";
    //var nextContent = "";

    //if (result.calendar[0] !== null) {
    //    prevContent = "<b>" + result.calendar[0].sessionName + "</b>";
    //    prevContent += "<br /><p>" + result.calendar[0].typeOfWorkoutSession + "</p> ";
    //    prevContent += "<p>" + result.calendar[0].date + "</p>";

    //    //// TODO: Kom till rätt pass vid klick
    //    //$("#box1").click(function () {
    //    //    window.location = "add.html";
    //    //});
    //}

    //else {
    //    prevContent = '<i>You haven not logged any previous workout.Click to add a workout session.<br /><br /> <font size="20px">+</font></i>';

    //    $("#box1").click(function () {
    //        window.location = "add.html";
    //    });
    //}

    //$("#box1content").html(prevContent);


    //if (result.calendar[1] !== null) {
    //    todayContent = "<b>" + result.calendar[1].sessionName + "</b>";
    //    todayContent += "<br /><p>" + result.calendar[1].typeOfWorkoutSession + "</p> ";

    //    //// TODO: Kom till rätt pass vid klick
    //    //$("#box2").click(function () {
    //    //    window.location = "add.html";
    //    //});
    //}

    //else {
    //    todayContent = '<i>You have no workout planned today. Click to add a workout session.<br /><br /><font size="20px">+</font></i>';

    //    $("#box2").click(function () {
    //        window.location = "add.html";
    //    });
    //}

    //$("#box2content").html(todayContent);


    //if (result.calendar[2] !== null) {
    //    nextContent = "<b>" + result.calendar[2].sessionName + "</b>";
    //    nextContent += "<br /><p>" + result.calendar[2].typeOfWorkoutSession + "</p> ";
    //    nextContent += "<p>" + result.calendar[2].date + "</p>";

    //    //// TODO: Kom till rätt pass vid klick
    //    //$("#box2").click(function () {
    //    //    window.location = "add.html";
    //    //});
    //}
    //else {
    //    nextContent = '<i>You have no upcoming workout planned. Click to add a workout session.<br /><br /><font size="20px">+</font></i>';

    //    $("#box3").click(function () {
    //        window.location = "add.html";
    //    });
    //}
    //$("#box3content").html(nextContent);

    // Klicka på spara weight
    $("#saveweight").click(function () {

        var weightToSend = {
            "Date": new Date($(".datepicker").val()),
            "UserWeight1": $("#weightbox").val(),
        }

        $.ajax({
            url: "http://localhost:49902/Member/SaveMeasurements",
            type: "POST",
            data: weightToSend,
            success: function (result) {
                var jsonString =
                    storage.setItem("UserExercises", JSON.stringify(result));
            },
            error: function (result) {
                alert("Fel vid inhämtning av övningar");
            }
        });
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
        location.reload();
    });

    // ADD WEIGHT MEASUREMENTS
    $("#saveweight").click(function () {
        var jsonObjecToSend = {
            "Weight": $("#weightbox").val(),
            "Date": $(".datepicker").val(), //TODO GIVE me a real value please
        };

        $.ajax({
            url: "http://localhost:49902/member/savemeasurements",
            type: "POST",
            data: jsonObjecToSend,
            success: function (result) {
                alert("Measurements saved successfully!")
            },
            error: function (result) {
                alert("Error att save")
            }
        });
    });
});
