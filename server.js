require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
