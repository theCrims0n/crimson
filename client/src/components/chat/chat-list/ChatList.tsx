import { useAuthStore } from "../../../store/auth-store"
import { useChatStore } from "../../../store/chat-store"

export const ChatsList = () => {

    const { lastMessages, getAllMessages, unreadMessages }: any = useChatStore()

    const { user }: any = useAuthStore()

    return (
        <>
            {
                lastMessages.length > 0 &&
                lastMessages?.sort((a: any, b: any) => a.lastDocument.chats_dets._id > b.lastDocument.chats_dets._id ? -1 : 1)?.map((lastMessage: any, index: number) => {
                    const { chats_dets, user_to, user_from, users } = lastMessage.lastDocument;
                    const user_id = user._id == user_to ? user_from : user_to
                    return (
                        <div key={index} onClick={() => getAllMessages(lastMessage._id, user_id)} className="cursor-pointer border-b border-zinc-500 flex flex-row h-14 w-full hover:bg-zinc-900 justify-start items-center">
                            <div className="flex flex-row w-full justify-start items-center m-2 space-x-2">
                                <div className="inline-flex items-center justify-center min-w-8 min-h-7 overflow-hidden bg-black rounded-full dark:bg-zinc-950">
                                    <span className="font-bold text-[10px] text-gray-100 dark:text-gray-100 uppercase tracking-[.10em]">{users.name[0] + users.lastname[0]}</span>
                                </div>
                                <div className="flex w-full justify-start items-start">
                                    <p className="flex text-[11px] text-zinc-400 text-start">{chats_dets.message.slice(0, 25) + (chats_dets.message.length > 30 ? '...' : '')}</p>
                                </div>
                                <div className="flex flex-col justify-center items-end pt-2 space-y-1">
                                    <div className="flex h-6">
                                        {(unreadMessages.count > 0 && unreadMessages.chat_id == lastMessage._id) && <div className="inline-flex w-full justify-center items-center bg-purple-900 min-w-6 min-h-6 rounded-full text-xs text-zinc-100">
                                            <span className="font-bold text-white text-[10px] tracking-[.10em]">{unreadMessages.count}</span>
                                        </div>}
                                    </div>
                                    <p className="text-[9px] text-zinc-400 text-end ">{new Date(chats_dets.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}