const mutationType = `
    type Mutation {
        createContainer(nickname: String!): Container
        deleteContainer(_id: String!): String
        deleteAllContainers: Int
        clearFalseContainersFromUser: Boolean
        singleUpload(userid: String!, file: Upload!): File!
        multipleUpload(userid: String!, files: [Upload!]!): [File!]!
        createUser(userid: String!, password: String!, name: String! scope: [String!]): User
        deleteUser(userid: String!): User!
    }
`;

module.exports = { mutationType };