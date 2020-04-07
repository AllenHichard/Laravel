const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix
/** Vue **/
    .js('resources/js/relatorios.js', 'public/js/_relatorios_.js')
    /**  Style  **/
    .sass('resources/sass/home.scss', 'public/css')
    .sass('resources/sass/menu.scss', 'public/css')
    .sass('resources/sass/mapa.scss', 'public/css')
    .sass('resources/sass/relatorios.scss', 'public/css')
    /**  Script  **/
    .babel([ //Página de mapas
        'resources/js/dependencies/leaflet-timeline-slider.js',
        'resources/js/scripts/mapa.js',
        'resources/js/scripts/mapaAjax.js',
        'resources/js/scripts/mapaMetodos.js'
    ], 'public/js/_mapa_.js')
    .babel([ //Página Home
        'resources/js/scripts/home.js'
    ], 'public/js/_home_.js');