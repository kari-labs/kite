const subscriptionType = `
    type Subscription {
        updateContainer(userid: String!): Container!
    }
`;

module.exports = { subscriptionType };