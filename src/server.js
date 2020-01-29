const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = require('./schema');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Post = require('./resolvers/Post');
const Industry = require('./resolvers/Industry');
const Tag = require('./resolvers/Tag');
const User = require('./resolvers/User');
const Availability = require('./resolvers/Availability');
const Booking = require('./resolvers/Booking');
const Report = require('./resolvers/Report');

const resolvers = {
	Query,
	Mutation,
	Post,
	Industry,
	Tag,
	User,
	Availability,
	Booking,
	Report,
};

const server = new GraphQLServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
	context: request => {
		return { ...request, prisma };
	},
});

module.exports = server;
