import mongoose from "mongoose";
import { Users as UsersInterface } from "../../interface/users";
import Chats from "../../schema/chats/chats";
import Chats_Det from "../../schema/chats/chats-det";
import Users from "../../schema/users/users";

const chats = Chats;
const chats_det = Chats_Det
const users = Users

export class Chat2 {

    private users: UsersInterface[];
    private usersList: UsersInterface[];

    constructor() {
        this.users = []
        this.usersList = []
    }

    async addUsers(user: any) {

        this.users.push(user)

        this.usersList = await this.getUsers()

        this.usersList = this.usersList.map(dataRow => {
            return {
                _id: dataRow._id,
                socket_id: this.users.filter(f => f._id == dataRow._id)[0]?.socket_id || '',
                name: dataRow.name,
                lastname: dataRow.lastname,
                email: dataRow.email,
                completename: dataRow.name + ' ' + dataRow.lastname
            }
        })

        return this.usersList
    }

    async getUsers() {

        const users = Users;

        return await users.find()
    }

    async saveMassages(chat_id: string, message: string, user_from: string, user_to_id: string) {

        let createmessage: any

        if (chat_id?.trim().length == 0) {
            const user_to = user_to_id
            const chat = await chats.create({ user_from, user_to })
            if (chat) {
                const { _id }: any = chat
                createmessage = await chats_det.create({ chats_id: _id, message, user_id: user_from })
            }
        } else {
            createmessage = await chats_det.create({ chats_id: chat_id, message, user_id: user_from })
        }
        if (createmessage) {
            const { chats_id }: any = createmessage
            return chats_id
        }
    }

    async setLastMessages(_id: string, socket_to: string) {

        const user_id = this.users.filter(f => f.socket_id == _id)[0]?._id
        const user_id_to = this.users.filter(f => f.socket_id == socket_to)[0]?._id

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
            },
        ]).then((result) => {

            return JSON.parse(JSON.stringify(result))
        })

        const messagesTo = await chats.aggregate([
            {
                $match: {
                    $or: [{ user_from: new mongoose.Types.ObjectId(user_id_to?.toString()) },
                    { user_to: new mongoose.Types.ObjectId(user_id_to?.toString()) }]
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
            },
        ]).then((result) => {

            return JSON.parse(JSON.stringify(result))
        })

        return { messages, messagesTo }
    }

    async getAllMessages(chat_id: string) {

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
            { $project: { message: '$chats_dets.message', _id: '$chats_dets._id', date: '$chats_dets.createdAt', user_id: '$chats_dets.user_id', chat_id: '$chats_dets.chats_id' } },
            { $sort: { _id: -1 } }
        ]).then((result) => {

            return JSON.parse(JSON.stringify(result))
        })

        return messages
    }

    findUser(_id: string) {
        const users = this.users.filter(user => user.socket_id == _id)[0]
        if (!users) {
            return []
        }
        return users
    }

    deleteUser(id: string) {
        this.users = this.users.filter(user => user.socket_id != id)
        const users = this.usersList = this.usersList.map(dataRow => {
            return {
                _id: dataRow._id,
                socket_id: this.users.filter(f => f._id == dataRow._id)[0]?.socket_id || '',
                name: dataRow.name,
                lastname: dataRow.lastname,
                email: dataRow.email,
                completename: dataRow.name + ' ' + dataRow.lastname
            }
        })
        return users
    }
}