require('dotenv').config();
const express = require('express');
const router = require('./shared/routes/apiRoutes');
const { dbConnection } = require('./shared/dataBase/dataBaseConfig');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./swagger/swagger')
const cors = require('cors');
const { sessionRenewalMiddleware } = require('./auth/infraestructure/authController');


const { PORT, MONGO_DB, DB_NAME, SESSION_SECRET } = process.env;

const app = express();

dbConnection();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `${MONGO_DB}${DB_NAME}` }),
  cookie: {
    secure: false,
    maxAge: 2 * 60 * 60 * 1000
  }
}));

app.use(sessionRenewalMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});