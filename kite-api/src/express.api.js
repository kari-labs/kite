require('dotenv').config();
const express = require('express');
const session = require('express-session');

const { ApolloServer, gql } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const { buildSchema } = require('graphql');

const redis = require('redis').createClient(6379, 'kiteredis');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');

const { dbConnect, createDefaultAdmin } = require('./utils/mongo.util');

dbConnect();
createDefaultAdmin('admin', 'pass');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
}

const sessionConfig = {
  store: new RedisStore({
    client: redis
  }),
  secret: process.env.REDIS_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000 // 3 hours in ms
  }
}

if(app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

const { queryType } = require('./schemas/query.schema');
const { mutationType } = require('./schemas/mutation.schema');
const { subscriptionType } = require('./schemas/subscription.schema');
const { containerType } = require('./schemas/container.schema');
const { filesystemType } = require('./schemas/filesystem.schema');
const { userType } = require('./schemas/user.schema');

const typeDefs = gql`
  ${filesystemType}
  ${containerType}
  ${userType}
  ${queryType}
  ${mutationType}
  ${subscriptionType}
`;


const { ContainerResolvers } = require('./resolvers/container.resolver');
const { FilesystemResolvers } = require('./resolvers/filesystem.resolver');
const { UserResolvers } = require('./resolvers/user.resolver');

const resolvers = {
  ...ContainerResolvers,
  ...FilesystemResolvers,
  ...UserResolvers,
  Query: {
    ...ContainerResolvers.Query,
    ...FilesystemResolvers.Query,
    ...UserResolvers.Query,
  },
  Mutation: {
    ...ContainerResolvers.Mutation,
    ...FilesystemResolvers.Mutation,
    ...UserResolvers.Mutation,
  },
  Subscription: {
    ...ContainerResolvers.Subscription,
    ...FilesystemResolvers.Subscription,
    ...UserResolvers.Subscription,
  },
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => req,
});
apollo.applyMiddleware({
  app,
  path: '/api/graphql',
  cors: corsOptions,
});
//apollo.installSubscriptionHandlers(app);

//app.use('/api/graphql', cors(corsOptions), graphql);

app.listen(port, () => console.log(`KITE-API listening on port ${port}!`));