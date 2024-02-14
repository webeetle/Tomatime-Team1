const express = require('express');
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const lifeCycleRoutes = require("./routes/lcRoutes.js");

app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/lc", lifeCycleRoutes);

app.listen( port , () =>{
    console.log(`Server running at ${port}`);
});