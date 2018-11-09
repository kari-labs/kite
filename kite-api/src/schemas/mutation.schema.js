const mutationType = `
    type Mutation {
        createContainer(userid: String!): String
    }
`;

module.exports = { mutationType };