<nav class="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
    <b class="navbar-lowBrand"> <img src="{{ asset('assets/gov_bahia.png') }}" height="49px" /></b>
    <a class="navbar-brand" href="/" id="logoHome2"><i class="fa fa-fw fa-seedling"></i> PORTAL AGRONEGÓCIO </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="nav navbar-nav ml-auto">
            <!-- Filtros -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdownFiltros" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-globe"></i> MAPAS
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownFiltros">
                    <a class="dropdown-item clickable" href="/pecuariaEstado">Municípios</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item clickable" href="/TerrIDPec">Território Identidade</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item clickable" href="/export">Comércio Exterior</a>
                </div>
            </li>
            <!-- Portal -->
            <li class="nav-item dropdown">
                <!--<a class="nav-link dropdown-toggle" id="navbarDropdownPortal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-coins"></i> INVESTIDOR
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownPortal">
                    <a class="dropdown-item clickable" href="relatorios">Relatórios</a>
                    <a class="dropdown-item clickable" href="#">Exportações</a>
                    <a class="dropdown-item clickable" href="#">Canal do Investidor</a>
                    <a class="dropdown-item clickable" href="gallery">Galeria de Imagens</a>
                    <a class="dropdown-item clickable" href="cadastroCotacao">Cadastro Cotação</a>
                </div>
            -->
            </li>
        </ul>
    </div>
</nav>
