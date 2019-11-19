module.exports = {
  checkFields
} 

function checkFields(args){
    for(let key of Object.keys(args)){
        if(!args[key]){
            throw new Error('Invalid input for required fields');
        }
    }
}