var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

document.addEventListener("deviceready", function () {

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").addClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");

    var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions"));

    var listviewfull = "";

    for (var i = allWorkoutSessions.length - 1; i >= 0; i--) {
        var displayDate = new Date(allWorkoutSessions[i].date).getDate() + " " + months[new Date(allWorkoutSessions[i].date).getMonth()];

        var weekday = days[new Date(allWorkoutSessions[i].date).getDay() -1];

        var today = new Date().getDate() + " " + months[new Date().getMonth()];

        var sessionName = allWorkoutSessions[i].sessionName;
        var icon = '<br /><br /><img align="right" style="width:30px; padding-top:30px; padding-right:15px;" src="';
        var duration = allWorkoutSessions[i].duration;

        if (allWorkoutSessions[i].type === "Strength") {
            icon += 'images/strengthicon.png" />';
        }

        else if (allWorkoutSessions[i].type === "Cardio") {
            icon += 'images/cardioicon.png" />';
            sessionName += " " + duration + " min";
        }

        else {
            icon += 'images/othericon.png" />';
        }

        listviewfull += '<div class="calExercise" data-idinarray=' + i + '><span>' + icon + weekday + '</span>';

        if (displayDate === today) {
            listviewfull += '<li style="border-left:2px solid green;">';
        }
        else {
            listviewfull += '<li>';
        }

        listviewfull += '<span class="listdate">' + displayDate + '</span><span class="listcontent">' + sessionName + '</span></li></div>';
    }
    $("#calList").append(listviewfull);

    $(".calExercise").click(function () {
        storage.setItem("WOToEdit", JSON.stringify(allWorkoutSessions[$(this).data("idinarray")]));
        window.location = "edit.html";
    });
});