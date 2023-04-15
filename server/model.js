const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodolistSchema = new Schema({
    "job": {
        type: String
    }
});

const MyTodoList = mongoose.model('mytodolist', TodolistSchema);

module.exports = MyTodoList;