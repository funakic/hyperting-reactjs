const express = require('express');
const cors = require('cors');
const server = express();
const routes = require('./routes');

server.use(cors());
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});

routes(server);

server.listen(3343, () => {
    console.log('API ONLINE');
});