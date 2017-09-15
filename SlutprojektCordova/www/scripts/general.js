var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net";
var currentDomain = azureDomain;

$("#sidemenu").hide();
$("#ui-datepicker-div").hide();
$("#addmenu").hide();
$("#addmenu2").hide();
$("#menuToggle").hide();
$("#cardioprogram").hide();
$("#otherprogram").hide();
$("#hamburger").show();
$("#hamburgermenu").hide();

document.addEventListener("deviceready", function () {

    $("input[type=text], input[type=number]").focus(function () {
        $("#footer").slideUp(1000);
    });

    $("input[type=text], input[type=number]").blur(function () {
        $("#footer").slideDown(1000);
    });

    // Sidemenu (hamburger)
    $("#hamburgericon").click(function () {
        $("#hamburgermenu").show();
        $("#sidemenu").slideToggle();
        $("#wrapper").toggleClass("clickadd");
    });

    $("#addProgramfromMenu").click(function () {
        window.location = "add.html";
    });

    $("#logout").click(function () {
        window.location = "index.html";
    });

    $("#donateclick").click(function () {
        alert("If you like this app, please consider donating to us :)\n\nSwish: \n0707748177 \n0736407799");
    });

    $("#aboutus").click(function () {
        window.location = "about.html";
    });

    
    // Klicka på gröna plusset
    $("#addbutton").click(function () {
        $("#addmenu2").toggle('slide', { direction: 'right' });
        $("#wrapper").toggleClass("clickadd");
    });

    // Klicka utanför gröna plusset
    $("#wrapper").click(function () {
        $("#wrapper").removeClass("clickadd");
        $("#addmenu").hide();
        $("#addmenu2").hide();
        $("#sidemenu").hide();
    });

    // Klicka på add work out
    $("#toaddwo").click(function () {
        if (storage.getItem("UserExercises") === null) {

            $.ajax({
                url: currentDomain + "/Member/UserExercises",
                type: "GET",

                success: function (result) {
                    var jsonString =
                        storage.setItem("UserExercises", JSON.stringify(result));
                    window.location = "add.html";
                },
                error: function (result) {
                    alert("Fel vid inhämtning av övningar");
                }
            });
        }
        else {
            window.location = "add.html";

        }

    });

    // Klicka på add weight
    $("#toaddweight").click(function () {
        window.location = "measurements.html";
    });

    // Klicka på spara weight
    $("#saveweight").click(function () {

        var temp = JSON.stringify(new Date($(".datepicker").val()));
        var weightToSend = {
            "bodyWeight": $("#weightbox").val(),
            "date": JSON.parse(temp)
        };

        $.ajax({
            url: currentDomain + "/Member/SaveMeasurements",
            type: "POST",
            data: weightToSend,
            success: function (result) {
                console.log("Det gick bra att spara");
                window.location = "main.html";
            },
            error: function (result) {
                alert("Kunde inte logga vikt");
            }
        });
        // TODO: SPARA NER DATAN --------------------------------------------------------------------------- !
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

    $(".addanother").click(function () {
        var temp = $(".oneexercise").clone().wrap('<p>').parent().html();
        $("#exercises").append(temp);
    });


    $("#exercises").on('click', '.deletefield', function () {
        $(this).parent(".oneexercise").remove();
    });


    // Datepicker
    if (document.getElementById("addweightwrapper")) {
        $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd', firstDay: 1, maxDate: new Date() });
    }
    else {
        $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd', firstDay: 1 });
    }

    $(".datepicker").datepicker('setDate', new Date());
    $(".datapicker").on("change", function () {
        var fromdate = $(this).val();
    });


    // Delete ongoing WO
    $("#deleteCurrent").click(function () {
        storage.removeItem("currentWO");
        alert("Current workout successfully deleted.")
        location.reload();
    });
});

