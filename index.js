const express = require('express');
require('dotenv').config();

const { PORT } = process.env || 4000;

const app = express();


//Try branch
let a

app.listen(PORT, ()=>{
  console.log(`Server running in port: ${PORT}`)
});