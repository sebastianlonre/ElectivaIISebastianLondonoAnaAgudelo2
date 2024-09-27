require('dotenv').config();
const express = require('express');
const router = require('./routes/apiRoutes');
const { dbConnection } = require('./dataBase/dataBaseConfig');
const { PORT } = process.env || 4000;

const app = express();

dbConnection();

app.use(express.json());
app.use("/api", router);

app.listen(PORT, ()=>{
  console.log(`Server running in port: ${PORT}`)
});