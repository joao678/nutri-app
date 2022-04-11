import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import setupEndpoints from './endpoints.js';
import db from './src/models/index.js';
import fs from 'fs';

export default function () {
  const app = express();
  const swaggerConfig = JSON.parse(fs.readFileSync('./swagger_output.json'));

  /*let corsOptions = {
    origin: "*"
  };*/
  let corsOptions = {
    //origin: "http://10.0.0.100:3000",
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: true
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    name: 'nutri-back-session',
    secret: 'secret',
    resave: true,
    saveUninitialized: false
  }));

  /*app.get('/', (req, res) => {
    res.json({ message: "Servidor backend rodando." });
  });*/

  app.get('/', (req, res) => {
    res.redirect('/swagger');
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

  setupEndpoints(app);

  db.sequelize.sync();

  //Dropar tudo e recriar
  // db.sequelize.sync({ force: true }).then(function () {
  //   console.log("Drop and re-sync db.");
  // }, function () {
  //   console.log(arguments);
  // });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`API is running on port http://localhost:${PORT}/swagger.`);
  });
}