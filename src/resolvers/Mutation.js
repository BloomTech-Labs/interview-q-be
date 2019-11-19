module.exports = {
    createPost,
    deletePost,
    updatePost,
}

const { checkFields, splitAndTrimTags } = require('../utils');

async function createPost(_parent, args, context) {
    const { price, position, industryName, description, tagString } = args;

    checkFields({ price, position, industryName, description });

    const tagArray = splitAndTrimTags(tagString);
    console.log(tagArray)

    const tagsObjArray = await tagArray.map(async tag => {
        //     console.log(tag)
        return await context.prisma.upsertTag({
            where: {
                name: tag.name
            },
            create: {
                name: tag.name
            },
            update: {
                name: tag.name
            }
        })
    })

    console.log(tagsObjArray);
    return Promise.all(tagsObjArray)
        .then(tags => {
            console.log(tags);

            return context.prisma.createPost({ price, position, industry: { connect: { name: industryName } }, description, tags: { connect: tagArray } });
        })

}

function deletePost(_parent, args, context) {
    return context.prisma.deletePost({ id: args.id })
}

function updatePost(_parent, args, context) {
    const { price, position, description, id } = args;

    return context.prisma.updatePost({
        data: { price, position, description },
        where: {
            id
        }
    })
}