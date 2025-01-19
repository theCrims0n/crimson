import { useChatStore2 } from "../../../store/chat-store2";
import { useAuthStore } from "../../../store/auth-store";
import { useUIStore } from "../../../store/ui/sidebar-store";
import { ChatSearch } from "../chat-search/ChatSearch";

interface Props {
    chats: any[]
}

export const ChatList = ({ chats }: Props) => {

    const { user }: any = useAuthStore()
    const { getAllMessages, chat_id, users, current_chat_id, isTyping, chat_typing }: any = useChatStore2()
    const { closeChatsContactsMenu } = useUIStore()

    return (
        <div className="flex flex-col h-full w-full rounded-sx">
            <div className="flex flex-col w-full overflow-auto h-full">
                <ChatSearch type={2} />
                {chats.length > 0 && <ul className="flex flex-col w-full">
                    {
                        chats.sort((a, b) => a.lastDocument.chats_dets.createdAt > b.lastDocument.chats_dets.createdAt ? -1 : 1).map((chat, index) => {
                            const { chats_dets, user_to, user_from, users: usersLast } = chat.lastDocument;
                            const user_id = user._id == user_to ? user_from : user_to
                            const socket_to = users?.filter((f: any) => f._id == user_id)[0]?.socket_id
                            const span = user_id && users?.filter((f: any) => f._id == user_id)[0]?.name[0] + users?.filter((f: any) => f._id == user_id)[0]?.lastname[0]
                            return (
                                <li title={chats_dets.message.slice(0, 25) + (chats_dets.message.length > 30 ? '...' : '')} key={index} onClick={() => current_chat_id != chat?._id && [getAllMessages(chat?._id, socket_to, user_id), closeChatsContactsMenu()]} className="flex hover:pl-1 justify-start cursor-pointer items-center border border-r-0 border-l-0 border-t-0 border-b-rose-950 hover:bg-[#0a0a0a] w-full h-16 animation duration-300">
                                    <div key={index} className="flex flex-row w-full justify-start items-center m-2 space-x-2">
                                        <div className="inline-flex items-center justify-center min-w-9 min-h-9 overflow-hidden bg-black rounded-full dark:bg-zinc-900">
                                            {span && <span className="font-bold text-[10px] text-gray-100 dark:text-gray-100 uppercase tracking-[.10em]">{span}</span>}
                                        </div>
                                        <div className="flex w-full justify-start items-center">
                                            {isTyping && chat?._id == chat_typing ?
                                                <div className="flex justify-center items-center pl-4">
                                                    <div className="preloader pt-1">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                                : <p className="flex text-[11px] text-zinc-400 text-start"> {chats_dets.message.slice(0, 25) + (chats_dets.message.length > 30 ? '...' : '')}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col justify-center items-end pt-2 space-y-1">
                                            <p className="text-[9px] text-zinc-400 text-end ">{new Date(chats_dets.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                        </div>
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