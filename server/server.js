const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const database = require('./db.config');

const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes

// signup
app.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const newUser = await User.create({
      name,
      username,
      password
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

// login

// logout

// get user info
app.get("/users/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;

    const userInfo = await User.findOne({
      where: {
        id: userId
      }
    });

    res.status(200).json(userInfo);
  } catch (err) {
    console.error(err.message);
  }
});


// get all projects + tasks by user
app.get("/projects/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;

    const projects = await Project.findAll({ include: Task });

    res.status(200).json(projects);

  } catch (err) {
    console.error(err.message);
  }
});

// create a project

app.post("/projects", async (req, res) => {
  try {
    const { name, userId } = req.body;

    const newProject = await Project.create({
      name,
      userId
    })

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err.message);
  }
});

// update a project

app.patch("/projects/:id", async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const { name } = req.body;

    const projectToUpdate = await Project.findByPK(projectId);

    projectToUpdate.name = name;

    const updatedProject = await projectToUpdate.save();

    res.status(204).json(updatedProject);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a project

app.delete("/projects/:id", async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const projectToDestroy = await Project.findByPK(projectId);
    projectToDestroy.destroy();

    res.status(204).send();

  } catch (err) {
    console.error(err.message);
  }
});

// create a task

app.post("/tasks", async (req, res) => {
  try {
    const { description, projectId } = req.body;

    const newTask = await Task.create({
      description,
      projectId
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
  }
});

// update a task

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { description, isCompleted } = req.body;

    const finishDate = isCompleted ? new Date() : null;

    const taskToUpdate = await Task.findByPK(taskId);

    taskToUpdate.description = description;
    taskToUpdate.isCompleted = isCompleted;
    taskToUpdate.finishDate = finishDate;

    const updatedTask = await taskToUpdate.save();

    res.status(204).json(updatedTask);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a task

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const taskToDelete = await Task.findByPK(taskId);
    taskToDelete.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
  }
});


(async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log(error);
  }
})();

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});