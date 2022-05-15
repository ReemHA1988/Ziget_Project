const users = require("./routes/users");
const auth = require("./routes/auth");
const projects = require("./routes/projects");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");



mongoose
  .connect("mongodb://localhost/projectManagment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..." + err));
  
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/projects", projects);

app.use((err, res, req, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));