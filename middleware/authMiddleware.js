const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        next();
    }

    try{
        const token = req.headers.authorization.split(" ")[1];
        if (token){
            req.user = jwt.verify(token, process.env.SECRET_KEY);
            next();
        }

        return res.status(401).json({message: "Пользователь не авторизован"});
    }catch (e){
       return res.status(401).json({message: "Пользователь не авторизован"});
    }
};
