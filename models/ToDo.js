const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({toDo: String, isDone:Boolean});

const RoomSchema = new mongoose.Schema({
    roomName : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
    },
    toDoList: [ToDoSchema]
});

const ToDo = mongoose.model('RoomData', RoomSchema);
module.exports = ToDo;