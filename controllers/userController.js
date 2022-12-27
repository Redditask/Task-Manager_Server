const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/models");

class UserController {
    async registration(req, res, next){
        const {login, password} = req.body;
        //ToDo: сделать нормальную валидацию
        if(login && password){
            const isUser = await User.findOne({where: {login}});
            if(isUser){
                return next(ApiError.badRequest("Пользователь уже существует"));
            }

            const hashPassword = await bcrypt.hash(password, 4);
            const user = await User.create({login, password: hashPassword});
            const token = jwt.sign(
                {id: user.id, login},
                process.env.SECRET_KEY,
                {expiresIn: "24h"},
            );

            return res.json({token});
        }

        return next(ApiError.badRequest("Данные для регистрации некорректны"));
    };

    async login(req, res, next){
        const {login, password} = req.body;
        if (!(login && password)) {
            return next(ApiError.badRequest("Данные для входа некорректны"));
        }

        const user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.notFound("Такого пользователя не существует"));
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return next(ApiError.badRequest("Указан неверный пароль"));
        }

        const token = jwt.sign(
            {id: user.id, login: user.login},
            process.env.SECRET_KEY,
            {expiresIn: "24h"},
        );

        return res.json({token});
    };

    async check(req, res, next){
        return res.json({message: "is auth"});
    };
}

module.exports = new UserController();
