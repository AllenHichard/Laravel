
<!-- _____________________________________________________________________ -->
<!-- _______________ SELEÇÃO DA VARIÀVEL DE CONTROLE _____________________ -->
<!-- _____________________________________________________________________ -->
<p> Nova Pesquisa </p>
<div class="filtro-card">
    @if ($page == 'estado' || $page == 'terrID')
        <a class="dropdown-item clickable" id="pecuaria" href="{{ $typeSelectLink[0] }}">Pecuária</a>
        <a class="dropdown-item clickable" id="agricola" href="{{ $typeSelectLink[1] }}">Agricultura</a>
        <a class="dropdown-item clickable" id="silvicultura" href="{{ $typeSelectLink[2] }}">Silvicultura</a>
    @elseif ($page == 'exterior')
        <a class="dropdown-item clickable" id="export" href="{{ $typeSelectLink[0] }}">Exportações</a></button>
        <a class="dropdown-item clickable" id="import" href="{{ $typeSelectLink[1] }}">Importações</a></button>
    @endif
</div>

<!-- _____________________________________________________________________ -->
<!-- _______________ SELEÇÃO DO PRODUTO E VARIÁVEL _______________________ -->
<!-- _____________________________________________________________________ -->
@if ($page == 'estado' || $page == 'terrID')
<div class="select">
    <select id="nomeProduto" onchange="getVariables(this)" class="form-control">
        <option value=""> Selecionar Produto </option>
        @foreach ($tipoProdutos as $item)
            <option value="{{ $item->id }}">{{ $item->nome_produto }}</option>
        @endforeach
    </select>
</div>
<div class="select">
    <select id="nomeVariavel" name="Produtos" class="form-control" onchange="update()">
        <option value=""> Selecionar Variavél </option>
    </select>
</div>
@elseif ($page == 'exterior')
<div class="select"><select id="secrom" onchange="verifySH2()" name="Produtos" class="form-control">
        <option value="">--- Código Setor ---</option>
        @foreach ($secrom as $sec)
            @if( $sec->co_ncm_secrom != "XIX" && $sec->co_ncm_secrom != "XII" && $sec->co_ncm_secrom != "XVIII" && $sec->co_ncm_secrom != "XVI" &&
                $sec->co_ncm_secrom != "XVII" && $sec->co_ncm_secrom != "XX" && $sec->co_ncm_secrom != "XV" && $sec->co_ncm_secrom != "XXI" && $sec->co_ncm_secrom != "XIII" &&
                $sec->co_ncm_secrom != "XIV" && $sec->co_ncm_secrom != "VII" && $sec->co_ncm_secrom != "VI" && $sec->co_ncm_secrom != "V" && $sec->co_ncm_secrom != "XXII")
                <option value="{{ $sec->co_ncm_secrom }}">{{ $sec->no_sec_por }}</option>
            @endif
        @endforeach
    </select>
</div>
<div class="select">
    <select id="sh2" onchange="verifySH4()" name="Produtos" class="form-control">
        <option value="">--- Código SH2 ---</option>
    </select></div>
<div class="select">
    <select id="sh4" onchange="verifySH6()" name="Produtos" class="form-control">
        <option value="0">--- Código SH4 ---</option>
    </select></div>
<div class="select">
    <select id="sh6" onchange="verifyproduct()" name="Produtos" class="form-control">
        <option value="0">--- Código SH6 ---</option>
    </select></div>
<div class="select">
    <select id="nameProducts" name="Produtos" class="form-control">
        <option value="0">--- Código NCM ---</option>
    </select></div>
<div class="select">
    <select id="nomeVariavel" name="Produtos" class="form-control" onchange="update()">
        <option value="">--- Variavél ---</option>
        <option value="kg_liquido">Quilograma</option>
        <option value="vl_fob">Valor</option>
    </select></div>
@endif

<!-- _____________________________________________________________________ -->
<!-- _______________ SELEÇÃO DA UNIDADE TERRITORIAL ______________________ -->
<!-- _____________________________________________________________________ -->
<hr>
<p> Unidade Territorial </p>
@if ($page == 'estado' || $page == 'terrID')
    <div class="section-menu-card">
        <button class="dropdown-item clickable" id="municipio" onclick="changeUnidadeTerritorial('municipio', unidTerrLayerGroup)">Municípios</button>
        <button class="dropdown-item clickable" id="terrID" onclick="changeUnidadeTerritorial('terrID', unidTerrLayerGroup);">Território Identidade</button>
        <button class="dropdown-item clickable" id="exterior" onclick="window.location.href = '/mapa/exterior'">Comércio Exterior</button>
    </div>
@elseif ($page == 'exterior')
    <div class="section-menu-card">
        <button class="dropdown-item clickable" id="municipio" onclick="window.location.href = '/mapa/estado?undTerr=municipio';">Municípios</button>
        <button class="dropdown-item clickable" id="terrID" onclick="window.location.href = '/mapa/estado?undTerr=terrID'">Território Identidade</button>
        <button class="dropdown-item clickable" id="exterior" onclick="window.location.href = '/mapa/exterior'">Comércio Exterior</button>
    </div>
@endif
<hr>
