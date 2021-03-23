const manipularRegistro = (bancoDeDados, bcrypt) => (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = bcrypt.hashSync(senha);

    if (!email || !nome || !senha)
    {
       return res.status(400).json("Preencha os campos corretamente!");
    }

    bancoDeDados.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into("login")
            .returning("email")
            .then(emailDeLogin => {
                return trx("usuarios")
                .returning("*")
                .insert({
                    email: emailDeLogin[0],
                    nome: nome,
                    entrou: new Date()
                })
                .then(usuário => {
                    res.json(usuário[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(erro => {
        res.status(400).json("Erro!");
    });
}

module.exports = {
    manipularRegistro: manipularRegistro
}