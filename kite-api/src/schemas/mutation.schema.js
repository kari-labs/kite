const mutationType = `
    type Mutation {
        createContainer(userid: String!): String
        deleteContainer(userid: String!): String
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
    }
`;

module.exports = { mutationType };