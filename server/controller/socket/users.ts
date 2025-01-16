import mongoose from "mongoose";
import { Users as UsersInterface } from "../../interface/users";
import Chats from "../../schema/chats/chats";
import Chats_Det from "../../schema/chats/chats-det";
import Users from "../../schema/users/users";

class Chat {

    private users: UsersInterface[];
    private usersList: UsersInterface[];

    constructor() {
        this.users = []
        this.usersList = []
    }

    async addUsers(_id: string, email: string, name: string, lastname: string, socket_id: string) {

        const user = { _id, email, name, lastname, socket_id }

        this.users.push(user)

        this.usersList = await this.getUsers()

        this.usersList = this.usersList.map(dataRow => {
            return {
                _id: dataRow._id,
                socket_id: this.users.filter(f => f._id == dataRow._id)[0]?.socket_id || '',
                name: dataRow.name,
                lastname: dataRow.lastname,
                email: dataRow.email
            }
        })

        return this.usersList

    }

    async createChat(chat_id: string, message: string, socket_id: string, user_to: string) {

        const chats = Chats;
        const chats_det = Chats_Det

        let createmessage: any

        const user_id = this.usersList.filter(f => f.socket_id == socket_id)[0]?._id

        if (chat_id.trim().length == 0) {

            const chat = await chats.create({ user_from: user_id, user_to: user_to })

            if (chat) {
                const { _id }: any = chat
                createmessage = await chats_det.create({ chats_id: _id, message, user_id: user_id })
            }
        } else {
            createmessage = await chats_det.create({ chats_id: chat_id, message, user_id: user_id })
        }

        if (createmessage) {
            const { chats_id }: any = createmessage
            const messages = await this.getAllMessages(chats_id)
            return { messages, chats_id }
        }
    }

    async setLastMessages(_id: string) {

        const chats = Chats;
        const chats_det = Chats_Det
        const users = Users

        const user_id = this.users.filter(f => f.socket_id == _id)[0]?._id

        const messages = await chats.aggregate([
            {
                $match: {
                    $or: [{ user_from: new mongoose.Types.ObjectId(user_id?.toString()) },
                    { user_to: new mongoose.Types.ObjectId(user_id?.toString()) }]
                }
            },
            {
                $lookup: {
                    from: chats_det.collection.name,
                    localField: '_id',
                    foreignField: 'chats_id',
                    as: 'chats_dets'
                }
            },
            {
                $unwind: '$chats_dets'
            },
            {
                $lookup: {
                    from: users.collection.name,
                    localField: 'user_to',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: '$users'
            },
            {
                $group: { _id: '$chats_dets.chats_id', lastDocument: { $last: "$$ROOT" } }
            },]).then((result) => {

                return JSON.parse(JSON.stringify(result))
            })

        return messages
    }

    async getAllMessages(chat_id: string) {

        const chats = Chats;
        const chats_det = Chats_Det

        const messages = await chats.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(chat_id?.toString()) }
            },
            {
                $lookup: {
                    from: chats_det.collection.name,
                    localField: '_id',
                    foreignField: 'chats_id',
                    as: 'chats_dets'
                }
            },
            {
                $unwind: '$chats_dets'
            },
            { $project: { message: '$chats_dets.message', _id: '$chats_dets._id', date: '$chats_dets.createdAt', user_id: '$chats_dets.user_id', chat_id : '$chats_dets.chats_id' } },
            { $sort: { _id: -1 } }
        ]).then((result) => {

            return JSON.parse(JSON.stringify(result))
        })

        return messages
    }

    async getUsers() {

        const users = Users;

        return await users.find()
    }

    async findUser(_id: string) {

        const user = this.users.filter((user) => user._id == _id)[0]

        if (!user) {
            return []
        }

        return user
    }


    deleteUser(id: string) {
        const deleteUser = this.findUser(id)
        this.users = this.users.filter(user => user.socket_id != id)
        const users = this.users
        return { users, deleteUser }
    }

}

export default Chat