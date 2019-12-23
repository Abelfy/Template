const fs = require('fs');
const jwt = require('jsonwebtoken');


module.exports = function(app, model) {

    let service = require(`${__dirname}/../services/srvAuthent`);

    var privateKEY = fs.readFileSync(__dirname + '/../keys/private.key', 'utf8');

    //---- Appel d'authentification et création du JWT ----//
    app.post("/ws/authentification", function(req, res) {
        var signOptions = {
            issuer: 'IdCare',
            subject: 'contact@info80.fr',
            audience: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            expiresIn: '30m',
            algorithm: "RS256"
        };
        service.authentification(model, req.body).then(function(response) {
            res.status(200).send({
                "userId": response.payload.id,
                "token": jwt.sign(response.payload, privateKEY, signOptions),
                "expiresIn": '30m',
            });
        }).catch(function(error) {
            console.log(error);
            res.status(error).end()
        })
    });

    //---- Appel de vérification du JWT ----//
    app.post("/ws/verify", function(req, res) {
        var verifyOptions = {
            issuer: 'IdCare',
            subject: 'contact@info80.fr',
            audience: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            expiresIn: '30m',
            algorithm: "RS256"
        };

        service.verify(req.headers.authorization, verifyOptions)
            .then(result => {
                res.status(200).send(result)
            })
            .catch(function(err) {
                res.status(401).send(err)
            });
    })
}