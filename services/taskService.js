const Task = require("../models/Task");

async function createTask(data) {
  const doc = new Task(data);
  return await doc.save();
}

async function getTasks(filter = {}, options = {}) {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 50;
  const skip = (page - 1) * limit;
  const sort = options.sort || "-createdAt";

  const tasks = await Task.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();
  const total = await Task.countDocuments(filter);
  return { tasks, total, page, limit };
}

async function getTaskById(id) {
  return await Task.findById(id);
}

async function updateTask(id, update) {
  return await Task.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
}

async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
