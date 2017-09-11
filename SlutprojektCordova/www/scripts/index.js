// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net/";
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
        url: "http://localhost:49902/Account/Login",
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
        });

        $.ajax({
            url: "http://localhost:49902/Member/Index",
            type: "get",
            success: function (result) {

                storage.setItem("WorkoutSessions", JSON.stringify(result));
                var temp = JSON.parse(storage.getItem("WorkoutSessions"));
            },
            error: function (result) {
                alert("fel vid storage")
            }
        });
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
        $("#nameofProgram").html(currentWO.SessionName);

        var content = "";

        // Alla övningar
        for (var k = 0; k < currentWO.Exercises.length; k++) {

            var exerciseString = "";
            exerciseString += '<div class="exerciseWrapper"><h2 style="font-weight:bold; text-align:left;"> ' + currentWO.Exercises[k].exerciseChoice + '</h2>' + '<table class="ovning" style="width:100%; border-bottom: 2px dashed #dbdbdb; padding:2px 5px 20px 0;"> <tr> <td style="width:25%;"></td> <td style="width:40%;">Reps</td> <td style="width:40%;">Kg</td> <td style="width:5%;"></td> </tr>';

            // En övning
            for (var j = 0; j < currentWO.Exercises[k].sets.length; j++) {
                var oneRow = '<tr> <td style="font-weight:bold; font-size:14px;">SET' + (j + 1) + '</td> <td>';
                if (currentWO.Exercises[k].sets[j].reps === null) {
                    oneRow += '<input class="repsCount" type="number" style="width:50%;" />';
                } else {
                    oneRow += '<input class="repsCount" value="' + currentWO.Exercises[k].sets[j].reps + '" type="number" style="width:50%;" />';
                }
                oneRow += '</td > <td>';
                if (currentWO.Exercises[k].sets[j].weight === null) {
                    oneRow += '<input class="weightCount" type="number" style="width:50%;" />';

                } else {
                    oneRow += '<input value="' + currentWO.Exercises[k].sets[j].weight + '" type="number" style="width:50%;" />';
                }

                oneRow += '</td> <td><input type="button" class="deletefield" style="padding: 1px; font-size:20px; background:transparent; color:#888; text-align:right; text-transform:lowercase;" value="x" /></td> </tr > ';
                exerciseString += oneRow;
            }

            var endof = "";
            endof += '<tr> <td> <img class="addanotherrun" src="images/add40.png" style="margin:auto; width:20px; height:20px;" /> </td> <td></td><td><br /><br /><input type="button" class="finishOneExercise" value="Finish exercise" /></td></tr> </table></div>'
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

        var allWorkoutSessions = JSON.parse(storage.getItem("WorkoutSessions")); // --------------- STORAGE?

        var listviewfull = "";
        
        for (var i = 0; i < allWorkoutSessions.length; i++) {
            listviewfull += '<li><span class="listdate">' + allWorkoutSessions[i].date + '</span><span class="listcontent">' + allWorkoutSessions[i].sessionName + '</span></li>'
        }
        $("#calList").append(listviewfull);
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
        "SessionName": $("#programname").val(),
        "Date": $(".datepicker").val(),
        "Exercises": exerciseChosen
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

            setArray.push({ Reps: repsCount[i], Weight: weightCount[i] });
        }

        var exerciseName = $(element).find("h2").html();
        var exercise = {
            "Name": exerciseName,
            "Sets": setArray,
        };

        exerciseArray.push(exercise);
    })
    var saveFullProgram = {
        "SessionName": $("#nameofProgram").html(),
        "exercises": exerciseArray,
        "Date": JSON.parse(storage.getItem("currentWO")).date
    };

    //Test ----------- Denna fungerar, namn på proppar var tvungna att mappa mot vår vymodel där vi tar emot ajax, därför namen är ändrade
    var jsonObjecToSend = {
        "Exercises": exerciseArray,
        "Date": $(".datepicker").val(), //TODO GIVE me a real value please
        "Type": "Strength",
        "Duration": null,
        "Distance": null,
        "SessionUserNote": "Give me a real value", //TODO
        "SessionName": $("#nameofProgram").html(),
    };

    //storage.setItem("currentWO", jsonObjecToSend);

    $.ajax({
            url: "http://localhost:49902/member/saveworkout",
            type: "POST",
            data: jsonObjecToSend,
            success: function (result) {
                alert("Workout Saved successfully!")
            },
            error: function (result) {
                alert("Error att save")
            }
        });

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

// ADD WEIGHT MEASUREMENTS
$("#saveweight").click(function () {
    var jsonObjecToSend = {
        "Weight": $("#weightbox").val(),
        "Date": $(".datepicker").val(), //TODO GIVE me a real value please
    };

    $.ajax({
        url: "http://localhost:49902/member/savemeasurements",
        type: "POST",
        data: jsonObjecToSend,
        success: function (result) {
            alert("Measurements saved successfully!")
        },
        error: function (result) {
            alert("Error att save")
        }
    });
});


$(".addanother").click(function () {
    var temp = $(".oneexercise").clone().wrap('<p>').parent().html();
    $("#exercises").append(temp);
});

// Add-knapp i run
//$(".addanotherrun").click(function () { // -------------------------------- FUNKAR INTE pga tabell 
//    var temp = $(".oneexercise").clone().wrap('<p>').parent().html();
//    $("#exercises").append(temp);
//});



$("#exercises").on('click', '.deletefield', function () {
    $(this).parent(".oneexercise").remove();
});

// Remove-knapp i run
$(".ovning").on('click', '.deletefield', function () { // ---------------------------------------- FUNKAR INTE
    $(this).parent("tr").remove();
});


//$("#addnew").on('click', '.deletefield', function () {
//    $(this).parent("#oneexercise").remove(); TODO: hitta rätt element att ta bort --------------------- !
//}); 

// KALENDER
$(".datepicker").datepicker({ dateFormat: 'yy-mm-dd', firstDay: 1 });
$(".datepicker").datepicker('setDate', new Date());
$(".datapicker").on("change", function () {
    var fromdate = $(this).val();
});