const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const validate = require("../middleware/validateMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validation/taskValidation");

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.get("/:id", taskController.getTask);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
