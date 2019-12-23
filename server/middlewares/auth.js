module.exports = (logger) => (req, res, next) => {
    let AuthSrv = require(`${__dirname}/../services/srvAuthent`);
    let verifyOptions = {
        issuer: 'IdCare',
        subject: 'contact@info80.fr',
        audience: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        expiresIn: '30m',
        algorithm: "RS256"
    };

    try {
        if (req.headers.authorization) {      
        AuthSrv.verify(req.headers.authorization.split(' ')[1], verifyOptions)
            .then(result => { 
                next();
            })
            .catch(function (err) {
                logger.error(err);
                res.status(401).send(err).end();
            });
        } else {
        if (req.method == "POST" && (req.url == "/ws/authentification")) {
            logger.info('Chaining to Authentification');
            next();
        } else {
            logger.warn('Accès refusé !');
            res.status(401).end();
        }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
};