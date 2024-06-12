import videoGameModel from './videoGameModel'
const registerU = async(req, res)=> {
    try {
        console.log('dsjfagdfbwvnbdjvbjsfdbvjfv',req.body);
        const result = await videoGameModel.registerMember(req.body,res);
        return result
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login=async(req, res)=> {
    try {
        const result = await videoGameModel.loginMember(req.body,res);
        
         return result
    } catch (error) {
        console.error('Error:', error);
       return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const KICKUSER=async(req, res)=> {
    try {
        const result = await videoGameModel.KICKUSER(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const CONTROLUSER=async(req, res)=> {
    try {
        const result = await videoGameModel.CONTROLUSER(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const BALANCE=async(req, res)=> {
    try {
        const result = await videoGameModel.BALANCE(req);
        return result;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const DEPOSITE=async(req, res)=> {
    try {
        console.log('depositecontroller',req);
        const result = await videoGameModel.DEPOSITE(req);
        return result
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const GAMELOG=async(req, res)=> {
    try {
        console.log(req.body)
        const result = await videoGameModel.GAMELOG(req.body,res);
        return result
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    registerU,
    login,
    KICKUSER,
    CONTROLUSER,
    BALANCE,
    DEPOSITE,
    GAMELOG
};
