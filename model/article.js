const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const obj = {
    title: String,
    content: String,
    createData: Date,
    author: String,
    filePath: String
}
// 集合名articles
const model = mongoose.model('article', new Schema(obj));

module.exports = model;