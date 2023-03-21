const express = require('express');
const ExpressError = require('./ExpressError');
const itemRouter = require('./itemsRouter')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', itemRouter)


app.use(function(err, req, res, next){
    // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

module.exports = app
    
