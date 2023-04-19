const express = require("express");
const app = express();

// middlewares
app.use(express.json())

// mongodb connections
require("./db/connect")

// api listenning port
const port = 5500;

// routers imports
const tasks = require("./routes/tasks.routes");

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/tasks", tasks);

app.listen(port, () => {
  console.log(`API listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
