const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.create);
router.get("/:userId", taskController.getAll);
router.delete("/:userId", taskController.delete);
router.put("/:userId", taskController.update);

module.exports = router;
