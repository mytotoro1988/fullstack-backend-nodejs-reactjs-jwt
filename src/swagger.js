const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "https://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your API documentation (annotate your routes here)
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecs;
