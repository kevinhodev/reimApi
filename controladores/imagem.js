const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'acc4045fdcff4469bf21b16c10dabf48'
});

const manipulatChamadaDaAPI = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.entrada)
        .then(dados => {
            res.json(dados);
        })
        .catch(erro => {
            res.status(400).json("Erro de API!");
        });
}


const manipularImagem = (bancoDeDados) => (req, res) =>{
    const { id } = req.body;
   
    bancoDeDados("usuarios")
        .where("id", "=", id)
        .increment("entradas", 1)
        .returning("entradas")
        .then(entradas => {
            res.json(entradas[0]);
        })
        .catch(erro => {
            res.status(400).json("Não foi possível obter as entradas!")
        });
}

module.exports = {
    manipularImagem,
    manipulatChamadaDaAPI
}