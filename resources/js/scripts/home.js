(function() {

    function getScroll() {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }

    document.querySelector('nav').classList.add('hide');
    window.addEventListener('scroll', function() {
        if (getScroll()[1] > 200) {
            document.querySelector('nav').classList.remove('hide');
        } else {
            document.querySelector('nav').classList.add('hide');
        }
    });

    document.scrollReadMore = function() {
        document.querySelector('#sobre').scrollIntoView({
            behavior: 'smooth'
        });
    }
})();

function enviarMensagemContato() {
    jQuery.ajax({
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="_token"]').attr('content')
        },
        type: 'GET',
        url: '/sendContact',
        data: {
            nome: document.querySelector('#contactForm input[name=nome]').value,
            email: document.querySelector('#contactForm input[name=email]').value,
            mensagem: document.querySelector('#contactForm textarea').value,
        },
        success: function(data) {
            if (data.status == 'error') {
                if (data.email == false) {
                    console.error('Email Invalido');
                    alert('Email invalido');
                } else {
                    console.error('Erro no ajax para contato');
                    console.log(data);
                    alert('Erro no envio do contato');
                }
            } else {
                alert('Contato enviado com sucesso');
            }
        },
        error: function(data) {
            console.error('Erro no ajax para contato');
            alert('Erro no envio do contato');
        }
    });
}
