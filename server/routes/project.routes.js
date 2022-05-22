const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ProjectController = require("../controllers/project.controller");

router.use(AuthMiddleware.loggedIn);

router.post("/", ProjectController.create);

router.get("/", ProjectController.getAll);

router.patch("/:id", ProjectController.update);

router.delete("/:id", ProjectController.delete);

module.exports = router;