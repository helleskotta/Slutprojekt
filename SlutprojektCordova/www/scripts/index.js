// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        $("#login").show();
        $("#register").hide();
        $("#welcome").hide();
        $("#addstats").hide();

        //// TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
})();

$("#redirect").click(function () {
    $("#login").hide();
    $("#register").show();
    $("#welcome").hide();
    $("#addstats").hide();
});

$("#mystats").click(function () {
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
    $("#addstats").show();
});

$("#main").click(function () {
    window.location = "main.html";
});


$("#loginTest").click(function () {
    $.ajax({
        url: "http://localhost:49902/Account/LoggedIn",
        type: "POST",
        success: function (result) {
            console.log("success: " + result);
        },
        error: function (result) {
            console.log("login error: " + result);
        }
    })
});

///////////////////////////////////////////////////////////////// REGISTER
$("#add").click(function () {

    $.ajax({
        url: "http://localhost:49902/Account/Register",
        type: "POST",
        data: {
            "UserName": $("#newUserName").val(),
            "Email": $("#newEmail").val(),
            "Password": $("#newPassword").val(),
            "ConfirmPassword": $("#confirmPassword").val(),
        },
        success: function (result) {
            alert("Register successfull: " + result);

            $("#login").hide();
            $("#welcome").show();
            $("#register").hide();
            $("#addstats").hide();
        },
        error: function (result) {
            alert("register error:" + result);
            //.find("p").html(result.)
        }
    })

});

///////////////////////////////////////////////////////////////// LOGIN
$("#loginbtn").click(function () {

    $.ajax({
        url: "http://localhost:49902/Account/Login",
        type: "POST",
        data: {
            "UserName": $("#username").val(), /* Username or Email */
            "PassWord": $("#password").val()
        },

        success: function (result) {
            alert("Login successful: " + result);

            if (result === "Logged in!") { // TODO: HÅRDKODAD STRÄNG!! ---------------------------------------- !
                window.location = "main.html";
            }
            else {
                // TODO: SHOW ERROR MESSAGES ---------------------------------------------------------------- !
            }
        },
        error: function (result) {
            alert("Login error:" + result);
            window.location = "index.html";
            //.find("p").html(result.)
        }
    })
});



////////////////////////////////////////////////////////////////// MAIN VIEW
var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

window.onload = function () {
    $("#date").html(d.getDate() + " " + months[d.getMonth()]);
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#menuToggle").hide();
    $("#hamburger").show();
    $("#hamburgermenu").hide();

    // Klicka på hem
    if (document.getElementById("boxes")) {
        $("#homeicon").addClass("selectedicon");
        $("#calendaricon").removeClass("selectedicon");
        $("#statsicon").removeClass("selectedicon");

        $.ajax({
            url: "http://localhost:49902/Member/Main",
            type: "GET",

            success: function (result) {
                var prevContent = "<b>" + result.calendar[0].sessionName + "</b>";
                prevContent += "<br /><p>" + result.calendar[0].typeOfWorkoutSession + "</p> ";
                prevContent += "<p>" + result.calendar[0].date + "</p>";

                $("#box1content").html(prevContent);


                var todayContent = "<b>" + result.calendar[1].sessionName + "</b>";
                todayContent += "<br /><p>" + result.calendar[1].typeOfWorkoutSession + "</p> ";

                $("#box2content").html(todayContent);


                var nextContent = "<b>" + result.calendar[2].sessionName + "</b>";
                nextContent += "<br /><p>" + result.calendar[2].typeOfWorkoutSession + "</p> ";
                nextContent += "<p>" + result.calendar[2].date + "</p>";

                $("#box3content").html(nextContent);
            },
            error: function (result) {
                alert("AJAJAJ - something went wrong: " + result);
            }
        })
    }

    // Klicka på Kalender
    if (document.getElementById("calendarlist")) {
        $("#homeicon").removeClass("selectedicon");
        $("#calendaricon").addClass("selectedicon");
        $("#statsicon").removeClass("selectedicon");
    }

    // Klicka på Statistik
    if (document.getElementById("mainstats")) {
        $("#homeicon").removeClass("selectedicon");
        $("#calendaricon").removeClass("selectedicon");
        $("#statsicon").addClass("selectedicon");
    }


    //if (document.getElementById("listdate")) {
    //    $("#homeicon").removeClass("selectedicon");
    //    $("#calendaricon").addClass("selectedicon");
    //    $("#statsicon").removeClass("selectedicon");
    //}



}

//////////////////////////////////////////////////////////////////// ADD BUTTON

$("#addbutton").click(function () {
    $("#wrapper").addClass("clickadd");
    $("#addmenu").show();
    $("#addmenu2").show();
    $("#hamburgermenu").hide();
});


$("#wrapper").click(function () {
    $("#wrapper").removeClass("clickadd");
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#hamburgermenu").hide();
});


//////////////////////////////////////////////////////////////////// SETTINGS MENU
$("#hamburgericon").click(function () {
    $("#wrapper").addClass("clickadd");
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#hamburgermenu").show();
});


//////////////////////////////////////////////////////////////////// FOOTER BUTTON CLICKS
$("#homeicon").click(function () {
    window.location = "main.html";
});

$("#calendaricon").click(function () {
    window.location = "calendar.html";
});

$("#statsicon").click(function () {
    window.location = "statistics.html";
});


//////////////////////////////////////////////////////////////////// ADD
$("#strengthbtn").click(function () {
    //alert("test");
    $("#strengthprogram").show();
    $("#cardioprogram").hide();
});

$("#cardiobtn").click(function () {
    //alert("test");
    $("#cardioprogram").show();
    $("#strengthprogram").hide();
});


$("#addanother").click(function () {
    var anotherfield = "";

    anotherfield += '<div id="oneexercise"><br /><select id= "exercise" style= "width:60%;"><option value="" disabled selected>Choose an exercise</option></select> <input id="reps" style="width: 25%;" type="text" placeholder="Sets" /> <input type="button" id="deletefield" style="width:5%; padding: 1px; font-size:20px; background:transparent; color:#888;  text-transform:lowercase;" value="x" /></div>'
    
    $("#exercises").append(anotherfield);
});

$("#exercises").on('click', '#deletefield', function () {
    $(this).parent("#oneexercise").remove();
}); 

