//import { Note, Image } from "./models/notes.js";
//const ImageKit = require('imagekit')
import ImageKit from 'imagekit'


import pkg from 'graphql-subscriptions';
const { PubSub } = pkg;

import {Posts} from "./data/posts.js";
import {Users} from "./data/users.js";
import {Comments} from "./data/comments.js";

const NEW_POST = "NEW_POST";

export const resolvers = {
  Query: {
    getPostByTopic(parent, args, context, info) {
      return Posts.filter(post => 
        post.topic === args.topic);
    },

    getPostByID(parent, args, context, info) {
      return Posts.filter(post => 
        post.id === args.id);
    },
  },

  Mutation: {
    createPost: async (_, { created_by, topic, id, body, comments }, {pubsub}) => {
      const post = {
        created_by: created_by, topic: topic, id: Math.random().toString(36).substring(7), body: body, comments: comments
      }
      Posts.push(post); pubsub.publish(NEW_POST, {postSub: post})
      return post;
    },

    createComment: async (_, { user, msg, id, response, idpost}) => {
      const comment = {
        user: user, msg: msg, id: Math.random().toString(36).substring(7), response: response, idpost: idpost
      }
      Comments.push(comment); 
      const querypost = Posts.find(post => post.id == idpost); querypost.comments.push(msg);   
      return comment;
    },

    createResponse: async (_, {idcomment, msg}) => {
      const querycomment = Comments.find(comment => comment.id == idcomment); querycomment.response.push(msg)
      return querycomment
    },
  },

  Subscription: {
    postSub: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(NEW_POST)
    }
  },
};



