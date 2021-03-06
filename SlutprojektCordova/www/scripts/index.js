﻿// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net";
var currentDomain = azureDomain;
$("#ui-datepicker-div").hide();
$("#login").show();
$("#register").hide();
$("#addstats").hide();

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

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
    $("#addstats").hide();
});

$("#main").click(function () {
    window.location = "main.html";
});

$("#forgotpassword").click(function () {
    alert("Oops! This feature is not yet ready. We're sorry your memory is shit :)")
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
            "ConfirmPassword": $("#confirmPassword").val()
        },
        success: function (result) {
            if (result === "Yes") {
                alert("Register successful: " + result);
                window.location = "main.html";
            }

            else {
                alert("Error at register");
            }
        },
        error: function (result) {
            alert("Register error");
        }
    });

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
        xhrFields: {
            withCredentials: true
        },
        success: function (result,text,xhr) {
            if (result === "Logged in!") { // TODO: HÅRDKODAD STRÄNG!! ---------------------------- !
                alert("Login successful: " + result);
                window.location = "main.html";
            }
            else {
                alert("Login failed");
            }
        },
        error: function (result) {
            alert("Login error:" + result);
            window.location = "index.html";
            //.find("p").html(result.)
        }
    });
});