class Container {
    constructor(container) {
        this.container = container;
    }
}

const containerType = `
    type Container {
        name: String
        status: String
        created: String
        image: String
    }
`;

module.exports = { Container, containerType };