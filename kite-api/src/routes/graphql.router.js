const router = require('express').Router();
const graphqlHTTP = require('express-graphql');
const {graphqlUploadExpress} = require('graphql-upload');
const { buildSchema } = require('graphql');

const { queryType } = require('../schemas/query.schema');
const { mutationType } = require('../schemas/mutation.schema');
const { containerType } = require('../schemas/container.schema');
const { filesystemType } = require('../schemas/filesystem.schema');

const schema = buildSchema(`
    ${filesystemType}
    ${containerType}
    ${mutationType}
    ${queryType}
`);

const { ContainerResolvers } = require('../resolvers/container.resolver');
const { FilesystemResolvers } = require('../resolvers/filesystem.resolver');

const root = {};
Object.assign(root, ContainerResolvers);
Object.assign(root, FilesystemResolvers);

router.use(
    '/', 
    graphqlUploadExpress({ 
        maxFileSize: 1000000000,
        maxFiles: 10 
    }), 
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

module.exports = router;