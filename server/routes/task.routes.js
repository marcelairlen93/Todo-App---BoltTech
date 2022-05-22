const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const TaskController = require("../controllers/task.controller");

router.use(AuthMiddleware.loggedIn);

router.post("/", TaskController.create);

router.patch("/:id", TaskController.update);

router.delete("/:id", TaskController.delete);

module.exports = router;