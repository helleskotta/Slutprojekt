﻿// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
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
        //xhrFields: {
        //    withCredentials: true
        //},
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
    //document.getElementById("date").innerHTML = d.getDate() + " " + months[d.getMonth()];
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