//Définition des modules
const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    databaseURL: 'https://yomimasu-7ba46.firebaseio.com'
});

const app = express();

var router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);

exports.app = functions.https.onRequest(app); 