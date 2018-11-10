const router = require('express').Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { queryType } = require('../schemas/query.schema');
const { mutationType } = require('../schemas/mutation.schema');
const { containerType } = require('../schemas/container.schema');

const schema = buildSchema(`
    ${containerType}
    ${mutationType}
    ${queryType}
`);

const { ContainerResolvers } = require('../resolvers/container.resolver');
const { FilesystemResolvers } = require('../resolvers/filesystem.resolver');

const root = {};
Object.assign(root, ContainerResolvers);
Object.assign(root, FilesystemResolvers);

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = router;