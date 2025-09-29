const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your React app
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from React
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Example route
app.use("/api/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
