const {Task} = require("../models/models");
const ApiError = require("../error/ApiError");

class TaskController {
    async create(req, res){
        // добавить проверку на передаваемые данные
        const {id, ...rest} = req.body;
        const task = await Task.create({id: id, taskData: rest});
        return res.json(task);
    };

    async getAll(req, res){
        const tasks = await Task.findAll();
        return res.json(tasks);
    };

    async delete(req, res, next){
        const {id} = req.params;
        const tasks = await Task.findAll();
        const deletedTask = tasks.find(task => task.dataValues.id === id);

        if(deletedTask) {
            return res.status(200).json({message: "Задача успешно удалена"});
        }
        return next(ApiError.badRequest("Задача с таким id не найдена"));
    };

    async update(req, res, next){
        const {id} = req.params;
        const tasks = await Task.findAll();
        tasks.forEach(task => {
            if (task.dataValues.id === id){
                task.dataValues.taskData = req.body;
                return res.status(200).json({message: "Задача успешно обновлена"});
            }
        });

        return next(ApiError.badRequest("Задача с таким id не найдена"));
    };

    async getOne(req, res){
        //возможно и не нужно
    };
}

module.exports = new TaskController();
