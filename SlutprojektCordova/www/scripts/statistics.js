document.addEventListener("deviceready", function () {
    // Klicka på Statistik

        $("#homeicon").removeClass("selectedicon");
        $("#calendaricon").removeClass("selectedicon");
        $("#statsicon").addClass("selectedicon");


        $.ajax({
            url: "http://localhost:49902/member/Statistics",
            type: "POST",
            
            success: function(result) {
                console.log("Stats acquired successfully!");

            },
            error: function(result) {
                alert("Error att save")
            }
        });


});