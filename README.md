
# PORTAGRO
Sistema de Informações Agropecuárias do Estado da Bahia

## Versões
As versões estão separadas em branches

Versão no servidor => v1.1
Versão em desenvolvimento => v1.2

## Banco de dados

O banco de dados é postgres 12 com as extensões postGIS 3.0.0 instaladas
Links importantes:
* [Postgis](https://postgis.net/)
* [Postgres](https://www.postgresql.org/)
```bash
sudo -i -u postgres #forçadamente altera para o usuário postgres
psql #entra no postgres local com o usuário atual
psql -U -W -h -p #opções importantes para o comando psql (Ler docs)
```
comandos importantes dentro do postgres
```sql
\c #Conecta a um banco de dados
CREATE DATABASE nomeDoBanco #cria o banco de dados
```
Comandos importantes

## Instalação

Necessita de PHP versão 7.x com as extensões dompdf php-xml.
```bash
composer install #instala as dependencias do laravel
npm install #instala as dependencias do mix
php artisan key:generate #Gera chave do laravel
cp .env.example .env #cria o arquivo de configurações
```

## Rodando o site

```bash
# para teste local
php artisan serve

# para rodar no servidor
systemctl stop httpd.service #Para o serviço apache2
systemctl start portagro.service #Inicia o site
#php artisan serve --host=ba.portalagronegocio.com.br --port=80
```


## Troubleshooting

* **O site está dando erro ou a alteração que eu fiz não está funcionando**

Limpar as configurações cache e outras com os comandos. Necessário sempre que modificar o arquivo .env e realizar outras configurações no laravel

```bash
php artisan clear-compiled #apaga arquivos de cache
php artisan config:clear #apaga configurações
php artisan config:cache #cria nova configuração
```

* **Não consigo conectar ao banco postgres**

Tente mudar a senha do usuário postgres com os comandos
```bash
sudo passwd postgres #altera a senha do usuário no OS
sudo -i -u postgres #forçadamente altera para o usuário postgres
psql #entra no banco de dados
# A partir daqui você deve estar dentro do postgres
\password postgres #altera a senha do usuário dentro do banco
```

Caso esteja tentando acessar remotamente, deverá alterar os arquivs **pg_hba.conf** (host all all 0.0.0.0 md5) e **postgresql.conf** (listen_address='*').
