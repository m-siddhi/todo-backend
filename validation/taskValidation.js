const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow("").max(2000),
  completed: Joi.boolean().optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  dueDate: Joi.date().optional().allow(null),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional(),
  description: Joi.string().allow("").max(2000).optional(),
  completed: Joi.boolean().optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  dueDate: Joi.date().optional().allow(null),
});

module.exports = { createTaskSchema, updateTaskSchema };
