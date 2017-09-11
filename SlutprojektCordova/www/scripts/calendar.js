document.addEventListener("deviceready", function () {

        $("#homeicon").removeClass("selectedicon");
        $("#calendaricon").addClass("selectedicon");
        $("#statsicon").removeClass("selectedicon");

        var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions")); // --------------- STORAGE?

        var listviewfull = "";

        for (var i = allWorkoutSessions.length-1; i > 0 ; i--) {
            listviewfull += '<li><span class="listdate">' + allWorkoutSessions[i].date + '</span><span class="listcontent">' + allWorkoutSessions[i].sessionName + '</span></li>'
        }
        $("#calList").append(listviewfull);
});