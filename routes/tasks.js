const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
  searchTasks,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", updateStatus);
router.get("/search", searchTasks);

module.exports = router;
