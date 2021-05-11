const User = require('../models/user.js');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const getToken = (req) => req.headers.authorization && req.headers.authorization.split(' ')[1];

const authenticateJWT = (req, res, next) => {
    const token = getToken(req);

    if (token) {
        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });

    } else {
        res.sendStatus(401);
    }
};

module.exports = function (router) {

    /**
     * POST Method : Sign up an user (Create)
     */
    router.post('/signup', function(req, res) {
        if (!req.body.email || !req.body.password || !req.body.nickname) {
            // Le cas où l'email ou bien le password ou pseudo ne serait pas soumis ou nul
            res.status(400).end();
        } else {
            // Utilisateur avec mot de passe haché
            const user = {
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                nickname: req.body.nickname,
                avatar: req.body.avatar
            };
    
            // On cherche si l'email existe déjà
            const findUser = new Promise(function (resolve, reject) {
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
                const _u = new User(user);
                _u.save((err, user) => {
                    if (err) {
                        res.status(500).end();
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
            res.status(400).end();
        } else {
            User.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err) {
                    res.status(500).end();
                } else if(!user) {
                    // Utilisateur inexistant
                    res.status(404).end();
                } else {
                    // Appel de la méthode authenticate de userSchema
                    if (user.authenticate(req.body.password)) {
                        return res.status(200).json(user.getToken());
                    } else{
                        // Mauvais mot de passe
                        return res.status(401).end();
                    }
                }
            })
        }
    });

    /**
     * GET Method : Return an user
     */
    router.get('/getUser', authenticateJWT, function(req, res) {
        const email = User.getUser(getToken(req));
        User.findOne({email: email.email}, (err, user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(500).end();
            }
        });
    });

    /**
     * GET Method : Return all the users
     */
    router.get('/getUsers', authenticateJWT, function(req, res, next) {
        User.find({}, (err, result) => {
            if (err) {
                res.status(500).end();
            } else {
                res.status(200).json(result);
            }
        }).select('-_id -password');
    });

    /**
     * POST Method : Update an user
     */
    router.post('/updateUser', authenticateJWT, function(req, res) {
        const width = req.body.avatar_width;
        const height = req.body.avatar_height;
        if (width > 0 && width <= 300 && height > 0 && height <= 300) {
            User.findOneAndUpdate({"email": req.body.user.email}, req.body.user, {new: true}, (err, user) => {
                if (err) {
                    res.status(500).end();
                } else if(!user) {
                    res.status(404).end();
                } else {
                    res.status(200).json({
                        user: user,
                        token: user.getToken()
                    });
                }
            });
        } else {
            res.status(413).json({error: "L'avatar doit avoir une dimension max 300x300"});
        }
    });

    /**
     * GET Method : Return an user based on nickname
     */
    router.post('/findUserByNickname', authenticateJWT, function(req, res) {
        User.findOne({
            nickname: req.body.nickname
        }, (err, user) => {
            if (err) {
                res.status(500).end();
            } else if(!user) {
                res.status(404).end();
            } else {
                res.status(200).json(user);
            }
        });
    });

    /**
     * DELETE Method : Delete an user
     */
    router.delete('/deleteUser/:id', authenticateJWT, function(req, res) {
        User.deleteOne({
            email: req.params.id
        }).then(() => {
            res.status(200).end();
        }).catch((error) => {
            res.status(500).send(error);
        });
    });
}