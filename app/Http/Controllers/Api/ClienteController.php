<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\estado;
use App\municipio;
use App\subdivisao;

class ClienteController extends Controller
{
    //
    public function estados(){
        return estado::all();
    }

    public function municipios(){
        return municipio::all();
    }

    public function subdivisoes(){
        return subdivisao::all();
    }
}
