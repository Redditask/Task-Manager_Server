const {Task} = require("../models/models");
const ApiError = require("../error/ApiError");

class TaskController {
    async create(req, res, next) {
        const {id, taskText, year, month, day, startTime, endTime, color} = req.body;
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
            });
            return res.status(200).json({message: "Задача успешно добавлена"});
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };

    async getAll(req, res) {
        const tasks = await Task.findAll();
        return res.status(200).json(tasks);
    };

    async delete(req, res, next) {
        try {
            await Task.destroy({where: {id: req.params.id}});
            return res.status(200).json({message: "Задача успешно удалена"});
        } catch (e) {
            return next(ApiError.notFound("Задача с таким id не найдена"));
        }
    };

    async update(req, res, next) {
        try {
            const {taskText, year, month, day, startTime, endTime, color} = req.body;
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
                {where: {id: req.params.id}},
            );
            if (update) {
                return res.status(200).json({message: "Задача успешно обновлена"});
            }
            return next(ApiError.notFound("Задача с таким id не найдена"));
        } catch (e) {
            return next(ApiError.badRequest("Запрос передан некорректно"));
        }
    };
}

module.exports = new TaskController();
