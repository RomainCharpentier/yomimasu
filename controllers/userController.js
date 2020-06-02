const User = require('../schema/userSchema.js');
const passwordHash = require('password-hash');

module.exports = function (app) {

    app.post('/signup', function(req, res) {
        if (!req.body.email || !req.body.password) {
            // Le cas où l'email ou bien le password ne serait pas soumis ou nul
            res.status(400).json({
                text: "Requête invalide"
            });
        } else {
            // Utilisateur avec mot de passe haché
            var user = {
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                avatar: req.body.avatar
            };
    
            // On cherche si l'email existe déjà
            var findUser = new Promise(function (resolve, reject) {
                User.findOne({
                    email: user.email
                }, (err, result) => {
                    if (err) {
                        reject(500);
                    } else {
                        if (result) {
                            reject(204);
                        } else {
                            resolve(true);
                        }
                    }
                })
            });
    
            // Inscription
            findUser.then(function () {
                var _u = new User(user);
                _u.save((err, user) => {
                    if (err) {
                        res.status(500).json({
                            text: "Erreur interne"
                        });
                    } else {
                        res.status(200).json({
                            text: "Succès",
                            token: user.getToken()
                        });
                    }
                });
            }, (error) => {
                switch (error) {
                    case 500:
                        res.status(500).json({
                            text: "Erreur interne"
                        });
                        break;
                    case 204:
                        res.status(204).json({
                            text: "L'adresse email existe déjà"
                        });
                        break;
                    default:
                        res.status(500).json({
                            text: "Erreur interne"
                        });
                }
            });
        }
    });
    
    app.post('/signin', function(req, res) {
        if (!req.body.email || !req.body.password) {
            // Le cas où l'email ou bien le password ne serait pas soumit ou nul
            res.status(400).json({
                text: "Requête invalide"
            })
        } else {
            User.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err) {
                    res.status(500).json({
                        text: "Erreur interne"
                    });
                } else if(!user) {
                    res.status(401).json({
                        text: "L'utilisateur n'existe pas"
                    });
                } else {
                    // Appel de la méthode authenticate de userSchema
                    if (user.authenticate(req.body.password)) {
                        res.status(200).json({
                            token: user.getToken(),
                            text: "Authentification réussie"
                        });
                    } else{
                        res.status(401).json({
                            text: "Mot de passe incorrect"
                        });
                    }
                }
            })
        }
    });

    app.post('/getUser', function(req, res) {
        var user = User.getUser(req.body.token);
        if (user) {
            res.status(200).json({
                user: user,
                text: "Succès"
            });
        } else {
            res.status(500).json({
                text: "Erreur interne"
            });
        }
    });

    app.post('/updateUser', function(req, res) {
        const width = req.body.avatar_width;
        const height = req.body.avatar_height;
        if (width > 0 && width <= 300 && height > 0 && height <= 300) {
            User.findOneAndUpdate({"email": req.body.user.email}, req.body.user, {new: true}, (err, user) => {
                if (err) {
                    res.status(500).json({
                        message: {
                            type: "danger",
                            message: "Erreur interne"
                        }
                    });
                } else if(!user) {
                    res.status(401).json({
                        message: {
                            type: "danger",
                            message: "L'utilisateur n'existe pas"
                        }
                    });
                } else {
                    res.status(200).json({
                        user: user,
                        token: user.getToken(),
                        message: {
                            type: "success",
                            message: "Modification réussie"
                        }
                    });
                }
            });
        } else {
            res.status(400).json({
                message: {
                    type: "danger",
                    message: "L'avatar doit avoir une dimension max 300x300"
                }
            });
        }
    });
}