const path = require('path');
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');

const app =express();

app.use(express.json());
app.use(userRouter);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

module.exports = app;
