const { Schema, model, isValidObjectId } = require('mongoose');

const taskSchema = new Schema({

    name: {
        type: String,
        required: true,

    },
    description: String

}, {

    timestamps: true

}, );

module.exports = model('Task', taskSchema);