var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net";
var currentDomain = localDomain;

document.addEventListener("deviceready", function () {

    $("#ui-datepicker-div").hide();
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#menuToggle").hide();
    $("#hamburger").show();
    $("#hamburgermenu").hide();
    $("#cardioprogram").hide();
    $("#otherprogram").hide();

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
                url: currentDomain + "/Member/UserExercises",
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
        window.location = "measurements.html";
    });

    // Klicka på spara weight
    $("#saveweight").click(function () {

        var temp = JSON.stringify(new Date($(".datepicker").val()));
        var weightToSend = {
            "bodyWeight": $("#weightbox").val(),
            "date": JSON.parse(temp),
        }

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

    $(".addanother").click(function () {
        var temp = $(".oneexercise").clone().wrap('<p>').parent().html();
        $("#exercises").append(temp);
    });


    $("#exercises").on('click', '.deletefield', function () {
        $(this).parent(".oneexercise").remove();
    });


    // Datepicker
    $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd', firstDay: 1 });
    $(".datepicker").datepicker('setDate', new Date());
    $(".datapicker").on("change", function () {
        var fromdate = $(this).val();
    });

});