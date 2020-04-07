function criarGraficoBarrasProduto(resultados, producao, index, indexCidade, indexVariavel, cidade, variavel) {
    console.log("criou o gráfico");
    criarGraficoBarraDinamico(producao, indexCidade, indexVariavel);
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawStuff);
    var aux_vetor = Produtos[index].slice();
    aux_vetor.unshift('Ano');
    var dados_aux = [
        aux_vetor,
    ];
    var anos;
    if (datasSelecionadas.length == 0) {
        anos = ["2010", "2011", "2012", '2013', '2014', '2015', '2016', '2017', "2018"];
    } else {
        anos = datasSelecionadas;
        anos = anos.sort();
    }
    resultadoBarras = agruparDatasPorProduto(resultados, Produtos[index], anos, index, indexCidade, indexVariavel);
    console.log("Resultado barras");
    console.log(resultadoBarras);
    for (var i = 0; i < anos.length; i++) {
        var linhaBarra = [];
        //var datas = resultadoBarras[0][0]; // 0 cidade considerando apenas 1 ; 0 data; 1 valor
        linhaBarra.push(anos[i] + "");
        for (var j = 0; j < Produtos[index].length; j++) {
            var valores = resultadoBarras[j][1]; // somente valores
            //console.log(valores[i]);
            linhaBarra.push(parseFloat(valores[i]));

        }
        dados_aux.push(linhaBarra);

        //print(dados_aux);
    }
    console.log("Olhar essa matriz gráfico Barras");
    console.log(dados_aux);
    //console.log(agruparDatasPorCidades(resultados, nomesSelecionados, anos));
    function drawStuff() {
        var data = new google.visualization.arrayToDataTable(dados_aux);
        var view = new google.visualization.DataView(data);
        var options = {
            title: "Gráfico de barras - " + cidade + ": " + variavel,
            width: 600,
            height: 400,
            bar: { groupWidth: "90%" },
            legend: { position: 'bottom', maxLines: 3 },
            backgroundColor: '#fafafa',
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values_" + producao + "_" + indexCidade + "_" + indexVariavel));
        chart.draw(view, options);
    };

}





function criarGraficoBarras(resultados, producao, index, indexProduto, indexVariavel, produto, variavel) {
    console.log("criou o gráfico");
    criarGraficoBarraDinamico(producao, indexProduto, indexVariavel);
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawStuff);
    var aux_vetor = nomesSelecionados.slice();
    aux_vetor.unshift('Ano');
    var dados_aux = [
        aux_vetor,
    ];
    var anos;
    if (datasSelecionadas.length == 0) {
        anos = ["2010", "2011", "2012", '2013', '2014', '2015', '2016', '2017', "2018"];
    } else {
        anos = datasSelecionadas;
        anos = anos.sort();
    }
    resultadoBarras = agruparDatasPorCidades(resultados, nomesSelecionados, anos, index, indexProduto, indexVariavel);
    console.log("Resultado barras");
    console.log(resultadoBarras);
    for (var i = 0; i < anos.length; i++) {
        var linhaBarra = [];
        //var datas = resultadoBarras[0][0]; // 0 cidade considerando apenas 1 ; 0 data; 1 valor
        linhaBarra.push(anos[i] + "");
        for (var j = 0; j < nomesSelecionados.length; j++) {
            var valores = resultadoBarras[j][1]; // somente valores
            //console.log(valores[i]);
            linhaBarra.push(parseFloat(valores[i]));

        }
        dados_aux.push(linhaBarra);

        //print(dados_aux);
    }
    console.log("Olhar essa matriz gráfico Barras");
    console.log(dados_aux);
    //console.log(agruparDatasPorCidades(resultados, nomesSelecionados, anos));
    function drawStuff() {
        var data = new google.visualization.arrayToDataTable(dados_aux);
        var view = new google.visualization.DataView(data);
        var options = {
            title: "Gráfico de barras - " + produto + ": " + variavel,
            width: 600,
            height: 400,
            bar: { groupWidth: "90%" },
            legend: { position: 'bottom', maxLines: 3 },
            backgroundColor: '#fafafa',
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values_" + producao + "_" + indexProduto + "_" + indexVariavel));
        chart.draw(view, options);
    };

}


