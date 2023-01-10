const {Task} = require("../models/models");
const ApiError = require("../error/ApiError");

class TaskController {
    async create(req, res, next) {
        const {task} = req.body;
        const userId = req.params.userId;
        console.log(req.params)
        try {
            await Task.create({
                id: task.id,
                taskText: task.taskText,
                year: task.year,
                month: task.month,
                day: task.day,
                startTime: task.startTime,
                endTime: task.endTime,
                color: task.color,
                userId: userId,
            });
            return res.status(200).json({message: "Задача успешно добавлена"});
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async getAll(req, res, next) {
        try {
            const userId = req.params.userId;
            const tasks = await Task.findAll({where: {userId}});
            return res.status(200).json(tasks);
        }catch (e) {
            console.log(e)
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async delete(req, res, next) {
        try {
            const {id} = req.body;
            const userId =  req.params.userId;
            const deleted = await Task.destroy({where: {id, userId}});
            if(!deleted) {
                return next(ApiError.notFound("Такая задача не найдена"));
            }
            else return res.status(200).json({message: "Задача успешно удалена"});
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async update(req, res, next) {
        try {
            const {task} = req.body;
            const userId = req.params.userId
            const update = await Task.update(
                {
                    taskText: task.taskText,
                    startTime: task.startTime,
                    endTime: task.endTime,
                    color: task.color,
                },
                {where: {id: task.id, userId}},
            );
            if (!update) {
                return next(ApiError.notFound("Такая задача не найдена"));
            }else return res.status(200).json({message: "Задача успешно обновлена"});
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };
}

module.exports = new TaskController();
