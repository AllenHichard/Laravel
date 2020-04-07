$.ajax({
    type: 'GET',
    url: '/carregarOp',
    success: function(data) {
        console.log(("okkkk"));
        console.log(data.pracas);
        console.log(data.produtos);
        var dat = new Date();
        var dia = dat.getDate();
        var mes = dat.getMonth();
        var ano4 = dat.getFullYear();
        var valueData = ano4 + "-" + (mes + 1) + "-" + dia;


        for (var i = 0; i < data.produtos.length; i++) {
            var select = document.getElementById("campoProduto");
            var option = document.createElement("option");
            option.value = data.produtos[i].nome;
            option.text = data.produtos[i].nome;
            select.appendChild(option);
        }
        for (var i = 0; i < data.pracas.length; i++) {
            var select = document.getElementById("campoPraca");
            var option = document.createElement("option");
            option.value = data.pracas[i].praca;
            option.text = data.pracas[i].praca;
            select.appendChild(option);
        }
        for (var i = 0; i < data.tipos.length; i++) {
            /*var select = document.getElementById("campoTipo");
            var option = document.createElement("option");
            option.value = data.tipos[i].nome;
            option.text = data.tipos[i].nome;
            select.appendChild(option);*/
        }
        for (var i = 0; i < data.unidades.length; i++) {
            var select = document.getElementById("campoUnidade");
            var option = document.createElement("option");
            option.value = data.unidades[i].unidade;
            option.text = data.unidades[i].unidade;
            select.appendChild(option);
        }
    }
});


function popupOpenClose(popup) {

    /* Add div inside popup for layout if one doesn't exist */
    if ($(".wrapper").length == 0) {
        $(popup).wrapInner("<div class='wrapper'></div>");
    }

    console.log(document.getElementById("submit"))
    if (index == 0) {
        $("#submit").click(function(e) {
            console.log("okkk botao");
            var Data = valueData;
            var Produto = document.getElementById("campoProduto").value;
            var Praca = document.getElementById("campoPraca").value;
            var Tipo = document.getElementById("campoTipo").value;
            var Unidade = document.getElementById("campoUnidade").value;
            var Preco = document.getElementById("campoPreco").value;
            valores = [Data, Produto, Praca, Tipo, Unidade, Preco];
            criarlinha(valores);
            $(popup).hide();
        });

        $("#campoProduto").change(function(e) {

            document.getElementById("campoTipo").innerHTML = ""
            var select = document.getElementById("campoTipo");
            var option = document.createElement("option");
            option.value = "";
            option.text = "-- selecione --";
            select.appendChild(option);

            var ProSel = $(this).val();
            $.ajax({
                type: 'GET',
                url: '/carregarTipo',
                data: {
                    ProSel: ProSel,
                },
                success: function(data) {
                    console.log(data.tipos);
                    for (var i = 0; i < data.tipos.length; i++) {
                        var select = document.getElementById("campoTipo");
                        var option = document.createElement("option");
                        option.value = data.tipos[i].nome;
                        option.text = data.tipos[i].nome;
                        select.appendChild(option);
                    }
                },
                error: function(error) {
                    alert("erro AJAX");
                }
            });
        });

    }


    /* Open popup */
    $(popup).show();

    /* Close popup if user clicks on background */
    $(popup).click(function(e) {
        if (e.target == this) {
            if ($(popup).is(':visible')) {
                $(popup).hide();
            }
        }
    });

    /* Close popup and remove errors if user clicks on cancel or close buttons */
    $(popup).find("button[name=close]").on("click", function() {
        if ($(".formElementError").is(':visible')) {
            $(".formElementError").remove();
        }
        $(popup).hide();
    });
}

$(document).ready(function() {
    $("[data-js=open]").on("click", function() {
        popupOpenClose($(".popup"));
    });
});

function criarlinha(valores) {

    corLinha = 0;
    var tabela = document.getElementById("tabelaAtual");
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor"];

    var linha = document.createElement("div");
    linha.className = "row dinamico" + 2;
    var celula = document.createElement("div");
    celula.className = "cell";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkBox" + 2;
    input.id = 2 + "-" + index;

    input.className = "estiloColunaCheck checkBox" + 2;
    input.addEventListener('change', function(e) {
        console.log($(this)[0].id);
    });

    celula.appendChild(input);
    linha.appendChild(celula);

    for (var j = 1; j < 5; j++) {
        celula = document.createElement("div");
        celula.className = "cell";
        celula.title = colunas[j];
        celula.textContent = valores[j];
        celula.setAttribute("data-title", colunas[j]);
        linha.appendChild(celula);
    }

    var celula = document.createElement("div");
    celula.className = "cell";
    celula.title = "Preço";
    celula.setAttribute("data-title", "Preço");
    var input = document.createElement("input");
    input.id = "preco-" + 1 + "-" + index;

    if (corLinha % 2 == 0) {
        linha.style = "background-color: #f6f6f6; color: #666666";
        input.style = "background-color: #f6f6f6; color: #666666";
        corLinha++;
    } else {
        linha.style = "background-color: #e9e9e9; color: #666666";
        input.style = "background-color: #e9e9e9; color: #666666";
        corLinha--;
    }
    input.placeholder = valores[5];
    //celula.value = matriz[5][i];
    input.placeholder.style = "color: #666666";
    input.className = "estiloInputValor";
    input.title = colunas[5];
    celula.append(input);
    linha.appendChild(celula);
    tabela.appendChild(linha);

    index += 1;


}




function moverlinha(valores, i) {

    corLinha = 0;
    var tabela = document.getElementById("tabelaAtual");
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor"];

    var linha = document.createElement("div");
    linha.className = "row dinamico" + 1;
    var celula = document.createElement("div");
    celula.className = "cell";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkBox" + 1;
    input.id = 1 + "-" + i;

    input.className = "estiloColunaCheck checkBox" + 1;
    input.addEventListener('change', function(e) {
        console.log($(this)[0].id);
    });

    celula.appendChild(input);
    linha.appendChild(celula);

    for (var j = 1; j < 5; j++) {
        celula = document.createElement("div");
        celula.className = "cell";
        celula.title = colunas[j];
        celula.textContent = valores[j];
        celula.setAttribute("data-title", colunas[j]);
        linha.appendChild(celula);
    }

    var celula = document.createElement("div");
    celula.className = "cell";
    celula.title = "Preço";
    celula.setAttribute("data-title", "Preço");
    var input = document.createElement("input");
    input.id = "preco-" + 1 + "-" + index;

    if (corLinha % 2 == 0) {
        linha.style = "background-color: #f6f6f6; color: #666666";
        input.style = "background-color: #f6f6f6; color: #666666";
        corLinha++;
    } else {
        linha.style = "background-color: #e9e9e9; color: #666666";
        input.style = "background-color: #e9e9e9; color: #666666";
        corLinha--;
    }
    input.placeholder = valores[5];
    //celula.value = matriz[5][i];
    input.placeholder.style = "color: #666666";
    input.className = "estiloInputValor";
    input.title = colunas[5];
    celula.append(input);
    linha.appendChild(celula);
    tabela.appendChild(linha);


}