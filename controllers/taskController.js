const service = require("../services/taskService");

async function createTask(req, res) {
  try {
    const taskData = req.body;
    const newTask = await service.createTask(taskData);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTasks(req, res) {
  try {
    const q = req.query;
    const filters = {};

    if (q.search) {
      filters.$or = [
        { title: { $regex: q.search, $options: "i" } },
        { description: { $regex: q.search, $options: "i" } },
      ];
    }

    if (q.status === "completed") filters.completed = true;
    else if (q.status === "pending") filters.completed = false;

    if (q.priority) filters.priority = q.priority;

    const options = {
      page: q.page ? parseInt(q.page) : 1,
      limit: q.limit ? parseInt(q.limit) : 10,
      sort: q.sort || null,
    };

    const result = await service.getTasks(filters, options);
    const tasksArray = Array.isArray(result.tasks) ? result.tasks : [];

    res.json({
      tasks: tasksArray,
      total: result.total || tasksArray.length,
      page: options.page,
      limit: options.limit,
    });
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
    const updatedTask = await service.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const ok = await service.deleteTask(req.params.id);
    if (!ok) return res.status(404).json({ error: "Task not found" });
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
