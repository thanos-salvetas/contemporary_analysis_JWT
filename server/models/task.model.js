const mongoose = require("mongoose")

const taskModel = new mongoose.Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, required: true},
    user_id: {type: String, required: true},
})

module.exports = Task = mongoose.model("mytasks", taskModel)