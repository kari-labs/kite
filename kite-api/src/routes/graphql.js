const router = require('express').Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { createContainer, stopContainer, getContainer, getAllContainers } = require('../index');

const { queryType } = require('../schemas/query.schema');
const { mutationType } = require('../schemas/mutation.schema');
const { Container, containerType } = require('../schemas/container.schema');

const schema = buildSchema(`
    ${containerType}
    ${mutationType}
    ${queryType}
`);

const root = {
    createContainer: async ({userid}) => {
        try {
            await createContainer(userid);
            return `Successfully created container for student ${userid}`;
        } catch (err) {
            return `Error creating container for student - ${err}`;
        }
    },
    getContainer: async ({userid}) => {
        try {
            let container = await getContainer(`${userid}php`);
            let result = {};
            result.name = container.Name.slice(0, -3);
            result.status = container.State.Status;
            result.created = container.Created;
            result.image = container.Config.Image;
            return result;
        } catch (err) {
            return `Error retrieving your container - ${err}`;
        }
    },
    hello: () => {
        return 'Hello World!';
    }
};

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = router;