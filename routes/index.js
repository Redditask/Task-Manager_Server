const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");

const Router = require("express");
const router = new Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);

module.exports = router;
