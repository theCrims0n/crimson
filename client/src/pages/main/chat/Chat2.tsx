import { ChatUsers } from "../../../components/chat2/chat-users/ChatUsers"
import { ChatForm } from "../../../components/chat2/chat-form/ChatForm"
import { useEffect, useState } from "react"
import { socket } from "../../../socket/socket"
import { useChatStore2 } from "../../../store/chat-store2"
import { useAuthStore } from "../../../store/auth-store"
import { ChatList } from "../../../components/chat2/chat-list/ChatList"
import { cn } from "../../../lib/utils"
import { MessagesSquare, UsersRound } from "lucide-react"
import { Tooltip } from "react-tooltip"
import { useUIStore } from "../../../store/ui/sidebar-store"

export const Chat2 = () => {
    const { user }: any = useAuthStore()
    const { isChatMenu, isUsersMenu, closeUsersContactsMenu, closeChatsContactsMenu, openChatsSideMenu, openUsersSideMenu, closeDetail, openInformation } = useUIStore()
    const { newUsers, newLastMessages, users, getUsers, reconnect, lastMessages, setLastMessages, reset, search } = useChatStore2()

    useEffect(() => {
        if (socket.id != '') {
            setTimeout(() => {
                reconnect(user)
                getUsers()
            }, 100);
        }
        getUsers()
        reset()
        if (users.length > 0) {
            setLastMessages()
        }
    }, [socket.id])

    useEffect(() => {
        getUsers()
        setLastMessages()
    }, [isUsersMenu, isChatMenu])

    return (
        <div className="flex flex-col fade-in h-full w-full pt-4 pl-4 pr-4 pb-4">
            <div className="relative flex flex-row justify-center items-center w-full h-full">
                <div className="flex justify-center h-full w-full absolute">
                    <div className="flex flex-row w-[1400px] relative overflow-auto" >
                        <div className="flex flex-col h-full w-full absolute pl-[50px]" onClick={() => [closeUsersContactsMenu(), closeChatsContactsMenu(), search('', 0)]}>
                            <ChatForm />
                        </div>
                        <div onClick={() => closeDetail()} className={cn("flex flex-col h-full", isUsersMenu || isChatMenu ? 'w-[500px]' : 'w-[0px] animation duration-500')}>
                            <div className="flex flex-row h-full relative ">
                                <div className="flex flex-col h-full relative [&>*]:p-4 justify-start items-center h-full bg-black space-y-4 pt-4 border border-r-0 border-l-rose-950 border-t-rose-950 border-b-rose-950 w-[10%] min-w-[50px]">
                                    <div id="chats" onClick={() => [closeUsersContactsMenu(), openChatsSideMenu(), search('', 2), openInformation(false)]} className="flex rounded-full w-10 h-10 md:w-11 md:h-11 justify-center items-center hover:bg-zinc-900 ">
                                        <Tooltip className="h-8" anchorSelect="#chats" place="right">
                                            <p className="md:text-[12px] text-[10px]">Chats</p>
                                        </Tooltip>
                                        <div className="flex justify-center items-center w-18 h-8 md:w-12 md:h-12  cursor-pointer">
                                            <MessagesSquare color="white" className="hover:bg-zinc-900 " />
                                        </div>
                                    </div>
                                    <div id="users" onClick={() => [closeChatsContactsMenu(), openUsersSideMenu(), search('', 1), openInformation(false)]} className="flex rounded-full w-10 h-10 md:w-11 md:h-11 justify-center items-center hover:bg-zinc-900">
                                        <Tooltip className="h-8" anchorSelect="#users" place="right">
                                            <p className="md:text-[12px] text-[10px]">Users</p>
                                        </Tooltip>
                                        <div className="flex justify-center items-center w-8 h-8 md:w-12 md:h-12  cursor-pointer">
                                            <UsersRound size={25} color="white" className="hover:bg-zinc-900" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full relative overflow-auto overflow-hidden w-[90%] border border-t-rose-950 border-b-rose-950 border-l-0 border-r-0" >
                                    <div className={cn("flex flex-col bg-black min-h-full min-w-full top-0 left-0 ease-in-out animation duration-300 -translate-x-full border border-r-rose-950 border-l-0 border-t-0 border-b-0", (isUsersMenu || isChatMenu) && 'translate-x-0 ')}>
                                        {isChatMenu ? <ChatList chats={newLastMessages.length == 0 ? lastMessages : newLastMessages} /> : <ChatUsers users={newUsers.length == 0 ? users : newUsers || []} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}