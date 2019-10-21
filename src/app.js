const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const path = require('path');

const app =express();

app.use(express.json())
app.use(userRouter)

// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// app.use(express.static(path.join(__dirname, "client", "build")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });



module.exports = app
