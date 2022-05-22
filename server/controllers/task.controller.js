const Task = require("../models/Task");

exports.create = async (req, res) => {
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
};

exports.update = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { description, isCompleted } = req.body;

    const finishDate = isCompleted ? new Date() : null;

    const taskToUpdate = await Task.findByPk(taskId);

    taskToUpdate.description = description;
    taskToUpdate.isCompleted = isCompleted;
    taskToUpdate.finishDate = finishDate;

    const updatedTask = await taskToUpdate.save();

    res.status(204).json(updatedTask);
  } catch (err) {
    console.error(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const taskToDelete = await Task.findByPk(taskId);
    taskToDelete.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
  }
};
