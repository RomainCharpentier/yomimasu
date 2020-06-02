//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const prompt = require('prompt');

//Connexion à la base de donnée
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

prompt.start();

prompt.get(['username', 'password'], function (err, result) {
    if (err) { 
        console.log(err); 
        return 1; 
    }
    mongoose.connect('mongodb+srv://'+result.username + ':' + result.password + '@cluster0-q86rq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
        console.log('Connected to mongoDB')
    }).catch(e => {
        console.log('Error while DB connecting');
        console.log(e);
    });

    //On définit notre objet express nommé app
    const app = express();

    //Body Parser
    var urlencodedParser = bodyParser.urlencoded({
        extended: true
    });
    app.use(urlencodedParser);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Définition des CORS
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    //Définition du routeur
    var router = express.Router();
    app.use('/user', router);
    require(__dirname + '/controllers/userController')(router);
    
    app.use('/book', router);
    require(__dirname + '/controllers/bookController')(router);

    //Définition et mise en place du port d'écoute
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening on port ${port}`));

});