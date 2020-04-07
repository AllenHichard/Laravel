<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Storage;
use DB;


class homeController extends Controller
{
    public function sendContact(Request $request){
        $email = filter_input( INPUT_GET, 'email', FILTER_VALIDATE_EMAIL );
        $nome = filter_input( INPUT_GET, 'nome', FILTER_SANITIZE_SPECIAL_CHARS );
        $mensagem = filter_input( INPUT_GET, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS );

        if( !$email || !$nome || !$mensagem  ){
          return response()->json(array(
            'status' => 'error',
            'email' => $email,
            'nome' => $nome,
            'mensagem' => $mensagem
          ));
        }

        Mail::send(
            'mail.contact',
            [
                'mensagem' => $mensagem,
                'nome' => $nome,
                'email' => $email
            ],
            function($m){
            $m->from('suporteba@portalagronegocio.com.br', 'portal');
            $m->subject('Resposta contato Portal Agronegocio');
            $m->to('suporteba@portalagronegocio.com.br');

        });

        return response()->json(array(
          'status' => 'success'
        ));
    }
}
