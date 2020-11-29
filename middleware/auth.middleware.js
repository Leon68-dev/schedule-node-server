const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // if(req.method === 'OPTIONS')
    //     return next();

    // try{
    //     const token = req.header.autorization.split(' ')[1];

    //     if(!token) 
    //         return res.status(401).json({ message: 'Нет авторизации'});
        
    //     const decode = jwt.verify(token, config.get('jwtSecret'));
    //     req.user = decode;
    //     next();

    // } catch(e) {
    //     res.status(401).json({ message: 'Нет авторизации'});
    // }

    next();
}