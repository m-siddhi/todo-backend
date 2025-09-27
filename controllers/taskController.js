const service = require("../services/taskService");

async function createTask(req, res) {
  try {
    let newTask = await service.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTasks(req, res) {
  try {
    let q = req.query;
    let f = {};

    if (q.search) {
      f.$or = [
        { title: { $regex: q.search, $options: "i" } },
        { description: { $regex: q.search, $options: "i" } },
      ];
    }

    if (q.status === "completed") f.completed = true;
    else if (q.status === "pending") f.completed = false;

    if (q.priority) f.priority = q.priority;

    let opt = {
      page: q.page ? parseInt(q.page) : 1,
      limit: q.limit ? parseInt(q.limit) : 10,
      sort: q.sort || null,
    };

    console.log("filters:", f);

    let result = await service.getTasks(f, opt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTask(req, res) {
  try {
    let task = await service.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    let task = await service.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: "not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    let ok = await service.deleteTask(req.params.id);
    if (!ok) return res.status(404).json({ error: "not found" });
    res.json({ msg: "removed" });
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
