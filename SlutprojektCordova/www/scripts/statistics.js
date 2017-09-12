document.addEventListener("deviceready", function () {
    // Klicka på Statistik

    $("#homeicon").removeClass("selectedicon");
    $("#calendaricon").removeClass("selectedicon");
    $("#statsicon").addClass("selectedicon");


    $.ajax({
        url: currentDomain + "/member/Statistics",
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
            var strengthVal = result.statistics[2].stats.data[0];
            var cardioVal = result.statistics[2].stats.data[1];
            var otherVal = result.statistics[2].stats.data[2];

            var pieData = {
                labels: [
                    "Strength",
                    "Cardio",
                    "Other"],
                datasets: [
                    {
                        data: [strengthVal, cardioVal, otherVal],
                        backgroundColor: [
                            "#0054A6",
                            "#FF7611",
                            "#630460"
                        ]
                    }]
            };

            var ctx = document.getElementById("percentPieChart").getContext("2d");

            var pieChart = new Chart(ctx, {
                type: 'pie',
                data: pieData,
                options: {
                    legend: { position: "bottom" }
                }
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