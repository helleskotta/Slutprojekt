﻿// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net";
var currentDomain = localDomain;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        $("#ui-datepicker-div").hide();

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        //// TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        $("#login").show();
        $("#register").hide();
        $("#welcome").hide();
        $("#addstats").hide();

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

//$("#mystats").click(function () {
//    $("#login").hide();
//    $("#welcome").hide();
//    $("#register").hide();
//    $("#addstats").show();
//});

$("#main").click(function () {
    window.location = "main.html";
});


///////////////////////////////////////////////////////////////// REGISTER
$("#add").click(function () {

    $.ajax({
        url: currentDomain + "/Account/Register",
        type: "POST",
        data: {
            "UserName": $("#newUserName").val(),
            "Email": $("#newEmail").val(),
            "Password": $("#newPassword").val(),
            "ConfirmPassword": $("#confirmPassword").val(),
        },
        success: function (result) {
            alert("Register successful: " + result);

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
        url: currentDomain + "/Account/Login",
        type: "POST",
        data: {
            "UserName": $("#username").val(), /* Username or Email */
            "PassWord": $("#password").val()
        },

        success: function (result) {
            alert("Login successful: " + result);

            if (result === "Logged in!") { // TODO: HÅRDKODAD STRÄNG!! ---------------------------- !

                window.location = "main.html";
              
            }
            else {
                // TODO: SHOW ERROR MESSAGES --------------------------------------------------- !
            }
        },
        error: function (result) {
            alert("Login error:" + result);
            window.location = "index.html";
            //.find("p").html(result.)
        }
    })
});