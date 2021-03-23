const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');

const registrar = require('./controladores/registrar');
const entrar = require('./controladores/entrar');
const perfil = require('./controladores/perfil');
const imagem = require('./controladores/imagem');

const PORT = process.env.PORT;

const bancoDeDados = knex ({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send("Está funcionando!"); })
app.post('/entrar', entrar.manipularLogin(bancoDeDados, bcrypt));
app.post('/registrar', registrar.manipularRegistro(bancoDeDados, bcrypt));
app.get('/perfil/:id', perfil.manipularPerfil(bancoDeDados));
app.put('/imagem', imagem.manipularImagem(bancoDeDados));
app.post('/urlDaImagem', (req, res) => { imagem.manipulatChamadaDaAPI(req, res) });

app.listen(process.env.PORT || 3000, ()=> { console.log("Servidor Funcionando!"); })