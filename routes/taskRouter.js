const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");

//отрефакторить это
router.post("/", taskController.create);
router.get("/:userId", taskController.getAll);
router.delete("/", taskController.delete);
router.put("/", taskController.update);

module.exports = router;
