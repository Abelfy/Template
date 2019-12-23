module.exports = model => {
    return {
        "gets": () => {
            return model.user.findAll({
                include: [{ model: model.medecin }, { model: model.liberal }, { model: model.coordinateur }, { model: model.aidant }]
            });
        },
        "get": id => { return model.user.findOne({ attributes: { exclude: ['pwd'] }, where: { id: id } }) },
        "addUser": (user) => model.user.create(user),


        "addService": (service) => model.service_de_soin.create(service), //Peut etre à déplacer

        "getUtilisateurByMail": (email) => model.user.findOne({
            where: {
                login: email
            }
        }),
        "edit": (id, data) => {
            return model.user.findByPk(id).then(function(user) {
                return user.update(data);
            })
        }
    }
}