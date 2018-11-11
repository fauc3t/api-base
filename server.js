const express = require('express');
const fs = require('fs');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const https = require('https');

const API_VERSION = 1;
const API_ROUTE = `/api/v${API_VERSION}`

// make sure dotenv loads
if(dotenv.error){
    console.log(dotenv.parsed);
    throw dotenv.error;
}

app.use(bodyParser.json());
app.use(require('helmet')());
app.use(express.static(__dirname + '/static')); // for lets encrypt challenge

//  start listening, port 443 for production (HTTPS) and 80 for a dev environment (HTTP)
// adjsut as needed
if(process.env.LETSENCRYPT_FULLCHAIN && process.env.LETSENCRYPT_PRIV &&
    process.env.PROD && process.env.PROD.toLowerCase() === 'true') {
    const options = {
        cert: fs.readFileSync(process.env.LETSENCRYPT_FULLCHAIN),
        key: fs.readFileSync(process.env.LETSENCRYPT_PRIV)
    }

    https.createServer(options, app).listen(443);
    console.log("App running in production mode...");
}
else {
    app.get(API_ROUTE, function(req, res) {
        res.send('api running...'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.listen(80);
    console.log("App listening on port 80...");
}

// ROUTES
const routes = ['users'];

routes.forEach((route) => {
    var routeReq = require(`./api/routes/${route}`);
    app.use(API_ROUTE, routeReq);
});

// 404 for all other routes
app.get('*', function(req, res){
    res.status(404).send();
});