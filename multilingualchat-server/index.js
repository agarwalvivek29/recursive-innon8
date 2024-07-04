// write a base express server listening on port 8080
const express = require('express');
const dbConnect = require('./dbConnect');
const userRouter = require('./routers/user');
const appointmentRouter = require('./routers/appointment');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

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

app.get('/', (req, res) => {
  res.send('Innon8 ka pehla server he bhao');
});

app.listen(port, ()=>{
  console.log('Server chalu on port ',port);
});