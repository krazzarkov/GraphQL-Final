import aserver from "apollo-server";

const { gql } = aserver;

export const typeDefs = gql`
  type Posts {
    created_by: String!
    topic: String!
    id: String!
    body: String!
    comments: [String!]
  }

  type User {
    name: String!
    id: String!
  }

  type Comments {
    user: String!
    msg: String!
    id: String!
    response: String!
    idpost: String!
  }

  type Query {
    getPostByTopic(topic: String!): [Posts]
    getPostByID(id: String!): [Posts]
  }

  type Subscription {
    postSub: Posts!
  }

  type Mutation {
    createPost(created_by: String!, topic: String!, id: String!, body: String!, comments: [String]): Posts!
    createComment(user: String!, msg: String!, id: String!, response: [String!], idpost: String!): Comments!
    createResponse(idcomment: String!, msg: String!): Comments!
  }
`;