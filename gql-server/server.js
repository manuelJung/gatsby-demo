var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs')

const gqlSchema = fs.readFileSync('./schema.gql', 'utf8')

// Root resolver
var root = {
    message: () => ({foo: 'bar'}),
    foo: () => 'bar'
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: buildSchema(gqlSchema),
    rootValue: root,
    graphiql: true
}));
app.listen(8001, () => console.log('Express GraphQL Server Now Running On localhost:8001/graphql'));