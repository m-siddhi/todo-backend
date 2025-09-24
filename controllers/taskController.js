const service = require("../services/taskService");

async function createTask(req, res) {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getTasks(req, res) {
  try {
    let { search, status, priority, page, limit, sort } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status === "completed") filter.completed = true;
    else if (status === "pending") filter.completed = false;

    if (priority) filter.priority = priority;

    const opts = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      sort: sort || undefined,
    };

    const tasks = await service.getTasks(filter, opts);
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getTask(req, res) {
  try {
    const t = await service.getTaskById(req.params.id);
    if (!t) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(t);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateTask(req, res) {
  try {
    const t = await service.updateTask(req.params.id, req.body);
    if (!t) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(t);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteTask(req, res) {
  try {
    const del = await service.deleteTask(req.params.id);
    if (!del) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
