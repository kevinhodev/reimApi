const manipularLogin = (bancoDeDados, bcrypt) => (req, res) =>{
    const { email, senha } = req.body;

    if (!email || !senha)
    {
       return res.status(400).json("Preencha os campos corretamente!");
    }

    bancoDeDados.select("email", "hash").from("login")
        .where("email", "=", email)
        .then(dados => {
            const eValido = bcrypt.compareSync(senha, dados[0].hash);
            if (eValido)
            {
                return bancoDeDados.select("*").from("usuarios")
                        .where("email", "=", email)
                        .then(usuario => {
                            res.json(usuario[0])
                        })
                        .catch(erro => {
                            res.status(400).json("Não foi posssível entrar!");
                        });
            }
            else
            {
                res.status(400).json("Informações incorretas!");
            }
        })
        .catch(erro => {
            res.status(400).json("Informações incorretas!");
        });
}

module.exports = {
    manipularLogin
}