const queryType = `
    type Query {
        hello: String
        getContainer(userid: String!): Container
    }
`;

module.exports = { queryType };