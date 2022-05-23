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

    const task = await Task.findByPk(taskId);

    if (task.finishDate) {
      return res.status(400).send("Task finished! It can't be edited");
    }

    const finishDate = isCompleted ? new Date() : null;

    task.description = description;
    task.isCompleted = isCompleted;
    task.finishDate = finishDate;

    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const taskToDelete = await Task.findByPk(taskId);

    if (taskToDelete.finishDate) {
      return res.status(400).send("Task finished! It can't be edited");
    }

    taskToDelete.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
  }
};
