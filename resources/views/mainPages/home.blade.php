@extends('layouts.header')
@section('header')
<link href="{{ asset('css/menu.css') }}" rel="stylesheet">
<link href="{{ asset('css/home.css') }}" rel="stylesheet">
@stop
@section('content')
@include('components.menu')
<img src="{{ asset('assets/home_background2.png') }}" id="bg" alt="">
</div>


<section id="welcome">

    <div class="titulo">
        <h1> Sistema de Informações Agropecuárias do Estado da Bahia </h1>
        <p> Portal de soluções tecnológicas que objetiva integrar diversos bancos de dados de informações espaço temporais
            existentes, em uma única plataforma. Sistematizamos e consolidamos informações dispersas,
            de forma interativa por meio de mapas, gráficos e tabelas,
            contribuindo para organização da cadeia produtiva agropecuária, unindo produtores, investidores e todos os
            demais atores do agronegócio. </p>
        <p> <span> É a <a href="http://www.seagri.ba.gov.br/">SEAGRI</a> no campo ajudando o produtor </span> </p>

        <div class="btn-interage">
            <button type="button" name="saibaMais" onclick="scrollReadMore()"> Conheça mais </button>
            <button type="button" name="comeceAgora" onclick="location.href='/pecuariaEstado'"> Comece agora </button>
        </div>
    </div>

</section>

<section id="sobre">

    <h3 class="section-title" style="color:#dcdfe1"> Como funciona? </h3>
    <div class="icons row">
        <div class="icon satellite">
            <div class="rotated">
                <div class="back"></div>
                <div class="front"></div>
                <div class="antenna-base"></div>
                <div class="antenna-hold"></div>
                <div class="antenna-ball"></div>
            </div>
            <p> Coletamos dados de diversas fontes </p>
        </div>
        <div class="icon server">
            <div class="top"></div>
            <div class="middle"></div>
            <div class="bottom"></div>
            <div class="connect"></div>
            <p> Utilizamos inteligência artificial para processar essas informações </p>
        </div>
        <div class="icon product">
            <div class="document">
                <div class="chart">
                </div>
                <div class="ok"></div>
                <div class="map">
                    @include('components.mapMainPage')
                </div>
            </div>
            <p> Entregamos os dados tratados com fácil visualização </p>
        </div>
    </div>

</section>

<section id="quemSomos">

    <h3 class="section-title"> Quem Somos? </h3>

    @php

    class Pessoa{
    public $nome;
    public $descricao;
    public $fotoURL;

    function __construct($_nome,$_descricao,$_fotoURL) {
    $this->nome = $_nome;
    $this->descricao = $_descricao;
    $this->fotoURL = $_fotoURL;
    }
    }

    $users = array();
    $users[] = new Pessoa('Soanne','PPGM/UEFS',asset('assets/pessoas/11.jpg'));
    $users[] = new Pessoa('Sahada','SECTI',asset('assets/pessoas/13.jpg'));
    $users[] = new Pessoa('Adriano Bouzas','SEAGRI',asset('assets/pessoas/7.png'));
    $users[] = new Pessoa('Washington R.','SECTI',asset('assets/pessoas/14.jpg'));
    $users[] = new Pessoa('Marcílio','SEAGRI',asset('assets/pessoas/12.jpg'));
    $users[] = new Pessoa('Eduardo R.','SEAGRI',asset('assets/pessoas/6.jpg'));
    $users[] = new Pessoa('Lucas Costa','Secretário SEAGRI',asset('assets/pessoas/8.jpg'));
    $users[] = new Pessoa('Adélia Pinheiro','Secretária SECTI',asset('assets/pessoas/18.jpg'));
    $users[] = new Pessoa('Evandro N. Silva','Reitor UEFS',asset('assets/pessoas/10.jpg'));
    $users[] = new Pessoa('Hildebrando N.','PPGM/UEFS',asset('assets/pessoas/4.jpg'));
    $users[] = new Pessoa('Soltan Galano','PPGM/UEFS',asset('assets/pessoas/15.jpg'));
    $users[] = new Pessoa('Rodrigo V.','PPGM/UEFS',asset('assets/pessoas/17.png'));
    $users[] = new Pessoa('Diêgo Costa','PPGM/UEFS',asset('assets/pessoas/9.jpg'));
    $users[] = new Pessoa('Allen Hichard.','PPGM/UEFS',asset('assets/pessoas/1.jpg'));
    $users[] = new Pessoa('Tiago L.','PPGM/UEFS',asset('assets/pessoas/16.jpg'));
    $users[] = new Pessoa('Jocimara Lobão','PPGM/UEFS',asset('assets/pessoas/5.jpg'));
    $users[] = new Pessoa('Kátia Lima','SEAGRI',asset('assets/pessoas/3.png'));
    $users[] = new Pessoa('Luís A.','IBGE',asset('assets/pessoas/2.png'));
    @endphp



    <div class="container">
        <div class="row flex-center sm-no-flex">
            <div class="pull-right sm-no-float col-lg-8">
                <ul class="team-members">
                    @for ($i = 0; $i < 3; $i++)
                        <li class="clearfix">
                        @for ($j = 0; $j < 3; $j++)
                            <div class="member-details">
                                <div>
                                    <img src="{{ $users[($i)+($j*3)]->fotoURL }}" alt="UI Designer">
                                    <div class="member-info">
                                        <h3>{{ $users[($i)+($j*3)]->nome }}</h3>
                                        <p>{{ $users[($i)+($j*3)]->descricao }}</p>
                                    </div>
                                </div>
                            </div>
                        @endfor
                        </li>
                    @endfor
                </ul><!-- /end team-photos -->
            </div><!-- /end col-md-8 -->
            <div class="pull-left col-lg-4 sm-text-center">
                <div class="team-overview first">
                    <h2>Equipe de Supervisão, Idealização e Apoio Institucional</h2>
                    <p>
                        <div> O Governo do Estado da Bahia, por iniciativa da Secretaria da Agricultura, Pecuária, Irrigação, Pesca e Aquicultura - SEAGRI, em colaboração com a Secretaria de Ciência Tecnologia e Inovação - SECTI idealizou o Projeto Sistema
                            de Informações Agropecuárias do Estado da Bahia, elaborado e desenvolvido pela PPGM/UEFS. O projeto congrega uma equipe colaborativa que reúne Secretarias de Estado, Universidade e Empresa de Tecnologia.</div>
                    </p>
                </div>
            </div><!-- /end col-md-4 -->
        </div><!-- /end row -->
    </div><!-- /end container -->

    <div class="container">
        <div class="row flex-center sm-no-flex">
            <div class="pull-left col-lg-4 sm-text-center">
                <div class="team-overview second">
                    <h2>Equipe de Coordenação e Desenvolvimento</h2>
                    <p>
                        <div> O Programa de Pós-Graduação em Modelagem em Ciências da Terra e do Ambiente da UEFS desenvolve o Projeto em interação com o ecossistema local de inovação articulado pelo Núcleo de Inovação Tecnológica da UEFS. </div>
                    </p>
                </div>
            </div><!-- /end col-md-4 -->
            <div class="pull-right sm-no-float col-lg-8">
                <ul class="team-members second">
                    @for ($i = 0; $i < 3; $i++)
                        <li class="clearfix">
                        @for ($j = 3; $j < 6; $j++)
                            <div class="member-details">
                                <div>
                                    <img src="{{ $users[( ($i)+($j*3) )]->fotoURL }}" alt="UI Designer">
                                    <div class="member-info">
                                        <h3>{{ $users[( ($i)+($j*3) )]->nome }}</h3>
                                        <p>{{ $users[( ($i)+($j*3) )]->descricao }}</p>
                                    </div>
                                </div>
                            </div>
                        @endfor
                        </li>
                    @endfor
                </ul><!-- /end team-photos -->
            </div><!-- /end col-md-8 -->
        </div><!-- /end row -->
    </div><!-- /end container -->

