function converteJsonMatriz(data) {
    var matriz = [];
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].data; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].produto; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].praca; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].tipo; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].unidade; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].preco; }));
    return matriz;
}

function construirTabela(matriz, tabela){
    console.log("Tabela Excel")
    var idColunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Preço"];
    var tabela = document.getElementById(tabela);
    var thead = document.createElement('thead');
    var linha = document.createElement("tr");
    var coluna;
    for(var i = 1; i < idColunas.length; i++){
        coluna = document.createElement("th");
        coluna.textContent = idColunas[i];
        coluna.bgColor = "#FF0000";
        linha.appendChild(coluna);
    }
    thead.appendChild(linha);
    tabela.appendChild(thead);
    var tbody = document.createElement('tbody');
    for(var i = 0; i < matriz[0].length; i++){ // linha
        linha = document.createElement("tr");
        for(var j= 1; j < idColunas.length; j++){ // coluna
            coluna = document.createElement("td");
            coluna.textContent = matriz[j][i];
            linha.appendChild(coluna);
        }
        tbody.appendChild(linha);

    }
    tabela.appendChild(tbody);

}
