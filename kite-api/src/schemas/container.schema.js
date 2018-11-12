const containerType = `
    type ContainerState {
        Status: String
    }

    type ContainerConfig {
        Image: String
    }

    type Container {
        Name: String
        Created: String
        Config: ContainerConfig
        State: ContainerState
    }
`;

module.exports = { containerType };