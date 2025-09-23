const service = require("../services/taskService");

async function createTask(req, res) {
  try {
    const created = await service.createTask(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTasks(req, res) {
  try {
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

    const options = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
      sort,
    };

    const data = await service.getTasks(filter, options);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTask(req, res) {
  try {
    const task = await service.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const updated = await service.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await service.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