</section>

<section id="contato">

    <div class="row">
        <div class="offset-lg-3 col-lg-6">
            <div class="row">
                <div class="sideContactForm col-lg-6">
                    <p class="title"> Entre em contato! </p>
                    <p> Gostaríamos de ouvir sua opinião </p>
                </div>
                <div class="contactForm col-lg-6">
                    <form id="contactForm" action="/contact" method="post" enctype="multipart/form-data">
                        <input type="text" name="nome" placeholder="Nome">
                        <input type="email" name="email" placeholder="Email">
                        <textarea rows="3" name="comentario" placeholder="Comentário"></textarea>
                    </form>
                </div> <!-- row -->
            </div> <!-- offset-lg-3 col-lg-6 -->
            <div class="row" style="margin-top: 33px;">
                <div class="col-md-12" style="text-align: center;">
                    <button onMouseOver="this.style.background='#00000050'" onMouseOut="this.style.background='#00000005'" onclick="enviarMensagemContato()"
                        style="transition:all 0.6s;border: none;color: white;font-size: 18px; font-weight: bold;background: #00000005;padding: 17px;box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.4);"> Enviar </button>
                </div>
            </div>
        </div> <!-- row -->
    </div>

</section>

<footer class="page-footer font-small pt-4">

    <div class="container-fluid text-center text-md-left">
        <div class="row">
            <div class="col-md-6 mt-md-0 mt-3 images">
                <img src="{{ asset('assets/geodatin.png') }}" height="115px" />
                <img src="{{ asset('assets/ppgm.jpg') }}" height="105px" />
                <img src="{{ asset('assets/uefs.png') }}" height="105px" />
                <img src="{{ asset('assets/sectilogo.png') }}" height="145px" />
                <img src="{{ asset('assets/AvatarSeagri.png') }}" height="205px" />
            </div>
            <hr class="clearfix w-100 d-md-none pb-3">
            <div class="col-md-3 mb-md-0 mb-3 links">
                <h5 class="text-uppercase">Serviços</h5>
                <ul class="list-unstyled">
                    <li>
                        <a href="/pecuariaEstado">Mapas</a>
                    </li>
                    <li>
                        <a href="/TerrIDPec">Território Identidade</a>
                    </li>
                    <li>
                        <a href="/export">Comércio Exterior</a>
                    </li>
                </ul>
            </div>
            <div class="col-md-3 mb-md-0 mb-3 links">
                <h5 class="text-uppercase">Desenvolvimento e apoio</h5>
                <ul class="list-unstyled">
                    <li>
                        <a href="http://www.geodatin.com/">Geodatin</a>
                    </li>
                    <li>
                        <a href="http://www.uefs.br/">UEFS</a>
                    </li>
                    <li>
                        <a href="http://ppgm.uefs.br/">PPGM</a>
                    </li>
                    <li>
                        <a href="http://www.seagri.ba.gov.br/">Seagri</a>
                    </li>
                    <li>
                        <a href="http://www.secti.ba.gov.br/">Secti</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright text-center py-3">
        <p>© 2019 Copyright:<a href="https://geodatin.com"> geodatin</a></p>
        <p> Usando: <a href="https://codepen.io/thenahidul/pen/WXKONJ">
                Agradáveis ​​membros da equipe em forma de diamante</a>, Uma ferramenta de Md Nahidul Islam </p>
    </div>

</footer>

<script type="text/javascript" src="{{ URL::asset('js/_home_.js') }}"></script>

@stop
