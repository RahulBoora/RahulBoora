import express from 'express';
import videoGameController from '../controllers/videoGameController';
const router = express.Router();
const videoGameRouter = (app)=>{
    router.post('/registerU', videoGameController.registerU);
    router.post('/login', videoGameController.login);
    router.post('/kickuser', videoGameController.KICKUSER);
    router.post('/controlUser',videoGameController.CONTROLUSER);
    router.post('/balance',videoGameController.BALANCE);
    router.post('/deposite',videoGameController.DEPOSITE);
    router.post('/gameLog',videoGameController.GAMELOG);

    return app.use('/', router); 
}


module.exports = {
    videoGameRouter
};
