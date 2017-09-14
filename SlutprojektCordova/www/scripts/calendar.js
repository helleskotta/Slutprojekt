var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

document.addEventListener("deviceready", function () {

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").addClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");

    var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions"));

    var listviewfull = "";

    for (var i = allWorkoutSessions.length - 1; i >= 0; i--) {
        var d = allWorkoutSessions[i].date;
        var displayDate = new Date(allWorkoutSessions[i].date).getDate() + " " + months[new Date(allWorkoutSessions[i].date).getMonth()];

        var weekday = days[new Date(d).getDay()];

        var today = new Date().getDate() + " " + months[new Date().getMonth()];

        var sessionName = allWorkoutSessions[i].sessionName;

        if (allWorkoutSessions[i].sessionName === null) {
            sessionName = "[Anonymous workout]";
        }

        var icon = '<br /><br /><img align="right" style="width:30px; padding-top:30px; padding-right:15px;" src="';
        var duration = allWorkoutSessions[i].duration;

        if (allWorkoutSessions[i].type === "Strength") {
            icon += 'images/strengthicon.png" />';
        }

        else if (allWorkoutSessions[i].type === "Cardio") {

            if (allWorkoutSessions[i].duration != null) {
                sessionName += " " + duration + " min";
            }

            icon += 'images/cardioicon.png" />';
        }

        else {
            if (allWorkoutSessions[i].duration != null) {
                sessionName += " " + duration + " min";
            }
            icon += 'images/othericon.png" />';
        }

        listviewfull += '<div class="calExercise" data-idinarray=' + i + '>';

        if (displayDate === today) {
            weekday = "today";
            listviewfull += '<span>' + icon + weekday + '</span><li style="border-left:2px solid green;">';
        }
        else {
            listviewfull += '<span>' + icon + weekday + '</span><li>';
        }

        listviewfull += '<span class="listdate">' + displayDate + '</span><span class="listcontent">' + sessionName + '</span></li></div>';
    }
    $("#calList").append(listviewfull);

    $(".calExercise").click(function () {
        storage.setItem("WOToEdit", JSON.stringify(allWorkoutSessions[$(this).data("idinarray")]));
        window.location = "edit.html";
    });
});