const asyncWrapper = require("../middleware/async");
const tasksModels = require("../models/tasks.models");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await tasksModels.find();
  // res.status(200).send(tasks);
  res.status(200).json({ success: true, data: { data, nbHits: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const task = await tasksModels.findOne({ name });
  if (task) return res.status(500).send({ message: "Already exists" });
  const newTask = await tasksModels.create({ name });
  res.status(200).send(newTask);
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await tasksModels.findOne({ _id: taskID });
  if (!task) return res.status(404).send({ message: "Not found!" });
  res.status(200).send(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await tasksModels.findOneAndDelete({ _id: taskID });
  if (!task) return res.status(404).send({ message: "Not found!" });
  res.status(200).send({ task: null, message: "success!" });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await tasksModels.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return res.status(404).send({ message: "Not found!" });
  res.status(200).send({ task: task._doc, message: "success!" });
});

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
};
