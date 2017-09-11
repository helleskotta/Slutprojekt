var storage = window.localStorage;
var localDomain = "http://localhost:49902";
var azureDomain = "http://slutprojektbackend.azurewebsites.net/";


document.addEventListener("deviceready", function () {

    $("#ui-datepicker-div").hide();
    $("#addmenu").hide();
    $("#addmenu2").hide();
    $("#menuToggle").hide();
    $("#hamburger").show();
    $("#hamburgermenu").hide();
    $("#cardioprogram").hide();
    $("#otherprogram").hide();
    $("#addweightwrapper").hide();

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

    // Datepicker
    $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd', firstDay: 1 });
    $(".datepicker").datepicker('setDate', new Date());
    $(".datapicker").on("change", function () {
        var fromdate = $(this).val();
    });

});