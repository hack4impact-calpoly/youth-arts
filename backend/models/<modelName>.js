const mongoose = require('mongoose')

const modelNameSchema = new mongoose.Schema({
}, { collection: 'modelName' } )
const modelName = mongoose.model('modelName', modelNameSchema)
module.exports = modelName