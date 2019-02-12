const containerType = `
    type Container {
        _id: String
        nickname: String
        owner: User
        image: String
        status: String
        container_id: String
    }
`;

module.exports = { containerType };