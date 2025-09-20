const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));  // your main routes

mongodb.initDb((err) => {
  if (err) console.log(err);
  else {
    app.listen(port, () => {
      console.log(`Server running on port ${port} and connected to DB`);
    });
  }
});
