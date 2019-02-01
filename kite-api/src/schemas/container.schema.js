const containerType = `
    type Container {
        nickname: String
        owner: User
        image: String
        status: String
        container_id: String
    }
`;

module.exports = { containerType };