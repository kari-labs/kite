const mutationType = `
    type Mutation {
        createContainer(nickname: String!): Container
        deleteContainer(_id: String!): String
        deleteAllContainers: Int
        clearFalseContainersFromUser: Boolean
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
        createUser(userid: String!, password: String!, name: String! scope: [String!]): User
        deleteUser(userid: String!): User
        loginUser(userid: String!, password: String!): User
        signOutUser: String!
        renameFile(userid: String!, path: String!, newPath: String!): File!
    }
`;

module.exports = { mutationType };