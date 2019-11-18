const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../generated/prisma-client');

const resolvers = {
    Query: {
        info: ()=>"I'm ALIVE"
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma},

})

module.exports=server;