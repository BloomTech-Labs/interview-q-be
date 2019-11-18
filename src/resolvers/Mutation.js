module.exports = {
  createPost,
}

const {checkFields} = require('../utils');

function createPost(_parent, args, context){
    const { price, position, description } = args;
    
    checkFields({price, position, description});

    return context.prisma.createPost(args);
}