import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
    user_to: { type: mongoose.Schema.ObjectId, required: true, ref: 'users' },
    user_from: { type: mongoose.Schema.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now }
})

const Chats = mongoose.model('chats', chatsSchema);

export default Chats