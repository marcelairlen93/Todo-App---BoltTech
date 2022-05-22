const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getAll = async (req, res) => {
  try {
    const { user } = req;

    const projects = await Project.findAll({
      where: {
        userId: user.id,
      },
      include: Task
    });

    res.status(200).json(projects);

  } catch (err) {
    console.error(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { user } = req;
    const { name } = req.body;

    const newProject = await Project.create({
      name,
      userId: user.id,
    })

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const { name } = req.body;

    const projectToUpdate = await Project.findByPk(projectId);

    projectToUpdate.name = name;

    const updatedProject = await projectToUpdate.save();

    res.status(204).json(updatedProject);
  } catch (err) {
    console.error(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const projectToDestroy = await Project.findByPk(projectId);
    projectToDestroy.destroy();

    res.status(204).send();

  } catch (err) {
    console.error(err.message);
  }
};
