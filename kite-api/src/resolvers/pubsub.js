const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub();
const UPDATE_CONTAINER = 'updateContainer';

module.exports = {
    pubsub,
    UPDATE_CONTAINER
}