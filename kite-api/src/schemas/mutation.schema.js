const mutationType = `
    type Mutation {
        createContainer(nickname: String!): Container
        deleteContainer(_id: String!): String
        deleteAllContainers: Int
        clearFalseContainersFromUser: Boolean
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
        renameFile(userid: String!, path: String!, newPath: String!): File!
        deleteUser(userid: String!): User!
        createUser(userid: String!, password: String!, name: String! scope: [String!]): User
    }
`;

module.exports = { mutationType };