function criarGraficoLinhaTemporalProduto(resultados, producao, index, indexCidade, indexVariavel, cidade, variavel) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    console.log("CriouLinha");
    criarGraficoLinhaDinamico(producao, indexCidade, indexVariavel);
    var aux_vetor = Produtos[index].slice();
    aux_vetor.unshift('Ano');
    var dados_aux = [
        aux_vetor,
    ];
    var anos = [];

    for (var i = 1974; i < 2019; i++) {
        anos[i - 1974] = i + "";
    }
    resultadoBarras = agruparDatasPorProduto(resultados, Produtos[index], anos, index, indexCidade, indexVariavel);
    console.log("Resultado linhas");
    console.log(resultadoBarras);
    for (var i = 0; i < anos.length; i++) {
        var linhaBarra = [];
        //var datas = resultadoBarras[0][0]; // 0 cidade considerando apenas 1 ; 0 data; 1 valor
        linhaBarra.push(anos[i] + "");
        for (var j = 0; j < Produtos[index].length; j++) {
            var valores = resultadoBarras[j][1]; // somente valores
            //console.log(valores[i]);
            linhaBarra.push(parseFloat(valores[i]));

        }
        dados_aux.push(linhaBarra);

    }
    console.log("grafico de linhas");
    console.log(dados_aux);

    function drawChart() {
        var data = new google.visualization.arrayToDataTable(dados_aux);
        //console.log(dados);
        var options = {
            width: 600,
            height: 400,
            title: 'Série Temporal - ' + cidade + ": " + variavel,
            backgroundColor: '#fafafa',
            legend: { position: 'bottom' },
            pointSize: 3,
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_' + producao + "_" + indexCidade + "_" + indexVariavel));

        chart.draw(data, options);




    }
}



function criarGraficoLinhaTemporal(resultados, producao, index, indexProduto, indexVariavel, produto, variavel) {
    google.charts.load('current', { 'packages': ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawChart);
    console.log("CriouLinha");
    criarGraficoLinhaDinamico(producao, indexProduto, indexVariavel);
    var aux_vetor = nomesSelecionados.slice();
    aux_vetor.unshift('Ano');
    var dados_aux = [
        aux_vetor,
    ];
    var anos = [];

    for (var i = 1974; i < 2019; i++) {
        anos[i - 1974] = i + "";
    }
    resultadoBarras = agruparDatasPorCidades(resultados, nomesSelecionados, anos, index, indexProduto, indexVariavel);
    console.log("Resultado linhas");
    console.log(resultadoBarras);
    for (var i = 0; i < anos.length; i++) {
        var linhaBarra = [];
        //var datas = resultadoBarras[0][0]; // 0 cidade considerando apenas 1 ; 0 data; 1 valor
        linhaBarra.push(anos[i] + "");
        for (var j = 0; j < nomesSelecionados.length; j++) {
            var valores = resultadoBarras[j][1]; // somente valores
            //console.log(valores[i]);
            linhaBarra.push(parseFloat(valores[i]));

        }
        dados_aux.push(linhaBarra);

    }

    function drawChart() {
        var data = new google.visualization.arrayToDataTable(dados_aux);
        //console.log(dados);
        var options = {
            width: 600,
            height: 400,
            title: 'Série Temporal - ' + produto + ": " + variavel,
            backgroundColor: '#fafafa',
            legend: { position: 'bottom' },
            pointSize: 3,
            trendlines: {
                0: {
                    type: 'exponential',
                    pointSize: 20,
                    opacity: 0.6,
                    pointsVisible: false
                },
                1: {
                    type: 'linear',
                    pointSize: 10,
                    pointsVisible: true
                }
            }
        };

        console.log(options);

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_' + producao + "_" + indexProduto + "_" + indexVariavel));

        chart.draw(data, options);




    }
}


function criarGraficoPizza3D(resultados, producao) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    /*var dados = [];
    dados.push(["Ano", f_valorProdutos.split("-")[0]]);
    for (var i = f_datas.length - 1; i > f_datas.length - 9; i--) {
        dados.push([f_datas[i].data, parseFloat(f_valores[i].valor)]);
    }*/
    // console.log(dados);
    var dados_aux = [
        ['Município', 'Valor'],
        ['Feira de Santana', 1000],
        ['Salvador', 1170],
        ['Alagoinhas', 660]
    ];

    function drawChart() {
        var data = google.visualization.arrayToDataTable(dados_aux);

        var options = {
            //title: 'Gráfico de Pizza com as porcentagens do município de ' + f_municipios,
            title: "teste",
            //subtitle: f_nomeProdutos,
            is3D: true,
            width: 600,
            height: 400,
            backgroundColor: '#fafafa',
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d_' + producao));
        chart.draw(data, options);
    }
}


function criarGráficoBolha(resultados, producao) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {
        var dados_aux = [
                ['Município', 'X', 'Y', 'Subdivisão', 'Valor'],
                ['Feira de Santana', 2, 1.67, 'A', 33739900],
                ['Salvador', 6, 1.36, 'B', 81902307],
                ['Alagoinhas', 10, 1.84, 'C', 5523095],
            ]
            /*
            var dados = [["Valor", "X", "Y", "Ano", "Valor"]];
            var j = -1;
            var vet = [0,5,2,1,2,5,15]; // vetor usado para posicionar as bolhas no espaço em relação aos anos pares
            var vet2 = [0,1,4,5,3.5,1.5,15]; // vetor usado para posicionar as bolhas no espaço em relação aos anos ímpares
            var k = 1;
            for(var i = f_valores.length-1; i > f_valores.length - 11; i--){
                if(i%2 == 0){
                    dados.push([f_valores[i].valor, j+0.7,vet[k],
                        f_datas[i].data, parseFloat(f_valores[i].valor)]);
                    k++;
                }else{
                    dados.push([f_valores[i].valor, j+0.7,vet2[k]+6,
                        f_datas[i].data, parseFloat(f_valores[i].valor)]);
                }
                j++;

            }
            console.log(dados);*/
        var data = google.visualization.arrayToDataTable(dados_aux);
        var options = {
            width: 600,
            height: 400,
            //title: "Gráfico de Bolhas de "+f_municipios +"\nProdução: "+ f_nomeProdutos+" - "+ f_valorProdutos.split("-")[0] +" por ano" ,
            title: "teste",
            hAxis: { textPosition: 'none', baselineColor: 'white', gridlines: { color: 'white' }, minValue: 0, maxValue: 12 },
            vAxis: { textPosition: 'none', maxValue: 8, minValue: 0, baselineColor: 'white', gridlines: { color: 'white' } },
            bubble: { textStyle: { fontSize: 11 } },
            sizeAxis: { minValue: 0, maxSize: 40 },
            backgroundColor: '#fafafa',
            //chartArea:{width:'50%',height:'300px'}
        };
        var chart = new google.visualization.BubbleChart(document.getElementById('bubble_chart_div_' + producao));
        chart.draw(data, options);
    }
}


