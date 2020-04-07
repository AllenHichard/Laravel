<div style="
  padding: 100px;

">
<header style="
    font-size: 0.85em;
    line-height: 1.6em;
">
  <h3>Portal do Agronegócio </h3>
  <p> Alguém enviou uma mensage de contato no site {{env("APP_URL", "ba.portalagronegocio.com.br")}}! Responda essa mensagem para o email {{$email}} </p>
</header>

<section>

  <div style="
    background: #424c55;
    font-size: 0.85em;
    line-height: 1.6em;
    border-radius: 15px;
    width: 300px;
    height: auto;
    color: #fff;
    padding: 20px;
    position: relative;
    border-top-left-radius: 0px;
  ">
  <p> {{$nome}} </p>
  {{$mensagem}}
  </div>

    <div style="
    background: #9b5c62;
    font-size: 0.85em;
    line-height: 1.6em;
    border-radius: 15px;
    width: 300px;
    height: auto;
    color: #fff;
    padding: 20px;
    position: relative;
    border-top-right-radius: 0px;
    float: right;
  ">
      <p> Portal </p>
      <p style="color:#c68f8f;"> Digitando... </p>
  </div>

</section>
</div>
