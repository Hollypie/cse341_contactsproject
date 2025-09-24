const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'CSE 341 Project 1 assignment',
  },
  host: process.env.HOST || 'localhost:3000',
  schemes: process.env.SCHEMES ? process.env.SCHEMES.split(',') : ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

