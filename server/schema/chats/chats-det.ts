import mongoose from "mongoose";

const chatsDetSchema = new mongoose.Schema({
    chats_id: { type: mongoose.Schema.ObjectId, required: true, ref: 'chats' },
    message: { type: String, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
})

const Chats_Det = mongoose.model('chats_dets', chatsDetSchema);

export default Chats_Det