import mongoose from "mongoose";


const connectionSchema = mongoose.Schema({
    socketId: {
        type: String,
        required: true
    },  
    participants: {
        userAId: {
            type: String,
            required: true
        },  
        userBId: {
            type: String,
            required: true
        }
    },

}, {timestamps: true})


const messageSchema = mongoose.Schema({
    socketId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true})


export default (
    mongoose.model("Connection", connectionSchema),
    mongoose.model("Message", messageSchema)
    );