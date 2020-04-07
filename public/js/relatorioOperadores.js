function criarOperadores(criar, id, divID) {
    if (criar) {
        var operadores = document.getElementById(id);
        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");
        var texto_legend = document.createTextNode("Selecione o Operador");
        legend.appendChild(texto_legend);
        var p = document.createElement("p");
        p.className = "container";
        var opcoes = ["Menor que", "Maior que", "Igual a", "Diferente de"];
        var aux = ["<", ">", "=", "!="];
        for (var i = 0; i < opcoes.length; i++) {
            var label = document.createElement("label");
            label.for = opcoes[i];
            label.style = "margin-right: 20px";
            var input = document.createElement("input");
            input.type = "radio";
            input.value = "accessible";
            input.name = "qualityOperador";
            input.className = "radioOperador";
            input.id = aux[i];
            var span = document.createElement("span");
            var texto_span = document.createTextNode(opcoes[i]);
            span.appendChild(texto_span);
            label.appendChild(input);
            label.appendChild(span);
            p.appendChild(label);
            fieldset.appendChild(p);
        }

        fieldset.appendChild(legend);
        operadores.appendChild(fieldset);



        operadores = document.getElementById(divID);
        var input = document.createElement("input");
        input.id = "inputValorOperador";
        input.type = "number";
        input.name = "inputValorOperador";
        input.placeholder = "Insira um Valor";
        operadores.appendChild(input);

        /*operadores = document.getElementById(botaoID);
        var botao = document.createElement("button");
        botao.id = "submitOperador";
        botao.className = "btn btn-outline-secondary";
        botao.style = "background-color: #8daa9d; color: white; border-radius: 8px 8px 8px 8px;"
        botao.type = "button";
        botao.textContent = "Filtrar";
        operadores.appendChild(botao);
        */




    } else {
        document.getElementById(id).innerHTML = "";
        document.getElementById(divID).innerHTML = "";
        //document.getElementById(botaoID).innerHTML = "";
        operadores = false;
        valor = -1;
        operacao = ">";
    }
}