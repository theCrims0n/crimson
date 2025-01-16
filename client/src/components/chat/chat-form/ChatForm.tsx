import { useForm } from "react-hook-form"
import { Windows_Dimensions } from "../../ui/windows-dimensions/windows-dimensions"
import { useChatStore } from "../../../store/chat-store"
import { useEffect, useState } from "react"
import { useAuthStore } from "../../../store/auth-store"
import { socket } from "../../../socket/socket"
import { ChevronLeft, ChevronRight, SendHorizonal } from "lucide-react"
import { SearchContacts } from "../chat-contacts/SearchContacts"
import { ChatsList } from "../chat-list/ChatList"
import { cn } from "../../../lib/utils"
import { useUIStore } from "../../../store/ui/sidebar-store"
import { InputChat } from "../../../components/ui/input-chat/InputChat"
import { ChatMessages } from "../chat-messages/ChatMessages"

export const ChatForm = () => {

    const windowDimensions = Windows_Dimensions()!
    const { register, handleSubmit, resetField } = useForm()
    const { sendMessage, sendLastMessages, user_to, contacts, connectSocket, getSocket_To,
        chat_id, Typing, allMessages, getAllMessages }: any = useChatStore()

    const [text, setText] = useState('')
    const { user }: any = useAuthStore()

    useEffect(() => {
        if (socket.id != '') {
            setTimeout(() => {
                connectSocket(user)
                sendLastMessages()
            }, 100);
        }
        if (contacts?.length > 0) {
            sendLastMessages()
        }
    }, [socket.id, allMessages?.length])

    useEffect(() => {
        if (text.trim().length == 0) {
            Typing(false)
            return
        }
        Typing(true)
    }, [text.trim().length])

    const onSubmit = (data: any) => {
        const { message } = data
        if (message.trim().length == 0) { return }
        sendMessage(message)
        resetField('message')
        if (isContactsOpen) {
            handleChangeView()
        }
    }

    const handleChangeView = () => {
        if (!isContactsOpen) {
            sendLastMessages();
            openContacsSideMenu()
            return
        }
        closeSideContactsMenu()
    }

    const { openContacsSideMenu, isContactsOpen, closeSideContactsMenu } = useUIStore()

    return (
        <div className={cn("flex items-center justify-center w-full h-full", windowDimensions.width < 500 ? 'pr-2 pl-2 pt-2' : "pr-8 pl-8 pt-8")}>
            <div className={cn(`flex border border-zinc-600 w-full max-w-[1500px] h-full rounded-sm`, windowDimensions.width > 1000 ? 'flex-row' : 'flex-col')}>
                <div className={cn("flex flex-col border-zinc-600 ", windowDimensions.width > 1000 ? 'border-r h-full w-[350px]' : 'border-b h-[200px] w-full')}>
                    <div onClick={handleChangeView} className="flex flex-row items-center w-full h-10 bg-black border-b border-b-zinc-500">
                        <div className="flex justify-center items-start ml-1">
                            {isContactsOpen ? <ChevronLeft color="white" /> : <ChevronRight color="white" />}
                        </div>
                        <div className="flex justify-center items-center w-full h-10">
                            <p className="text-sm mr-4 font-bold">{isContactsOpen ? 'Search contacts' : 'Chats'}</p>
                        </div>
                    </div>
                    <div className={cn("flex flex-col relative overflow-auto", windowDimensions.width > 1000 ? 'h-full' : 'h-96')}>
                        <div className=" flex-col h-full w-full">
                            <div className={cn("flex flex-row h-full absolute w-full", isContactsOpen && 'absolute')}>
                                <SearchContacts />
                            </div>
                            <div className={cn("flex flex-col h-full w-full ", !isContactsOpen && 'absolute')}>
                                <ChatsList />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-col h-full ">
                        <div className={"relative rounded-t-xl w-full min-h-10 bg-black flex flex-row text-zinc-100 justify-start items-center pl-2 border-b border-b-zinc-500"}>
                            <p className=" text-sm font-bold">{contacts?.filter((f: any) => f._id == user_to).map((f: any) => f.name + ' ' + f.lastname)}</p>
                        </div>
                        <div className="relative flex flex-col-reverse h-full w-full bg-zinc-900 overflow-auto">
                            <ChatMessages allMessages={allMessages} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
                            <div className="relative  w-full">
                                <InputChat autoComplete="off" {...register('message', { required: true })} onChange={(e) => setText(e.target.value)} className="border-l-0 border-r-0 border-b-0 h-[50px] focus:border-l-[1px] focus:border-r-[1px] focus:border-b-[1px] focus:border-2 rounded-none pe-12" />
                                <button type="submit"
                                    disabled={(text.trim().length == 0 || user_to.trim().length == 0) && (text.trim().length == 0 || chat_id.trim().length == 0)}
                                    className="hover:border-l-emerald-500 hover:border-2 rounded-none w-[58px] border-l-zinc-500 absolute  inset-y-0 end-0 flex h-full w-9 items-center justify-center border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Subscribe">
                                    <SendHorizonal color="white" size={25} strokeWidth={2} aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}