function criarGraficoLinhaDinamico(idAreaGrafico, indexProduto, indexVariavel) { // referenciaAreaGrafico = [agricola, silvicultura, pecuaria];
    var corpo_grafico_linha = document.getElementById("AreaGrafico_" + idAreaGrafico);
    var divColunaLinha = document.createElement("div");
    var graficoLinha = document.createElement("div");
    corpo_grafico_linha.className = "row";
    divColunaLinha.id = "linha_" + idAreaGrafico + "_" + indexProduto + "_" + indexVariavel;
    divColunaLinha.className = "col-md-6";
    divColunaLinha.style = "margin-top:50px; padding: 5px; float: left; ";
    graficoLinha.id = "curve_chart_" + idAreaGrafico + "_" + indexProduto + "_" + indexVariavel;
    divColunaLinha.appendChild(graficoLinha);
    corpo_grafico_linha.appendChild(divColunaLinha);
}

function criarGraficoBarraDinamico(idAreaGrafico, indexProduto, indexVariavel) {
    var corpo_grafico_linha = document.getElementById("AreaGrafico_" + idAreaGrafico);
    var divColunaLinha = document.createElement("div");
    var graficoLinha = document.createElement("div");
    corpo_grafico_linha.className = "row";
    divColunaLinha.id = "barra_" + idAreaGrafico + "_" + indexProduto + "_" + indexVariavel;
    divColunaLinha.className = "col-md-6";
    divColunaLinha.style = "margin-top:50px; padding: 5px; float: left";
    graficoLinha.id = "columnchart_values_" + idAreaGrafico + "_" + indexProduto + "_" + indexVariavel;
    divColunaLinha.appendChild(graficoLinha);
    corpo_grafico_linha.appendChild(divColunaLinha);
}
