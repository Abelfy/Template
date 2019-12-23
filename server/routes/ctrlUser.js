var QRCode = require('qrcode')

module.exports = function(app, model) {

    let service = require(`${__dirname}/../services/srvUser`)(model);

    app.get('/ws/user', (req, res) => service.gets().then(users => res.status(200).json(users)));

    app.get('/ws/user/:id', (req, res) => service.get(req.params.id).then(user => res.status(200).json(user)).catch(err => console.error(err)));

    app.get('/ws/user/findByMail/:mail', (req, res) => service.getUtilisateurByMail(req.params.mail).then(user => res.status(200).json(user)));


    app.get('/ws/user/adresse', (req, res) => service.getAdresse(req.body.user.id).then(adresse => res.status(200).json(adresse)));



    app.post('/ws/user', (req, res) => {

        service.getUtilisateurByMail(req.body.user.login).then(resultatRechercheParMail => {
            var boolPresenceUtilisateur

            if (resultatRechercheParMail) {
                boolPresenceUtilisateur = true;
            } else {
                boolPresenceUtilisateur = false;
            }


            switch (req.body.user.type) {

                case "coordinateur":

                    if (boolPresenceUtilisateur) {
                        if (resultatRechercheParMail.coordinateurId) {
                            //pas de création
                            console.log("pas de création");
                            res.status(200).end();
                        } else {
                            //création compte coordinateur avec update champs table utilisateur
                            serviceCoordinateur.addCoordinateur(req.body.information).then(coordinateurCreated => {

                                service.edit(resultatRechercheParMail.id, { type: resultatRechercheParMail.type + ",coordinateur", coordinateurId: coordinateurCreated.id }).then(user => {
                                    //mail(req.body);
                                    res.status(200).json(user);
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            })
                        }
                    } else {
                        // création complète
                        serviceCoordinateur.addCoordinateur(req.body.information).then(coordinateurCreated => {
                            req.body.user.coordinateurId = coordinateurCreated.id;
                            service.addUser(req.body.user).then(user => {
                                mail(req.body);
                                res.status(200).json(user);
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                    }
                    break;

                case "patient":
                    if (boolPresenceUtilisateur) {
                        if (resultatRechercheParMail.patientId) {
                            //pas de création
                            console.log("pas de création");
                            res.status(200).end();
                        } else {
                            //Création du patient avec update de l'utilisateur
                            QRCode.toDataURL(req.body.user.login, function(err, url) {

                                req.body.information.qrCode = url;
                                servicePatient.add(req.body.information).then(patientCreated => {
                                    if (req.body.coordination == true) {
                                        var data = { dateDebut: req.body.priseEnCharge, patientId: patientCreated.id, coordinateurId: req.body.coordinateurId };
                                        servicePriseEnCharge.addPriseEnCharge(data)
                                    }
                                    req.body.adresse.commentaireAdresse = "Premiere adresse";
                                    req.body.adresse.userId = resultatRechercheParMail.id;
                                    service.addAdresse(req.body.adresse).then(result => {
                                        service.edit(resultatRechercheParMail.id, { type: resultatRechercheParMail.type + ",patient", patientId: patientCreated.id }).then(user => {
                                            //mail(req.body);
                                            res.status(200).json(user);
                                        }).catch(err => {
                                            console.log(err);
                                            res.status(500).send(err);
                                        });
                                    }).catch(err => {
                                        console.log(err);
                                        res.status(500).send(err);
                                    });
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            })

                        }
                    } else {
                        // création complète
                        QRCode.toDataURL(req.body.user.login, function(err, url) {
                            req.body.information.qrCode = url;
                            servicePatient.add(req.body.information).then(patientCreated => {
                                req.body.user.patientId = patientCreated.id;
                                service.addUser(req.body.user).then(user => {
                                    if (req.body.coordination == true) {
                                        var data = { date: req.body.priseEnCharge, patientId: patientCreated.id, coordinateurId: req.body.coordinateurId };
                                        servicePriseEnCharge.addPriseEnCharge(data);
                                    }
                                    req.body.adresse.commentaireAdresse = "Premiere adresse";
                                    req.body.adresse.userId = user.id;
                                    service.addAdresse(req.body.adresse);
                                    mail(req.body);
                                    res.status(200).json(user);
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        })
                    }
                    break;

                case "aidant":

                    if (boolPresenceUtilisateur) {
                        if (resultatRechercheParMail.aidantId) {
                            //pas de création
                            console.log("pas de création");
                            res.status(200).end();
                        } else {

                            //création compte coordinateur avec update champs table utilisateur
                            servicePatient.addAidant(req.body.information).then(aidantCreated => {

                                service.edit(resultatRechercheParMail.id, { type: resultatRechercheParMail.type + ",aidant", aidantId: aidantCreated.id }).then(user => {
                                    //mail(req.body);
                                    res.status(200).json(user);
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            })
                        }
                    } else {
                        // création complète

                        servicePatient.addAidant(req.body.information).then(aidantCreated => {
                            req.body.user.aidantId = aidantCreated.id;
                            service.addUser(req.body.user).then(user => {
                                mail(req.body);
                                res.status(200).json(user);
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                    }
                    break;

                case "medecin":
                    if (boolPresenceUtilisateur) {
                        if (resultatRechercheParMail.aidantId) {
                            //pas de création
                            console.log("pas de création");
                            res.status(200).end();
                        } else {
                            //création compte coordinateur avec update champs table utilisateur
                            serviceMedecin.addMedecin(req.body.information).then(medecinCreated => {

                                service.edit(resultatRechercheParMail.id, { type: resultatRechercheParMail.type + ",medecin", medecinId: medecinCreated.id }).then(user => {
                                    //mail(req.body);
                                    res.status(200).json(user);
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            })
                        }
                    } else {
                        // création complète
                        servicePatient.addMedecin(req.body.information).then(medecinCreated => {
                            req.body.user.medecinId = medecinCreated.id;
                            service.addUser(req.body.user).then(user => {
                                mail(req.body);
                                res.status(200).json(user);
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                    }
                    break;

                case "service":
                    break;

                case "liberal":
                    if (boolPresenceUtilisateur) {
                        if (resultatRechercheParMail.liberalId) {
                            //pas de création
                            console.log("pas de création");
                            res.status(200).end();
                        } else {
                            //création compte coordinateur avec update champs table utilisateur
                            serviceLiberal.addLiberal(req.body.information).then(liberalCreated => {

                                service.edit(resultatRechercheParMail.id, { type: resultatRechercheParMail.type + ",liberal", liberalId: liberalCreated.id }).then(user => {
                                    //mail(req.body);
                                    res.status(200).json(user);
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            })
                        }
                    } else {
                        // création complète
                        serviceLiberal.addLiberal(req.body.information).then(liberalCreated => {
                            req.body.user.liberalId = liberalCreated.id;
                            service.addUser(req.body.user).then(user => {
                                mail(req.body);
                                res.status(200).json(user);
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                    }
                    break;

                default:
                    console.log("err");
                    break;
            };
        });


    });


    /*
  app.post('/ws/user', (req, res) => service.addUser(req.body.user).then(users => {

  req.body.information.userId=users.id;

  switch(req.body.user.type) {
  case "patient":
  QRCode.toDataURL(req.body.information.email, function (err, url) {

  req.body.information.qrCode = url;
  servicePatient.add(req.body.information).then(patientCreated => {
  console.log(req.body);

  if (req.body.coordination==true) {
  var data = { date: req.body.priseEnCharge, patientId: patientCreated.id, coordinateurId: req.body.coordinateurId};
  servicePriseEnCharge.addPriseEnCharge(data);
}

mail(req.body);
res.status(200).end();
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
})
break;
case "aidant":

servicePatient.addAidant(req.body.information).then(aidantCreated => {

servicePatient.get(req.body.patientId).then(patientARattacher => {

patientARattacher.addAidant(aidantCreated, { through:{lienParente: req.body.information.lienParente}})
mail(req.body);
// TODO: creation d'aidant sans patientID
res.status(200).end();
}).catch(err => {
console.log(err);

})
}).catch(err => {
console.log(err);

if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
break;
case "coordinateur":
serviceCoordinateur.addCoordinateur(req.body.information).then(coordinateurCreated =>{
mail(req.body);
res.status(200).end();
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
break;
case "medecin":
serviceMedecin.searchByRPPS(req.body.information.rpps).then(result => {
console.log(result.length);
if(result.length != 0){
console.log("Est pas vide !");
serviceMedecin.updateMedecin(result[0].dataValues.id, {userId: req.body.information.userId}).then(medecinUpdated => {
res.status(200).send(medecinUpdated);
}).catch(err =>{
res.status(500).send(err);
})
}
else{
serviceMedecin.addMedecin(req.body.information).then(medecinCreated =>{
mail(req.body);
res.status(200).end();
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
}
})
break;
case "service":
service.addService(req.body.information).then(serviceCreated =>{
mail(req.body);
res.status(200).end();
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
break;
case "liberal":
serviceLiberal.addLiberal(req.body.information).then(liberalCreated =>{
mail(req.body);
res.status(200).end();
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
})
break;
default:
mail(req.body);
res.status(200).end();
break;
}
}).catch(err => {
console.log(err);
if (err.name == 'SequelizeUniqueConstraintError') res.send('pb login unique');
else res.status(500).send(err);
}));*/




    app.put('/ws/user/liberal', (req, res) => serviceLiberal.updateLiberal(req.body.information.id, req.body.information).then(liberal => {
        res.status(200).json(liberal);
    }));

    app.put('/ws/user/medecin', (req, res) => serviceMedecin.updateMedecin(req.body.information.id, req.body.information).then(medecin => {
        res.status(200).json(medecin);
    }));

    app.put('/ws/user/coordinateur', (req, res) => serviceCoordinateur.updateCoordinateur(req.body.information.id, req.body.information).then(coordinateur => {
        res.status(200).json(coordinateur);
    }));

    app.put('/ws/user/service', (req, res) => service.updateService(req.body.information.id, req.body.information).then(service => {
        res.status(200).json(service);
    }));

    app.put('/ws/user/aidant', (req, res) => service.updateAidant(req.body.information.id, req.body.information).then(aidant => {
        res.status(200).json(aidant);
    }));

    app.put('/ws/user', (req, res) => service.edit(req.body.user.id, req.body.user).then(users => {
        switch (users.dataValues.type) {
            case "aidant":
                if (req.body.mdpOublie == true) {
                    service.getAidantInfo(req.body.user.id).then(aidant => {
                        req.body.information = aidant;
                        mail(req.body);
                        res.status(200).json(aidant)
                    });
                } else {
                    console.log(req.body);
                    servicePatient.updateAidant(req.body.information.id, req.body.information).then(aidantUpdated => {
                        res.status(200).json(aidantUpdated);
                    });
                }
            case "coordinateur":
                if (req.body.mdpOublie == true) {
                    service.getCoordinateurInfo(req.body.user.id).then(coordinateur => {
                        req.body.information = coordinateur;
                        mail(req.body);
                        res.status(200).json(coordinateur)
                    });
                } else {
                    serviceCoordinateur.updateCoordinateur(req.body.information.id, req.body.information).then(coordinateurUpdated => {
                        res.status(200).json(coordinateurUpdated);
                    })
                }
                break;
            case "medecin":
                if (req.body.mdpOublie == true) {
                    service.getMedecinInfo(req.body.user.id).then(medecin => {
                        req.body.information = medecin;
                        mail(req.body);
                        res.status(200).json(medecin)
                    });
                } else {
                    serviceMedecin.updateMedecin(req.body.information.id, req.body.information).then(medecinUpdated => {
                        res.status(200).json(medecinUpdated);
                    });
                }
                break;
            case "service":
                if (req.body.mdpOublie == true) {
                    service.getServiceInfo(req.body.user.id).then(service => {
                        req.body.information = service;
                        mail(req.body);
                        res.status(200).json(service)
                    });
                } else {
                    service.updateService(req.body.information.id, req.body.information).then(serviceUpdated => {
                        res.status(200).json(serviceUpdated);
                    });
                }
                break;
            case "liberal":
                if (req.body.mdpOublie == true) {
                    service.getLiberalInfo(req.body.user.id).then(liberal => {
                        req.body.information = liberal
                        mail(req.body);
                        res.status(200).json(liberal)
                    });
                } else {
                    serviceLiberal.updateLiberal(req.body.information.id, req.body.information).then(liberalUpdated => {
                        res.status(200).json(liberalUpdated);
                    })
                }
                break;
            case "patient":
                if (req.body.mdpOublie == true) {
                    service.getPatientInfo(req.body.user.id).then(patient => {
                        req.body.information = patient;
                        mail(req.body);
                        res.status(200).json(patient)
                    });
                } else {
                    service.getPatientInfo(users.dataValues.id).then(patient => {
                        console.log(patient);
                        //users.patient = patient.dataValues;
                        res.status(200).json(patient);
                    });

                }
                break;
            default:
                res.status(200).json(users);
                break;
        }
    }));

    app.put('/ws/user/premiereConnexion', (req, res) => service.edit(req.body.user.id, req.body.user).then(user => {
        res.status(200).json(user);
    }));

    app.put('/ws/user/edit', (req, res) => service.edit(req.body.user.id, req.body.user).then(user => {
        res.status(200).json(user);
    }));

    app.put('/ws/user/premiereAdresse/edit', (req, res) => service.editPremiereAdresse(req.body.user.adresses[0].id, req.body.user.adresses[0]).then(adresse => {
        res.status(200).json(adresse);
    }));


    function mail(user) {
        if (user.mdpOublie == true) {
            var title = 'Mot de passe oublié';
        } else {
            var title = 'Inscription à id-care';
        }
        var userMail = user.user.login;
        //var userMail = 'olivier@info80.fr';
        var mailBody = creationMailBody(user);
        serviceMail.mailInscription(mailBody, userMail, title);
    }


    function creationMailBody(user) {
        var genre = ''
        switch (user.user.genre) {
            case 'M':
                genre = 'M.'
                break;
            case 'F':
                genre: 'Mme'
                break;
            case undefined:
            case 'N':
                genre: ''
                break;
        }
        mailBody = "Bonjour " + genre + " " + user.user.nom + " " + user.user.prenom + ",<br><br>";
        if (user.mdpOublie == true) {
            mailBody += "Voici votre nouveau mot de passe.";
        } else {
            mailBody += "Votre compte sur le site id-care a bien été créé.<br>Adresse du site : https://medical.id-care.fr";
        }
        mailBody += "<br/><br/>Rappel de vos identifiants :";
        mailBody += "<br/>Votre identifiant : " + user.user.login;
        mailBody += "<br/>Votre mot de passe : " + user.user.pwd;
        return mailBody;
    }
};