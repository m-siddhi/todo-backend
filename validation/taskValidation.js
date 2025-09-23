const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(2000).allow(""),
  completed: Joi.boolean(),
  priority: Joi.string().valid("low", "medium", "high"),
  dueDate: Joi.date().allow(null),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  description: Joi.string().max(2000).allow(""),
  completed: Joi.boolean(),
  priority: Joi.string().valid("low", "medium", "high"),
  dueDate: Joi.date().allow(null),
});

module.exports = { createTaskSchema, updateTaskSchema };
