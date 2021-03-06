const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const prompt = require('prompt');

const fs = require('fs'),
    configPath = './config.json';

// Connecting to the database
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

try {
    // Using config.json
    const configFile = fs.readFileSync(configPath, 'UTF-8');
    const config = JSON.parse(configFile);
    runServer(config.username, config.password);

} catch (e) {
    // Using prompt
    prompt.start();
    prompt.get(['username', 'password'], function (err, result) {
        if (err) {
            console.log(err);
            return 1;
        }
        runServer(result.username, result.password);
    });
}

function runServer(username, password) {
    mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.xjnrs.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to mongoDB')
    }).catch(e => {
        console.log('Error while DB connecting');
        console.log(e);
    });

    //On définit notre objet express nommé app
    const app = express();

    //Defining the Middleware
    var urlencodedParser = bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    });
    app.use(urlencodedParser);
    app.use(bodyParser.json());

    //Defining the CORS
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    //Defining the router
    var router = express.Router();
    app.use('/user', router);
    require(__dirname + '/controllers/userController')(router);

    app.use('/book', router);
    require(__dirname + '/controllers/bookController')(router);

    //Listining
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

//https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
function configureImageMiddleware(app) {
    cloudinary.config({
        cloud_name: 'xxx',
        api_key: 'xxxx',
        api_secret: 'xxxxx',
    });

    const storage = multer.memoryStorage();
    const upload = multer({
        storage
    });
    app.post('/files', upload.single('file'), fileUploadMiddleware);
}

function fileUploadMiddleware(req, res) {
    cloudinary.uploader.upload_stream((result) => {
        axios({
            url: '/api/upload', //API endpoint that needs file URL from CDN
            method: 'post',
            data: {
                url: result.secure_url,
                name: req.body.name,
                description: req.body.description,
            },
        }).then((response) => {
            res.status(200).json(response.data.data);
        }).catch((error) => {
            res.status(500).json(error.response.data);
        });
    }).end(req.file.buffer);
}