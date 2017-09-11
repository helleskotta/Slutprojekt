var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


document.addEventListener("deviceready", function () {

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").addClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");

    var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions")); // --------------- STORAGE?

    var listviewfull = "";

    for (var i = allWorkoutSessions.length - 1; i > 0; i--) {
        var displayDate = new Date(allWorkoutSessions[i].date).getDate() + " " + months[new Date(allWorkoutSessions[i].date).getMonth()];

        var weekday = days[new Date(allWorkoutSessions[i].date).getDay()];

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

        if (displayDate === today) {
            weekday = "today";
            listviewfull += '<span>' + icon + weekday +  '</span><li style="border-left:2px solid green;">';
        }
        else {
            listviewfull += '<span>' + icon + weekday + '</span><li>';
        }

        listviewfull += '<span class="listdate">' + displayDate + '</span><span class="listcontent">' + sessionName + '</span></li>';
    }
    $("#calList").append(listviewfull);
});