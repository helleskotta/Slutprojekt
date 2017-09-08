// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;

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

$(document).ready(function () {
    $("#date").html(d.getDate() + " " + months[d.getMonth()]);
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#menuToggle").hide();
    $("#hamburger").show();
    $("#hamburgermenu").hide();
    $("#cardioprogram").hide();
    $("#ui-datepicker-div").hide();
    $("#otherprogram").hide();
    $("#addweightwrapper").hide();


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

        //$.ajax({
        //    url: "http://localhost:49902/Member/Index",
        //    type: "GET",
        //    success: function (result) {

        //        storage.setItem("WorkoutSessions", JSON.stringify(result));
        //        var temp = JSON.parse(storage.getItem("WorkoutSessions"));
        //    },
        //    error: function (result) {
        //        alert("Fel vid storage")
        //    }
        //});
    }
    if (document.getElementById("listOfExercise")) {
        var strOptions = "";
        var cardioOptions = "";
        var exercises = JSON.parse(storage.getItem("UserExercises"));
        if (exercises) {

            for (var i = 0; i < exercises.length; i++) {
                if (exercises[i].type === "Strenght") {

                    strOptions += '<option>' + exercises[i].name + '</option>';
                }

                else {
                    cardioOptions += '<option>' + exercises[i].name + '</option>';
                }
            }
            $("#listOfExercise").append(strOptions);
            $("#cardioExercises").append(cardioOptions);
        }
    }

    // Run program
    if (document.getElementById("addfinishedwo")) {
        var currentWO = JSON.parse(storage.getItem("currentWO"));
        $("#nameofProgram").html(currentWO.programName);

        var content = "";

        // Alla övningar
        for (var i = 0; i < currentWO.exerciseandstuff.length; i++) {

            var exerciseString = "";
            exerciseString += '<div class="exerciseWrapper"><h2 style="font-weight:bold; text-align:left;"> ' + currentWO.exerciseandstuff[i].exerciseChoice + '</h2>' + '<table class="ovning" style="width:100%; border-bottom: 2px dashed #dbdbdb; padding:2px 5px 20px 0;"> <tr> <td style="width:25%;"></td> <td style="width:40%;">Reps</td> <td style="width:40%;">Kg</td> <td style="width:5%;"></td> </tr>';

            // En övning
            for (var j = 0; j < currentWO.exerciseandstuff[i].sets.length; j++) {
                var oneRow = '<tr> <td style="font-weight:bold; font-size:14px;">SET' + (j + 1) + '</td> <td>';
                if (currentWO.exerciseandstuff[i].sets[j].reps === null) {
                    oneRow += '<input class="repsCount" type="number" style="width:50%;" />';
                } else {
                    oneRow += '<input class="repsCount" value="' + currentWO.exerciseandstuff[i].sets[j].reps + '" type="number" style="width:50%;" />';
                }
                oneRow += '</td > <td>';
                if (currentWO.exerciseandstuff[i].sets[j].weight === null) {
                    oneRow += '<input class="weightCount" type="number" style="width:50%;" />';

                } else {
                    oneRow += '<input value="' + currentWO.exerciseandstuff[i].sets[j].weight + '" type="number" style="width:50%;" />';
                }

                oneRow += '</td> <td><input type="button" id="deletefield" style="padding: 1px; font-size:20px; background:transparent; color:#888; text-align:right; text-transform:lowercase;" value="x" /></td> </tr > ';
                exerciseString += oneRow;
            }

            var endof = "";
            endof += '<tr> <td><p style="font-size:8px;">Add another set</p>  <img class="addanotherrun" src="images/add40.png" style="margin:auto; width:20px; height:20px;" /> </td> <td></td><td><input type="button" value="Finish exercise" /></td></tr> </table></div>'
            exerciseString += endof;

            content += exerciseString;
        }

        $("#fullprogram").append(content);

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
});

//////////////////////////////////////////////////////////////////// ADD BUTTON

// Klicka på gröna plusset
$("#addbutton").click(function () {
    $("#wrapper").addClass("clickadd");
    $("#addmenu").show();
    $("#addmenu2").show();
    $("#hamburgermenu").hide();
});

// Klicka utanför gröna plusset
$("#wrapper").click(function () {
    $("#wrapper").removeClass("clickadd");
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#hamburgermenu").hide();
});

