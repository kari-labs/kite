const mutationType = `
    type Mutation {
        createContainer(owner: String!, userid: String!, nickname: String!): String
        deleteContainer(userid: String!): String
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
        createUser(userid: String!, password: String!, name: String! scope: [String!]): User
    }
`;

module.exports = { mutationType };