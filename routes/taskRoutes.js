const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const validate = require("../middleware/validateMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validation/taskValidation");

router
  .route("/")
  .get(controller.getTasks)
  .post(validate(createTaskSchema), controller.createTask);

router
  .route("/:id")
  .get(controller.getTask)
  .put(validate(updateTaskSchema), controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;
