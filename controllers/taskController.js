const {Task} = require("../models/models");
const ApiError = require("../error/ApiError");

class TaskController {
    async create(req, res, next) {
        const {id, taskText, year, month, day, startTime, endTime, color, userId} = req.body;
        try {
            await Task.create({
                id: id,
                taskText: taskText,
                year: year,
                month: month,
                day: day,
                startHour: startTime.hour,
                startMin: startTime.min,
                endHour: endTime.hour,
                endMin: endTime.min,
                color: color,
                userId: userId,
            });
            return res.status(200).json({message: "Задача успешно добавлена"});
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async getAll(req, res, next) {
        try {
            const {userId} = req.body;
            const tasks = await Task.findAll({where: {userId}});
            return res.status(200).json(tasks);
        }catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async delete(req, res, next) {
        try {
            const {userId} = req.body;
            const deleted = await Task.destroy({where: {id: req.params.id, userId}});
            if(deleted) {
                return res.status(200).json({message: "Задача успешно удалена"});
            }
            return next(ApiError.notFound("Задача не найдена"));
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async update(req, res, next) {
        try {
            const {taskText, year, month, day, startTime, endTime, color, userId} = req.body;
            const update = await Task.update(
                {
                    taskText: taskText,
                    year: year,
                    month: month,
                    day: day,
                    startHour: startTime.hour,
                    startMin: startTime.min,
                    endHour: endTime.hour,
                    endMin: endTime.min,
                    color: color,
                },
                {where: {id: req.params.id, userId}},
            );
            if (update) {
                return res.status(200).json({message: "Задача успешно обновлена"});
            }
            return next(ApiError.notFound("Задача не найдена"));
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };
}

module.exports = new TaskController();
