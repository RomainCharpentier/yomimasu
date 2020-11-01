const User = require('../models/user.js');
const passwordHash = require('password-hash');

module.exports = function (router) {

    /**
     * POST Method : Sign up an user (Create)
     */
    router.post('/signup', function(req, res) {
        if (!req.body.email || !req.body.password || !req.body.nickname) {
            // Le cas où l'email ou bien le password ou pseudo ne serait pas soumis ou nul
            res.status(400).json({
                text: "Requête invalide"
            });
        } else {
            // Utilisateur avec mot de passe haché
            var user = {
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                nickname: req.body.nickname,
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
                        res.status(500);
                    } else {
                        res.status(200).json(user.getToken);
                    }
                });
            }, (error) => {
                res.status(error);
            });
        }
    });
    
    /**
     * POST Method : Log an user
     */
    router.post('/signin', function(req, res) {
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

    /**
     * POST Method : Return an user
     */
    router.post('/getUser', function(req, res) {
        var user = User.getUser(req.body.token);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(500);
        }
    });

    /**
     * GET Method : Return all the users
     */
    router.get('/getUsers', function(req, res, next) {
        User.find({}, (err, result) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200).json(result);
            }
        }).select('-_id -password');
    });

    /**
     * POST Method : Update an user
     */
    router.post('/updateUser', function(req, res) {
        const width = req.body.avatar_width;
        const height = req.body.avatar_height;
        if (width > 0 && width <= 300 && height > 0 && height <= 300) {
            User.findOneAndUpdate({"email": req.body.user.email}, req.body.user, {new: true}, (err, user) => {
                if (err) {
                    res.status(500);
                } else if(!user) {
                    res.status(401).json({error: "L'utilisateur n'existe pas"});
                } else {
                    res.status(200).json({
                        user: user,
                        token: user.getToken()
                    });
                }
            });
        } else {
            res.status(400).json({error: "L'avatar doit avoir une dimension max 300x300"});
        }
    });

    /**
     * GET Method : Return an user based on nickname
     */
    router.post('/findUserByNickname', function(req, res) {
        User.findOne({
            nickname: req.body.nickname
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
                res.status(200).json(user);
            }
        });
    });
}