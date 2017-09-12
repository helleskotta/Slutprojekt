var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

document.addEventListener("deviceready", function () {
    $("#date").html(days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()]);

    if (storage.getItem("currentWO") === null) {
        $("#unsavedWO").hide();
    }

    else {
        $("#unsavedWO").show();
    }

    $("#homeicon").addClass("selectedicon");
    $("#calendaricon").removeClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");

    // Hämta alla användarens inlagda pass (workout sessions)
    $.ajax({
        url: "http://localhost:49902/Member/Index",
        type: "get",
        success: function (result) {
            //console.log("Ok" + result);
            storage.setItem("WorkoutSessions", JSON.stringify(result));
        },
        error: function (result) {
            alert("fel vid storage")
        }
    });

    $("#continueUnsavedWO").click(function () {
        window.location = "run.html";
    });

    //// Hämta data från localstorage för 3 boxar
    // var result = JSON.parse(storage.getItem("WorkoutSessions"));
    //var temp = new Date();

    //var newList = result.map(function (x) {
    //    var newDate = new Date(x.date);

    //    return {
    //        "date": newDate,
    //        "sessionName": x.sessionName,
    //        "type": x.type,
    //    }
    //});

    //var todayList = newList.filter(function (session) {
    //    var year = temp.getFullYear() == session.date.getFullYear();
    //    var date = temp.getDate() == session.date.getDate();
    //    var month = temp.getMonth() == session.date.getMonth();

    //    return year && date && month;
    //});


    // Hämta data till 3 boxar
    $.ajax({
        url: "http://localhost:49902/member/main",
        type: "get",
        success: function (result) {
            console.log("Gick bra");
            var prevContent = "";
            var todayContent = "";
            var nextContent = "";

            if (result.calendar[0] !== null) {
                var displayDate = new Date(result.calendar[0].date).getDate();
                var displayMonth = months[new Date(result.calendar[0].date).getMonth()];

                prevContent = "<p>" + displayDate + " " + displayMonth + "</p>";
                prevContent += "<b>" + result.calendar[0].sessionName + "</b>";

                if (result.calendar[0].typeOfWorkoutSession === "Strength") {
                    prevContent += '<br /><br /><img style="width:30px;" src="images/strengthicon.png" />';
                }

                else if (result.calendar[0].typeOfWorkoutSession === "Cardio") {
                    prevContent += '<br /><br /><img style="width:30px;" src="images/cardioicon.png" />';
                }

                else {
                    prevContent += '<br /><br /><img style="width:30px;" src="images/othericon.png" />';
                }

                //// TODO: Kom till rätt pass vid klick
                //$("#box1").click(function () {
                //    window.location = "add.html";
                //});
            }

            else {
                prevContent = '<i>You have not logged any previous workout.Click to add a workout session.<br /><br /> <font size="20px">+</font></i>';

                $("#box1").click(function () {
                    window.location = "add.html";
                });
            }

            $("#box1content").html(prevContent);


            if (result.calendar[1] !== null) {
                todayContent = "<p>upcoming</p> <b>" + result.calendar[1].sessionName + "</b>";

                if (result.calendar[1].typeOfWorkoutSession === "Strength") {
                    todayContent += '<br /><br /><img style="width:30px;" src="images/strengthicon.png" />';
                }

                else if (result.calendar[1].typeOfWorkoutSession === "Cardio") {
                    todayContent += '<br /><br /><img style="width:30px;" src="images/cardioicon.png" />';
                }

                else {
                    todayContent += '<br /><br /><img style="width:30px;" src="images/othericon.png" />';
                }

                //// TODO: Kom till rätt pass vid klick
                //$("#box2").click(function () {
                //    window.location = "add.html";
                //});
            }

            else {
                todayContent = '<i>You have no workout planned today. Click to add a workout session.<br /><br /><font size="20px">+</font></i>';

                $("#box2").click(function () {
                    window.location = "add.html";
                });
            }

            $("#box2content").html(todayContent);


            if (result.calendar[2] !== null) {

                var displayDate = new Date(result.calendar[2].date).getDate();
                var displayMonth = months[new Date(result.calendar[2].date).getMonth()];

                nextContent = "<p>" + displayDate + " " + displayMonth + "</p>";
                nextContent += "<b>" + result.calendar[2].sessionName + "</b>";

                if (result.calendar[2].typeOfWorkoutSession === "Strength") {
                    nextContent += '<br /><br /><img style="width:30px;" src="images/strengthicon.png" />';
                }

                else if (result.calendar[2].typeOfWorkoutSession === "Cardio") {
                    nextContent += '<br /><br /><img style="width:30px;" src="images/cardioicon.png" />';
                }

                else {
                    nextContent += '<br /><br /><img style="width:30px;" src="images/othericon.png" />';
                }
            

                //// TODO: Kom till rätt pass vid klick
                //$("#box2").click(function () {
                //    window.location = "add.html";
                //});
            }
            else {
                nextContent = '<i>You have no upcoming workout planned. Click to add a workout session.<br /><br /><font size="20px">+</font></i>';

                $("#box3").click(function () {
                    window.location = "add.html";
                });
            }
            $("#box3content").html(nextContent);
        }
    });

    //// ADD WEIGHT MEASUREMENTS
    //$("#saveweight").click(function () {
    //    var jsonObjecToSend = {
    //        "bodyWeight": $("#weightbox").val(),
    //        "date": new Date($(".datepicker").val()), //TODO GIVE me a real value please
    //    };

    //    $.ajax({
    //        url: "http://localhost:49902/member/savemeasurements",
    //        type: "POST",
    //        data: jsonObjecToSend,
    //        success: function (result) {
    //            alert("Measurements saved successfully!")
    //        },
    //        error: function (result) {
    //            alert("Error att save")
    //        }
    //    });
    //});
});
