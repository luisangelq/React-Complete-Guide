const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        type: String,
        required: true,
        default: null,
    },
    fileName: {
        type: String,
        required: true,
        default: null,
    },
    originalName: {
        type: String,
        required: true,
        default: null,

    },
    downloads: {
        type: Number,
        default: 1,

    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now(),
    }



});

module.exports = mongoose.model('Link', linkSchema);