// Klicka på add work out
$("#toaddwo").click(function () {
    if (storage.getItem("UserExercises") === null) {

        $.ajax({
            url: "http://localhost:49902/Member/UserExercises",
            type: "GET",

            success: function (result) {
                var jsonString =
                    storage.setItem("UserExercises", JSON.stringify(result));
            },
            error: function (result) {
                alert("Fel vid inhämtning av övningar");
            }
        });
    }
    window.location = "add.html";

});

// Klicka på add weight
$("#toaddweight").click(function () {
    $("#firstmainpage").hide();
    $("#addweightwrapper").show();
    $("#wrapper").removeClass("clickadd");
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#hamburgermenu").hide();
});

// Klicka på spara weight
$("#saveweight").click(function () {
    // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
    location.reload();
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
    $("#strengthprogram").show();
    $("#cardioprogram").hide();
    $("#otherprogram").hide();
});

$("#cardiobtn").click(function () {
    $("#cardioprogram").show();
    $("#strengthprogram").hide();
    $("#otherprogram").hide();
});

$("#otherbtn").click(function () {
    $("#cardioprogram").hide();
    $("#strengthprogram").hide();
    $("#otherprogram").show();
});


// ADD STRENGTH WORKOUT
$("#addwo").click(function () {

    var exerciseChosen = [];

    $(".oneexercise").each(function (index, element) {
        var option = $(element).find("#listOfExercise").val();
        var nrOfSets = $(element).find(".sets").val();

        var setArray = [] // antal reps, antal kilo

        for (var i = 0; i < nrOfSets; i++) {

            setArray.push({ reps: null, weight: null });
        }

        if (index === 0) {
            exerciseChosen = [{ exerciseChoice: option, sets: setArray }];
        }

        else {
            exerciseChosen.push({ exerciseChoice: option, sets: setArray });
        }
    })

    var objectToStore = {
        programName: $("#programname").val(),
        date: $(".datepicker").val(),
        exerciseandstuff: exerciseChosen
    }

    storage.setItem("currentWO", JSON.stringify(objectToStore));

    // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
    window.location = "run.html";
});

// ADD FINISHED STRENGTH WORKOUT
$("#addfinishedwo").click(function () {

    var exerciseArray = [];

    $(".exerciseWrapper").each(function (index, element) {
        var setArray = [];

        var repsCount = [];
        $(element).find(".repsCount").each(function (repsCountIndex, repsCountElement) {
            repsCount[repsCountIndex] = $(repsCountElement).val();
        });

        var weightCount = [];
        $(element).find(".weightCount").each(function (weightCountIndex, weightCountElement) {
            weightCount[weightCountIndex] = $(weightCountElement).val();
        });

        for (var i = 0; i < repsCount.length; i++) {

            setArray.push({ reps: repsCount[i], weight: weightCount[i] });
        }

        var exerciseName = $(element).find("h2").html();
        var exercise = {
            "exerciseName": exerciseName,
            "sets": setArray,
        };

        exerciseArray.push(exercise);
    })
    var saveFullProgram = {
        "programName": $("#nameofProgram").html(),
        "exercises": exerciseArray
    };

    window.location = "calendar.html";
});

// ADD CARDIO WORKOUT
$("#addcardio").click(function () {
    // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
    window.location = "calendar.html";
});

// ADD OTHER WORKOUT
$("#addother").click(function () {
    // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
    window.location = "calendar.html";
});



$("#addanother").click(function () {
    var temp = $(".oneexercise").clone().wrap('<p>').parent().html();

    //var anotherfield = "";

    //anotherfield += '<div id="oneexercise"><br /> <select id="exercise" style="width:70%;"> <option value="" disabled selected>Choose an exercise</option> </select> <input id="reps" style="width: 20%;" type="text" placeholder="Sets" /> <input type="button" class="deletefield" style="width:4%; padding: 1px; font-size:20px; background:transparent; color:#888; text-align:right; text-transform:lowercase;" value="x" /> </div>'

    $("#exercises").append(temp);
});

$("#exercises").on('click', '.deletefield', function () {
    $(this).parent(".oneexercise").remove();
});


//$("#addnew").on('click', '.deletefield', function () {
//    $(this).parent("#oneexercise").remove(); TODO: hitta rätt element att ta bort --------------------- !
//}); 

$(".datepicker").datepicker();