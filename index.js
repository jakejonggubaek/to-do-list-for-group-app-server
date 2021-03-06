const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//prevent CORS error
const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const RoomModel = require('./models/ToDo');

app.use(express.json());

mongoose.connect("mongodb+srv://jakejonggubaek:Cdspace1!@cluster0.09veq.mongodb.net/toDo?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.on('connected', () => {
    console.log('mongoose is connected');
});

app.post('/insert', async(req, res) => {
    const id = mongoose.Types.ObjectId();
    const roomName = req.body.roomName;
    const password = req.body.password;
    const toDoList = [];

    const room = new RoomModel({
        _id: id,
        roomName: roomName,
        password: password,
        toDoList: toDoList,
    });

    try {
        await room.save();
        res.send(id);
    } catch(err) {
        console.log(err); 
    }
})

app.put('/read', async(req, res) => {
    console.log('call room server conntected');
    const id = req.body.id;

    try {
        await RoomModel.findById(id, (err, callRoom) => {
            res.send(callRoom);
        });
    } catch (err) {
        console.log(err);
    }
});

app.put('/update', async (req, res) => {
    console.log('update server conntected');
    
    const id = req.body.id;
    const toDoList = req.body.toDoList;

    try {
        await RoomModel.findById(id, (err, updatedRoom) => {

            updatedRoom.toDoList = toDoList;
            updatedRoom.save();
            res.send(updatedRoom);
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(process.env.PORT || 3001, () => {
    console.log('server running on port 3001');

});