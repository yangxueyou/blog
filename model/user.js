const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const obj = {
    email: String,
    username: String,
    password: String
}
// 集合名users
const model = mongoose.model('user', new Schema(obj));

module.exports = model;