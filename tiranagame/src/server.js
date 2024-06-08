import 'dotenv/config'

import express from 'express';
import configViewEngine from './config/configEngine';
import routes from './routes/web';
import gameRoute from './routes/webr'
import cronJobContronler from './controllers/cronJobContronler';
import socketIoController from './controllers/socketIoController';
require('dotenv').config();
let cookieParser = require('cookie-parser');
import bodyParser from 'body-parser'

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
// setup viewEngine
configViewEngine(app);
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    req.userIp = ip;
    next();
});
app.get('aviatorgame/aviatr', (req, res) => {
    console.log('dvjhedfhf');
    if(!req){
        
        res.render('aviatorgame/aviatr')
    }
    const appId = req.query.app_id; // Retrieve app_id from query parameters
    res.render('aviatr', { appId }); // Pass app_id to the EJS template
});

// init Web Routes
routes.initWebRouter(app);
gameRoute.gameRouter(app);

// Cron game 1 Phut 
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever 
socketIoController.sendMessageAdmin(io);

// app.all('*', (req, res) => {
//     return res.render("404.ejs"); 
// });

server.listen(port, () => {
    console.log("Connected success port: " + port);
});

