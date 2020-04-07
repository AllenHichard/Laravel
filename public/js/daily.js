$(document).ready(function() {
    table();
    charts('dayOne');
});

function charts(time) {
    $.ajax({
        type: "GET",
        url: "/dailyReq",
        data: "_token = <?php echo csrf_token() ?>",
        data: {

        },
        success: function(data) {
            console.log(data)
            var results;
            if (time == 'dayOne') {
                results = data.results;
            } else if (time == 'dayTwo') {
                results = data.results2;
            } else if (time == 'monthOne') {
                results = data.results3;
            } else if (time == 'monthTwo') {
                results = data.results4;
            }

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

var i = 0;


function table() {
    $.ajax({
        type: "GET",
        url: "/table",
        data: "_token = <?php echo csrf_token() ?>",
        data: {

        },
        success: function(data) {
            console.log(data)
            products = data.products;
            array = chunkArray(products, products.length / 3);
            var table1 = array[0];
            var table2 = array[1];
            var table3 = array[2];
                console.log(table1[i][0])
                    document.getElementById("table1").innerHTML += 
                '<table  class="table table-hover table-mc-light-blue" id="col1'+ i +'" >'+
                '<caption>' + '<a class="link" href="/productInfo?name=' + table1[i][0].produto + '" target="_blank">' + table1[i][0].produto + '</a>' + '</caption>'+
               ' <thead>'+
                  '<tr>'+
                    '<th>' + 'Preço' + '</th>'+
                    '<th>'+ 'Cidade' + ' </th>'+
                  '</tr>'+
                '</thead>'+
                    '<tbody>'+
                    '</tbody>'+
                    '</table>';
                    for(j=0; j<table1[i].length; j++){
                        console.log(table1[i][j])
                        document.getElementById("col1" + i).innerHTML +=
                        '<tr>' +
                    '<td data-title="ID">' + table1[i][j].values + '</td>' +
                    '<td>' + table1[i][j].praca + '</td>' +
                    ' </tr>';
                    }                
                
                    console.log(table2[i][0])
                        document.getElementById("table2").innerHTML += 
                    '<table  class="table table-hover table-mc-light-blue" id="col2'+ i +'" >'+
                    '<caption>' + '<a class="link" href="/productInfo?name=' + table2[i][0].produto + '" target="_blank">' + table2[i][0].produto + '</a>' + '</caption>'+
                   ' <thead>'+
                      '<tr>'+
                        '<th>' + 'Preço' + '</th>'+
                        '<th>'+ 'Cidade' + ' </th>'+
                      '</tr>'+
                    '</thead>'+
                        '<tbody>'+
                        '</tbody>'+
                        '</table>';
                        for(j=0; j<table2[i].length; j++){
                            console.log(table2[i][j])
                            document.getElementById("col2" + i).innerHTML +=
                            '<tr>' +
                        '<td data-title="ID">' + table2[i][j].values + '</td>' +
                        '<td>' + table2[i][j].praca + '</td>' +
                        ' </tr>';
                        }                
                        console.log(table3[i][0])
                            document.getElementById("table3").innerHTML += 
                        '<table  class="table table-hover table-mc-light-blue" id="col3'+ i +'" >'+
                        '<caption>' + '<a class="link"  href="/productInfo?name=' + table3[i][0].produto + '" target="_blank">' + table3[i][0].produto + '</a>' + '</caption>'+
                       ' <thead>'+
                          '<tr>'+
                            '<th>' + 'Preço' + '</th>'+
                            '<th>'+ 'Cidade' + ' </th>'+
                          '</tr>'+
                        '</thead>'+
                            '<tbody>'+
                            '</tbody>'+
                            '</table>';
                            for(j=0; j<table3[i].length; j++){
                                console.log(table3[i][j])
                                document.getElementById("col3" + i).innerHTML +=
                                '<tr>' +
                            '<td data-title="ID">' + table3[i][j].values + '</td>' +
                            '<td>' + table3[i][j].praca + '</td>' +
                            ' </tr>';
                            }                
            console.log(array);

        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}