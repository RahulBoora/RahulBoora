// models/gameModel.js

import axios from 'axios';
import crypto from 'crypto';
const dotenv = require('dotenv');
import connection from "../config/connectDB";
dotenv.config();

const pid = process.env.PID;
const appKey = process.env.APPKEY;
const gameApiUrl = process.env.GAMEAPIURL;
const gameApiUrl1 = process.env.GAMEAPIURL1;
console.log(gameApiUrl)
var encrypt = function (obj, sKey) {
    if (!obj || !sKey) return "";
    if (sKey.length < 16) return "";
    var key = sKey.substr(0, 16);
    var iv = sKey.substr(0, 16);
    var str = JSON.stringify(obj);
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(str, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = Buffer.from(crypted, 'binary').toString('base64');
    return encodeURIComponent(crypted);
};

var decrypt = function (str, sKey) {
    if (!str || !sKey) return "";
    if (sKey.length < 16) return "";
    str = decodeURIComponent(str);
    var key = sKey.substr(0, 16);
    var iv = sKey.substr(0, 16);
    var buf = Buffer.from(str, 'base64');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(buf, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    return JSON.parse(decoded);
};

const registerMember=async (req) =>{
    console.log('jjbibhu',req);
    try {
        const {ip,username,org} = req;
        const defaultLang = 'en';
        const dataToEncrypt = {
            ip,
            username,
            org,
            lang:defaultLang
        }
        const encryptedData = encrypt(dataToEncrypt ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'REGISTER',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        if (response.data && response.data.data) {
            const decryptedData = decrypt(response.data.data,appKey);
            console.log(decryptedData)
            return decryptedData;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        throw error;
    }
}

const loginMember = async (req, res) => {
    try {
        console.log(req,'hjdfjadhfjahjfh')
        const { id, app_id, lang ,phone} = req;
        if (!req) {
           return res.render('account/login');
        }

        const [rows] = await connection.query('SELECT phone, ip_address FROM users WHERE id = ?', [id]);
        
        const [orderId] = await connection.query('SELECT id_order FROM recharge WHERE phone = ?', [phone]);
console.log(orderId)
        if (rows.length !== 1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const username = rows[0].phone
        const ip = rows[0].ip_address

        const defaultLang = 'en';

        const dataToEncrypt = {
            username,
            ip,
            lang: lang || defaultLang,
            app_id
        };
console.log(dataToEncrypt)
        const encryptedData = encrypt(dataToEncrypt, appKey);

        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'LOGIN',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data) {
            const decryptedData = decrypt(response.data.data, appKey);
            return res.status(200).json(decryptedData);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error(error);
       
    }
};





const KICKUSER=async(req)=> {
    try {
        const encryptedData = encrypt(req ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'KICKUSER',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
       return response.data
        // if (response.data || response.data.data) {
        //     const decryptedData = decrypt(response,appKey);
        //     return decryptedData;
        // } else {
        //     throw new Error('Invalid response format');
        // }
    } catch (error) {
        throw error;
    }
}
const CONTROLUSER=async(req)=> {
    try {
        const encryptedData = encrypt(req ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'CONTROLUSER',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
       return response.data
        // if (response.data || response.data.data) {
        //     const decryptedData = decrypt(response,appKey);
        //     return decryptedData;
        // } else {
        //     throw new Error('Invalid response format');
        // }
    } catch (error) {
        throw error;
    }
}

/*FINANCIAL MODULE */

const BALANCE=async(req)=> {
    try {
        const encryptedData = encrypt(req ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'BALANCE',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
       console.log(response.data)
        if (response.data || response.data.data) {
            const decryptedData = decrypt(response.data.data,appKey);
            return decryptedData;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        throw error;
    }
}

const DEPOSITE=async(req)=> {
    try {
        console.log('bibhudeposit',req);
        const encryptedData = encrypt(req ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'DEPOSIT',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
       console.log(response.data)
        if (response.data || response.data.data) {
            const decryptedData = decrypt(response.data.data,appKey);
            return decryptedData;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        throw error;
    }
}

const GAMELOG=async(req,res)=> {
    try {
        console.log(req,'fhrjrhfvjhfvj')
        const encryptedData = encrypt(req ,appKey);
        const response = await axios.post(gameApiUrl1, {
            pid: pid,
            ver: '1.0.0',
            method: 'GAMELOG',
            data: encryptedData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        if (response.data || response.data.data) {
            const decryptedData = decrypt(response.data.data,appKey);
            console.log(decryptedData)
            return res.json(decryptedData);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerMember,
    loginMember,
    KICKUSER,
    CONTROLUSER,
    BALANCE,
    DEPOSITE,
    GAMELOG
};
