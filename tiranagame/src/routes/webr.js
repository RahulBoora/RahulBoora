import express from 'express';
import gameController from '../controllers/gameController';
const router = express.Router();
const gameRouter = (app)=>{
    router.post('/registerU', gameController.registerU);
    router.post('/login', gameController.login);
    router.post('/kickuser', gameController.KICKUSER);
    router.post('/controlUser',gameController.CONTROLUSER);
    router.post('/balance',gameController.BALANCE);
    router.post('/deposite',gameController.DEPOSITE);
    router.post('/gameLog',gameController.GAMELOG);

    return app.use('/', router); 
}


module.exports = {
    gameRouter
};
