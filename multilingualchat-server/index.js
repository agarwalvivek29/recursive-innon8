// write a base express server listening on port 8080
const express = require('express');
const dbConnect = require('./dbConnect');
const userRouter = require('./routers/user');
const appointmentRouter = require('./routers/appointment');
const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/appointment',appointmentRouter);

dbConnect();

// Error handling middleware
app.use((err, req, res, next) => {
    // Log the error (optional)
    console.error(err.stack);
  
    // Set the response status code
    res.status(err.status || 500);
  
    // Send a JSON response with the error message
    res.json({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
});

app.listen(8080, ()=>{
    console.log('Server chalu on port 8080');
});