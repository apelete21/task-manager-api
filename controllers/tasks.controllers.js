const tasksModels = require("../models/tasks.models");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksModels.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { name } = req.body;
  try {
    const task = await tasksModels.findOne({ name });
    if (task) return res.status(500).send({ message: "Already exists" });
    const newTask = await tasksModels.create({ name });
    res.status(200).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await tasksModels.findOne({ _id: taskID });
    if (!task) return res.status(404).send({ message: "Not found!" });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await tasksModels.findOneAndDelete({ _id: taskID });
    if (!task) return res.status(404).send({ message: "Not found!" });
    res.status(200).send({ task: null, message: "success!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await tasksModels.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).send({ message: "Not found!" });
    res.status(200).send({ task: task._doc, message: "success!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
};
