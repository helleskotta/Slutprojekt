document.addEventListener("deviceready", function () {
    // Klicka på Statistik

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").removeClass("selectedicon");
    $("#statsicon").addClass("selectedicon");


    $.ajax({
        url: "http://localhost:49902/member/Statistics",
        type: "GET",

        success: function (result) {
            console.log("Stats acquired successfully!");
            storage.setItem("statistics", JSON.stringify(result));

            // Total weights lifted number
            $("#totalweightlifted").attr("data-count", result.statistics[1].stats.totalWeightLifted);
            $('.counter').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');

                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                    {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    });
            });

            // Type of exercise chart
            var myNewChart;
            var strengthVal = 60;
            var cardioVal = 30;
            var otherVal = 2;


            var data = [
                {
                    label: "Strength",
                    value: strengthVal,
                    color: "#0054A6"
                }, {
                    label: "Cardio",
                    value: cardioVal,
                    color: "#FF7611"
                }, {
                    label: "Other",
                    value: otherVal,
                    color: "#630460"
                },
            ];

            var options = {
                legend: { display: true },
                animation: true,
                animationSteps: 80
            };

            var ctx2 = document.getElementById("percentPieChart").getContext("2d");

            myNewChart = new Chart(ctx2, {
                type: 'pie',
                data: data,
                options: options
            });

            // Weight stats
            var labels = result.statistics[0].stats.dateData;
            var dataRight = result.statistics[0].stats.weightData;

            var data = {
                labels: labels,
                datasets: [{
                    fill: false,
                    pointBorderColor: "purple",
                    pointBackgroundColor: "purple",
                    pointBorderWidth: 1,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: "purple",
                    pointHoverBorderColor: "purple",
                    pointHoverBorderWidth: 2,
                    tension: 0,
                    data: dataRight,
                }]
            };

            var context = document.getElementById('testChart').getContext('2d');
            var chart = new Chart(context, {
                type: 'line',
                data: data,
                options: {
                    legend: { display: false },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    'millisecond': 'MMM DD',
                                    'second': 'MMM DD',
                                    'minute': 'MMM DD',
                                    'hour': 'MMM DD',
                                    'day': 'MMM DD',
                                    'week': 'MMM DD',
                                    'month': 'MMM DD',
                                    'quarter': 'MMM DD',
                                    'year': 'MMM DD',
                                }
                            },
                            position: "bottom",
                            ticks: {
                                fontFamily: "Open Sans",
                            }
                        }],
                        yAxes: [{
                            position: "left",
                            ticks: {
                                fontFamily: "Open Sans",
                                reverse: false,
                                min: 0,
                                //max: 160,
                                fixedStepSize: 10
                            },
                        }],
                    },
                }
            });

        },
        error: function (result) {
            alert("Fel i statistik");
        }
    });

});