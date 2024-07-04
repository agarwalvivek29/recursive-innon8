export default ChatSchema = new Schema({
    senderId : {
        type: ObjectId,
        required: true
    },
    receiverId : {
        type: ObjectId,
        required: true
    },
    message : {
        type: String,
        required: true
    },
    time : {
        type: Date,
        required: true
    }
});