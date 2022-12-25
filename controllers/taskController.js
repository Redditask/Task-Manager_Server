const {Task} = require("../models/models");
const ApiError = require("../error/ApiError");

class TaskController {
    async create(req, res){
        const {id, ...rest} = req.body;
        if (id && rest){
            await Task.create({id: id, taskData: rest});
            return res.status(200).json({message: "Задача успешно добавлена"});
        }

        return next(ApiError.badRequest("Запрос передан некорректно"));
    };

    async getAll(req, res){
        const tasks = await Task.findAll();
        return res.status(200).json(tasks);
    };

    async delete(req, res, next){
        const deleted = await Task.destroy({where: {id: req.params.id}});
        if(deleted) {
            return res.status(200).json({message: "Задача успешно удалена"});
        }

        return next(ApiError.notFound("Задача с таким id не найдена"));
    };

    async update(req, res, next){
        if(req.body) {
            const update = await Task.update({taskData: req.body}, {where: {id: req.params.id}});
            if (update) {
                return res.status(200).json({message: "Задача успешно обновлена"});
            }

            return next(ApiError.notFound("Задача с таким id не найдена"));
        }
        return next(ApiError.badRequest("Запрос передан некорректно"));
    };
}

module.exports = new TaskController();
