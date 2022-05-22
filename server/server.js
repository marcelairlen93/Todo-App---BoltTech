const express = require("express");
const cors = require("cors");

const database = require('./config/db.config');
const AuthRoutes = require("./routes/auth.routes");
const ProjectRoutes = require("./routes/project.routes");
const TaskRoutes = require("./routes/task.routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// route middlewares
app.use("/api/users", AuthRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/tasks", TaskRoutes);

// database sync
(async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log(error);
  }
})();

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});