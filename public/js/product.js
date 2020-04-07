function charts(time) {
    $.ajax({
        type: "GET",
        url: "/",
        data: "_token = <?php echo csrf_token() ?>",
        data: {

        },
        success: function(data) {
            console.log(data)
            var results;

            var dataCol = ['Ano', 'Valores'];
            var dataArray = [dataCol];
            var value = 0;
            for (i = 1; i < results.length; i++) {
                aux = [];
                aux.push(results[i].data);
                value = value + (parseFloat(results[i].values) - parseFloat(results[i - 1].values)) / parseFloat(results[i - 1].values)
                aux.push(value);
                console.log(value)
                dataArray.push(aux);
            }
            console.log(dataArray);
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.arrayToDataTable(dataArray);

                var options = {
                    width: 900,
                    height: 450,
                    title: 'chart',
                    legend: { position: 'bottom' },
                    pointSize: 3,
                };

                var chart = new google.visualization.LineChart(document.getElementById('chart'));

                chart.draw(data, options);
            }

        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}