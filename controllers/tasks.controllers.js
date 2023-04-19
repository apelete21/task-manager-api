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

const updateTask = (req, res) => {
  res.send("update single task");
};

const deleteTask = (req, res) => {
  res.send("delete a task");
};

module.exports = { getAllTasks, getTask, deleteTask, createTask, updateTask };
