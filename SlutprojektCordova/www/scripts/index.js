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

//$("#stats").click(function () {
//    $.ajax({
//        url: "http://localhost:49902",
//        method: "POST",
//        success: function (result) {
//            console.log(result);
//        }

//    })

//    //$("#login").hide();
//    //$("#welcome").show();
//    //$("#register").hide();
//    //$("#addstats").hide();
//});


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
        //xhrFields: {
        //    withCredentials: true
        //},
        //crossDomain: true,
        //headers: {
        //    Cookie: mycookies
        //},
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


//////////////////////////////////////////////////////////////////// TODAYS DATE
var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

window.onload = function () {
    document.getElementById("date").innerHTML = d.getDate() + " " + months[d.getMonth()];
}
