# GraphQL API Docs
#### These docs attempt to explain how the code is structured, how the data is structured, and how to interact with the API. NOTE - These examples only apply to express-graphql.
### Resolvers
These are top level functions that you call to interact with the data. They are bound to a root object which is passed to the GraphQL server. An example resolver might look like the **helloWorld** example below: 
 ```javascript
const root = {
    helloWorld: () => {
        return 'Hello World'
    }
}
```
TODO : Explain example here.
 
### Routes
This one is a little misleading. Technically GraphQL **only exposes a single endpoint** so we only need to use one route, but there is a decent bit of config that the GraphQL server requires so we put that in here. An example router would look similar to the example below:
 ```javascript
const schema = (`...`)
const root = {...}
router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
})

```
TODO : Explain example here.
 
### Schemas
These are definitions for the GraphQL types that we will be using. There are 3 main types, Queries, Mutations, and Subscriptions. You can create your own types to represent the data you will be using, but you **can only directly interact with a resolver that is declared as either a Query, Mutation, or Subscription**. Understanding how schemas work together is likely the hardest part of GraphQL.  An example Schema might look like the example below.
 ```javascript
 type Container {
     Name: String
     Created: String
 }
 
 type Mutation {
     createContainer(userid: String!): String
     deleteContainer(userid: String!): String
 }
 
type Query {
    getContainer(userid: String!): Container!
    getAllContainers: [Container!]!
    hello: String
}
```
TODO : Explain example here.


## Data Structure

### Containers
The default docker API returns a ton of information about the requested containers. We typically don't need most of it so we can easily just request what we want with GraphQL. The data available is structured as below and can easily be added to:
```javascript
Container {
    Name String
    Created String(actually a date)
    State {
        Status String
    }
    Config {
        Image String
    }
} 
```

## Interacting with the API
### Hello World!
I decided to leave a hello world function in the API for now so that you can all start small if you want. This function utilizes a resolver "hello", and because we are **searching for data**, the function is a property of the **query** schema. If using the GraphIQL dashboard to interact the API you can simply type the below to get started: 
```javascript
query {
    hello
}
```
This calls the "hello" resolver function from the Query schema. It should return "Hello World!"

### Creating a Container
To do anything, you must first create a container to work with! To create a container, we have a "createContainer" resolver function which requires a "userid" parameter. The userid must be a string. A key thing to note is that since we are performing an **action that will modify something**, this is a **mutation** and the createContainer resolver function is in the Mutation schema. Here is an example:
```javascript
mutation {
    createContainer(userid: "001433733")
}
```
This calls the createContainer resolver function from the mutation schema. It should return "Successfully created container for student `id`."

### Viewing a Container
When viewing a container, you are querying for information, so therefore you want to be sure to be using the query type. The resolver function for this use is called "getContainer", requires a "userid" parameter, and **returns varying data based on what you request**. See above in Data Structure -> Containers for the various fields you can request and the types of data that will be returned. If you need additional data, feel free to open an issue. See below for an example:
```javascript
query {
    getContainer(userid: "001433733") {
    	Name
        State {
        	Status
        }
    }
}
```
### Viewing all Containers
To view all containers, you need to run the getAllContainers resolver function. getAllContainers doesn't take a "userid" parameter. You can still specify what data you would like from all the containers.
```javascript
query {
    getAllContainer {
    	Name
        State {
        	Status
        }
    }
}
```
### Deleting a Container
Finally, you are able to delete containers using the deleteContainer resolver function. This function resides in the mutation schema. See the example below:
```javascript
mutation {
	deleteContainer(userid:"001433733")
}
```