const service = require("../services/taskService");

async function createTask(req, res) {
  const created = await service.createTask(req.body);
  res.status(201).json(created);
}

async function getTasks(req, res) {
  const { search, status, priority, page, limit, sort } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (status === "completed") filter.completed = true;
  if (status === "pending") filter.completed = false;
  if (priority) filter.priority = priority;

  const options = { page, limit, sort };
  const data = await service.getTasks(filter, options);
  res.json(data);
}

async function getTask(req, res) {
  const task = await service.getTaskById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json(task);
}

async function updateTask(req, res) {
  const updated = await service.updateTask(req.params.id, req.body);
  if (!updated) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json(updated);
}

async function deleteTask(req, res) {
  const deleted = await service.deleteTask(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json({ message: "Task deleted" });
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
