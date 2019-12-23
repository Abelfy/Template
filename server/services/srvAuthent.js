let bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const myWinstonOptions = {
    transports: [new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
}
if (process.env.NODE_ENV !== 'production') {
    myWinstonOptions.transports[2] = new winston.transports.Console({ format: winston.format.simple(), level: 'info' })
}
const publicKEY = fs.readFileSync(__dirname + '/../keys/public.key', 'utf8');

const logger = new winston.createLogger(myWinstonOptions);
module.exports = {
    "authentification": (model, identifiants) => new Promise(function(resolve, reject) {
        if (!identifiants.email || !identifiants.password) {
            logger.log('debug', 'Pas d\'identifiants reçu');
            reject(401)
        } else {
            password = identifiants.password;
            potentialUser = { where: { login: identifiants.email } };
            logger.log('debug', 'Recherche du potientel utilisateur');

            model.user.findOne(potentialUser).then(function(user) {
                if (!user) {
                    reject(401)
                } else {
                    logger.log('debug', 'Utilisateur trouvé');
                    if (bcrypt.compareSync(password, user.pwd)) {
                        logger.log('debug', 'Le mot de passe est comparé et correspond !');
                        resolve({
                            success: true,
                            payload: {
                                id: user.id,
                                email: user.login,
                                type: user.type
                            },
                            forceChangePwd: user.forceChangePwd
                        })
                    } else {
                        logger.log('info', 'Mauvais mot de passe');
                        reject(401);
                    }
                }
            }).catch(function(error) {
                logger.log('error', error);
                reject(error)
            });
        }
    }),
    "verify": (token, $Options) => new Promise(function(resolve, reject) {
        var verifyOptions = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            expiresIn: "30d",
            algorithm: ["RS256"]
        };

        try {
            resolve(jwt.verify(token, publicKEY, verifyOptions));
        } catch (err) {
            reject(err);
        }
    })
};