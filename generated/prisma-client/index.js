"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Industry",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://interview-q-9082c5e7f5.herokuapp.com/interview-q-be/dev`
});
exports.prisma = new exports.Prisma();
