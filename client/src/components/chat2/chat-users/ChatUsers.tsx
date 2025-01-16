import { useChatStore2 } from "../../../store/chat-store2"
import { useAuthStore } from "../../../store/auth-store"
import { useUIStore } from "../../../store/ui/sidebar-store"
import { Dot } from "lucide-react"

interface Props {
    users: any[]
}

export const ChatUsers = ({ users }: Props) => {

    const { user }: any = useAuthStore()
    const { socketTo, getAllMessages, current_chat_id } = useChatStore2()
    const { closeSideContactsMenuWidth } = useUIStore()

    return (
        <div className="fade-in flex flex-col h-full w-full rounded-sx">
            <div className="flex flex-col w-full overflow-auto h-full">
                {users.length > 0 && <ul className="flex flex-col w-full">
                    {
                        users.filter(f => f._id != user._id).map((user, index) => {
                            return (
                                <li title={user.socket_id != '' ? 'Online' : 'Offline'} key={index} onClick={() => user.chat_id ? (current_chat_id != user.chat_id && [getAllMessages(user.chat_id, user.socket_id, user._id), closeSideContactsMenuWidth()]) : [socketTo(user.socket_id, user._id), closeSideContactsMenuWidth()]} className="cursor-pointer flex hover:pl-1 border border-r-0 border-l-0 border-t-0 border-b-zinc-900 justify-start items-center hover:bg-zinc-800 w-full h-16 animation duration-300">
                                    <div className="flex flex-row w-full justify-start items-center m-2 space-x-2">
                                        <div className="inline-flex items-center justify-center min-w-9 min-h-9 overflow-hidden bg-black rounded-full dark:bg-zinc-900">
                                            <span className="font-bold text-[10px] text-gray-100 dark:text-gray-100 uppercase tracking-[.10em]">{user.name[0] + user.lastname[0]}</span>
                                        </div>
                                        <p className="flex text-[11px] text-zinc-400 text-start">{user?.email}</p>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <Dot size={40} color={user.socket_id != '' ? "green" : 'gray'} />
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>}
            </div>
        </div>
    )
}