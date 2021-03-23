const manipularPerfil = (bancoDeDados) => (req, res) =>{
    const { id } = req.params;

    bancoDeDados.select("*").from("usuarios").where({id})
    .then(usuario => {
        if (usuario.length)
        {
            res.json(usuario[0]);
        }
        else
        {
            res.status(400).json("Erro ao obter o usuário!")
        }
    });
}

module.exports = {
    manipularPerfil
}