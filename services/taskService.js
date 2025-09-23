const Task = require("../models/Task");

async function createTask(data) {
  const task = new Task(data);
  return task.save();
}

async function getTasks(filter = {}, options = {}) {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 50;
  const skip = (page - 1) * limit;
  const sort = options.sort || "-createdAt";

  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);

  const total = await Task.countDocuments(filter);
  return { tasks, total, page, limit };
}

async function getTaskById(id) {
  return Task.findById(id);
}

async function updateTask(id, update) {
  return Task.findByIdAndUpdate(id, update, { new: true, runValidators: true });
}

async function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
