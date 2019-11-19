module.exports = {
    createPost,
    deletePost,
    updatePost,
};

const { checkFields, splitAndTrimTags } = require('../utils');

async function createPost(_parent, args, context) {
    const { price, position, industryName, description, tagString } = args;

    checkFields({ price, position, industryName, description });

    const tagArray = splitAndTrimTags(tagString);

    const tagsObjArray = await tagArray.map(async tag => {
        return await context.prisma.upsertTag({
            where: {
                name: tag.name,
            },
            create: {
                name: tag.name,
            },
            update: {
                name: tag.name,
            },
        });
    });

    return Promise.all(tagsObjArray).then(tags => {
        return context.prisma.createPost({
            price,
            position,
            industry: { connect: { name: industryName } },
            description,
            tags: { connect: tagArray },
        });
    });
}

function deletePost(_parent, args, context) {
    return context.prisma.deletePost({ id: args.id });
}

async function updatePost(_parent, args, context) {
    const { id, price, position, description, industryName, tagString } = args;

    if (tagString && industryName) {
        const tagArray = splitAndTrimTags(tagString);
        const tagsObjArray = await tagArray.map(async tag => {
            return await context.prisma.upsertTag({
                where: {
                    name: tag.name,
                },
                create: {
                    name: tag.name,
                },
                update: {
                    name: tag.name,
                },
            });
        });
        return Promise.all(tagsObjArray).then(tags => {
            return context.prisma.updatePost({
                data: {
                    price,
                    position,
                    description,
                    industry: { connect: { name: industryName } },
                    tags: { connect: tagArray },
                },
                where: {
                    id,
                },
            });
        });
    } else if (industryName) {
        return context.prisma.updatePost({
            data: {
                price,
                position,
                description,
                industry: { connect: { name: industryName } },
            },
            where: {
                id,
            },
        });
    } else if (tagString) {
        const tagArray = splitAndTrimTags(tagString);
        const tagsObjArray = await tagArray.map(async tag => {
            return await context.prisma.upsertTag({
                where: {
                    name: tag.name,
                },
                create: {
                    name: tag.name,
                },
                update: {
                    name: tag.name,
                },
            });
        });
        return Promise.all(tagsObjArray).then(tags => {
            return context.prisma.updatePost({
                data: { price, position, description, tags: { connect: tagArray } },
                where: {
                    id,
                },
            });
        });
    } else {
        //If no industry and tagname
        return context.prisma.updatePost({
            data: { price, position, description },
            where: {
                id,
            },
        });
    }
}