<template>
    <div class="form-relatorio">
        <!-- UNIDADE TERRITORIAL INPUT -->
        <div class="unidade-input">
            <h3> Unidade Territorial </h3>
            <select v-on:change="setUnidade" v-model="unidadeInput.control">
                <option> Município </option>
                <option> Território Identidade </option>
            </select>
            <vue-suggestion
                v-bind:placeholder="unidadeInput.placeholder"
                v-bind:minLen="unidadeInput.minLen"
                v-bind:items="unidadeInput.items"
                v-bind:disabled="unidadeInput.disabled"
                v-model="unidadeInput.item"
                v-bind:setLabel="setLabel"
                v-bind:itemTemplate="itemTemplate"
                @onInputChange="unidadeInputChange"
                @onItemSelected="unidadeItemSelected">
            </vue-suggestion>
        </div>
        <!-- TIPO DE PRODUÇÃO INPUT -->
        <div class="unidade-input">
            <h3> Produção </h3>
            <input type="checkbox" value="agricola" name="agricola" v-model="producaoInput.control"><label for="agricola"> Agricola </label>
            <input type="checkbox" value="pecuaria" name="pecuaria" v-model="producaoInput.control"><label for="pecuaria"> Pecuária </label>
            <input type="checkbox" value="silvicultura" name="silvicultura" v-model="producaoInput.control"><label for="silvicultura"> Silvicultura </label>
            <vue-suggestion
                v-bind:placeholder="producaoInput.placeholder"
                v-bind:minLen="producaoInput.minLen"
                v-bind:items="producaoInput.items"
                v-bind:disabled="producaoInput.disabled"
                v-model="producaoInput.item"
                v-bind:setLabel="setLabel"
                v-bind:itemTemplate="itemTemplate"
                @onInputChange="producaoInputChange"
                @onItemSelected="producaoItemSelected">
            </vue-suggestion>
        </div>
    </div>
</template>

<script>
import Suggestion from 'vue-suggestion'
import itemTemplate from './item-template.vue'

export default {
    name: 'demo',
    components: { 'vue-suggestion': Suggestion },
    data() {
        return {
            //Variáveis para input unidade territorial
            unidadeInput: {
                control: '',
                placeholder: 'Selecione a unidade territorial',
                disabled: true,
                minLen: 1,
                item: {},
                itemsSource: [],
                items: [],
            },
            //Variáveis para o input de tipo de produção
            producaoInput: {
                control: [],
                placeholder: 'Selecione os tipos de produção',
                disabled: true,
                minLen: 1,
                item: {},
                itemsSource: [],
                items: [],
            },
            //Variáveis compartilhadas
            itemTemplate,
        }
    },
    methods: {
        //Métodos compartilhados
        /**********************************************************
         * @method setLabel - Seleciona qual propriedade do item selecionado
         * vai ser passado para o Label/Value do input
         * @param {Object} item - Objeto com as informações do item selecionado
         * Definindo essa função dessa forma, qualquer lista passada para o
         * autocompletar deve possuir a propriedade name
        ***********************************************************/
        setLabel (item) {
          return item.name;
        },
        //Métodos para input Unidade Territorial
        /**********************************************************
         * Usado em v-on:onItemSelected
         * @method unidadeItemSelecter - Método chamado ao selecionar uma unidade
         * territorial no vue-suggestion
         * @param {Object} item - Objeto com as informações do item selecionado
        ***********************************************************/
        unidadeItemSelected (item) {
          this.unidadeInput.item = item;
        },
        /**********************************************************
         * @method unidadeInputChange - Acionado cada vez que é digitado no
         * input texto de unidade territorial no vue-suggestion
         * @param {Object} item - Objeto com as informações do item selecionado
        ***********************************************************/
        unidadeInputChange (text) {
            this.unidadeInput.items = this.unidadeInput.itemsSource.filter((item) => {
                return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
            });
        },
        /**********************************************************
         * Usado em v-on:change
         * @method setUnidade - Acionado sempre que é selecionado no form > select
         * um tipo de Unidade Territorial
         * @param {event} event - evento que acionou a função
        ***********************************************************/
        setUnidade(event){
            let selectedItem = event.target.value;
            this.unidadeInput.control = selectedItem;
            this.unidadeInput.placeholder = 'Busque ' + selectedItem;
            this.unidadeInput.disabled = false;
            //Get from AJAX the list
            if(selectedItem == 'Município'){
                this.unidadeInput.itemsSource = [{id: 1, name: 'a'}];
            }
            else if(selectedItem == 'Território Identidade'){
                this.unidadeInput.itemsSource = [];
            }
        },
    },
    watch: {
        /**********************************************************
         * Escuta a variável selecionada
         * @event producaoInput.control é alterado (watch)
        ***********************************************************/
        'producaoInput.control': function(){
            if( this.producaoInput.control.length != 0 ){
                this.producaoInput.placeholder = 'Busque Produtos';
                this.producaoInput.disabled = false;
            }
            else{
                this.producaoInput.placeholder = 'Selecione os tipos de produção';
                this.producaoInput.disabled = true;
            }
            //Change List with ajax
            this.producaoInput.itemsSource = [];
        }
    }
}
</script>

<style>

div.form-relatorio{
    position: absolute;
    width: 100%;
    top: 200px;
}

</style>
