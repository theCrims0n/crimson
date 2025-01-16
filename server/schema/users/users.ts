import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    //_id: { type: Object, required: true, unique : true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol_id: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Users = mongoose.model('users', usersSchema);

export default Users