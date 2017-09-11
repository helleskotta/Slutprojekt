var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

document.addEventListener("deviceready", function() {

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").addClass("selectedicon");
    $("#statsicon").removeClass("selectedicon");

    var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions")); // --------------- STORAGE?

    var listviewfull = "";

    for (var i = allWorkoutSessions.length - 1; i > 0; i--) {
        var displayDate = new Date(allWorkoutSessions[i].date).getDate();
        var displayMonth = months[new Date(allWorkoutSessions[i].date).getMonth()];
        var displayDM = displayDate + " " + displayMonth;

        listviewfull += '<li><span class="listdate">' + displayDM + '</span><span class="listcontent">' + allWorkoutSessions[i].sessionName + '</span></li>'
    }
    $("#calList").append(listviewfull);
});