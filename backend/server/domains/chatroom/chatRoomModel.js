import mongoose from "mongoose";


const connectionSchema = mongoose.Schema({

    participants: {
        userA: {
            id: {
                type: String,
                required: true
            },
            socketId: {
                type: String,
                required: true
            }
        },  
        userB: {
            id: {
                type: String,
                required: true
            },
            socketId: {
                type: String,
                required: true
            }
        }
    },

}, {timestamps: true})

connectionSchema.index({ 'participants.userA.socketId': 1, 'participants.userB.socketId': 1 }, { unique: true });



const messageSchema = mongoose.Schema({
    connectionId: {
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