module.exports = {
    checkFields,
    splitAndTrimTags
}

function checkFields(args) {
    for (let key of Object.keys(args)) {
        if (!args[key]) {
            throw new Error('Invalid input for required fields');
        }
    }
}

// Takes in a string of tags separated by commas. 
// It splits them up into an array and removes excess whitespace
// Returns array of tags
function splitAndTrimTags(tagString) {
    const tagArray = tagString.split(',');
    return tagArray.map(tag => {return {name: tag.trim()}});
}