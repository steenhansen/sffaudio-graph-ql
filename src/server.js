import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import * as Schema from './schema';

const LOCAL_PORT = 3000;
if (process.env.PORT){
  listen_port = process.env.PORT;
  machine = 'https://sffaudio-graphql.herokuapp.com';
}else{
  listen_port = LOCAL_PORT;
  machine = 'http://localhost:' + $LOCAL_PORT;
}

const server = express();

const schemaFunction =
  Schema.schemaFunction ||
  function() {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function() {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function(headers, secrets) {
    return Object.assign(
      {
        headers: headers,
      },
      secrets
    );
  };

server.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  if (!schema) {
    schema = schemaFunction(process.env)
  }
  const context = await contextFunction(request.headers, process.env);
  const rootValue = await rootFunction(request.headers, process.env);

  return {
    schema: await schema,
    rootValue,
    context,
    tracing: true,
  };
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: ``,
}));

server.listen(listen_port, () => {
  console.log(`GraphQL Server is now running on ${machine}/graphql`);
  console.log(`View GraphiQL at ${machine}/graphiql`);
});