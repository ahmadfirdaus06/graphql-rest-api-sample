const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require("body-parser");

const schema = makeExecutableSchema({ typeDefs, resolvers });

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.post(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000; // or any vacant port
const HOST = "localhost"; // or "0.0.0.0"

app.listen(PORT, HOST);
console.log(`GraphQL API server available at http://localhost:${PORT}/graphql`);
console.log(`REST API server available at http://localhost:${PORT}/api`);
require('./src/routes')(app);
