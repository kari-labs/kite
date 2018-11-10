class Container {
    constructor(container) {
        this.container = container;
    }
}

const containerType = `
    type Container {
        Name: String
        Created: String
        Image: String
        ----------------------------- Working Here - Status doesn't work because it is nested within "State"
        Status: String
    }
`;

module.exports = { Container, containerType };