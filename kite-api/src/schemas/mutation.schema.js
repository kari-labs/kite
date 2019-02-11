const mutationType = `
    type Mutation {
        createContainer(nickname: String!): Container
        deleteContainer(_id: String!): Container
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
        createUser(userid: String!, password: String!, name: String! scope: [String!]): User
        deleteUser(userid: String!): User
        loginUser(userid: String!, password: String!): User
        signOutUser: String!
    }
`;

module.exports = { mutationType };