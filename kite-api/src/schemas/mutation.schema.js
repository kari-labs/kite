const mutationType = `
    type Mutation {
        createContainer(userid: String!): String
        deleteContainer(userid: String!): String
        singleUpload(userid: String!, file: Upload!): File!
    }
`;

module.exports = { mutationType };