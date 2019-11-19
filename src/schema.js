const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    interviewQinfo: String!
    posts: [Post!]!
    post(id: String!): Post!
  }

  type Mutation {
    createPost(
      price: Int!
      description: String!
      position: String!
    ): Post!

    deletePost(id: String!): Post!
    
    updatePost(
      id: String!
      price: Int
      description: String
      position: String
    ): Post!
  }

  type Post {
      id: ID!
      # coachId: ID!
      price: Int!
      position: String!
      # ratingsId: ID!
      # industry: Industry!
      # tags: String!
      description: String!
  }


  type Industry {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;