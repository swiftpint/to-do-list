var mongoose = require("mongoose");

// MONGOOSE USER MODEL CONFIG
var ToDoSchema = new mongoose.Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Todo", ToDoSchema);