import { EllipsisVertical, MessageSquare, SendHorizonal, X } from "lucide-react"
import { InputChat } from "../../../components/ui/input-chat/InputChat"
import { ChatMessage } from "../chat-messages/ChatMessages"
import { useChatStore2 } from "../../../store/chat-store2"
import { useForm } from "react-hook-form"
import { useEffect, useMemo, useState } from "react"
import { cn } from "../../../lib/utils"
import { Doodle } from "../../doodle/Doodle"
import { Tooltip } from 'react-tooltip'
import { useUIStore } from "../../../store/ui/sidebar-store"
import { ChatDetailsBox } from "../chat-user-details/ChatDetailsBox"
import { ChatInformationUser } from "../chat-user-details/ChatInformationUser"

export const ChatForm = () => {
    const { register, handleSubmit, resetField } = useForm()
    const { messages, sendMessage, socket_to, message, getMessage, Typing, setLastMessages, chat_id, users, user_to_id, reset } = useChatStore2()
    const { isChatMenu, isUsersMenu, isDetail, closeDetail, openDetail, isInformation, openInformation } = useUIStore()
    const [text, setText] = useState('')
    const [hello, setHello] = useState('')
    const [hello2, setHello2] = useState('')
    const [fade, setfade] = useState(false)

    const onSubmit = ({ message }: any) => {
        if (message.trim().length == 0) return
        sendMessage(message)
        setLastMessages()
        resetField('message')
    }

    useEffect(() => {
        if (chat_id.trim().length === 0) { return }
        getMessage()
    }, [chat_id])

    useEffect(() => {
        if (text.trim().length == 0) {
            Typing(false)
            return
        }
        Typing(true)
    }, [text.trim().length])

    const handleUserKeyPress = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSubmit({ message: text });
            setText('')
        }
    };
    useMemo(() => {
        setTimeout(() => { setHello('Hello') }, 1000);
        setTimeout(() => { setHello2('♪') }, 3000);
        setTimeout(() => { setfade(true) }, 6000);
        setTimeout(() => { setHello('') }, 10000);
    }, [])

    return (
        <div className="flex flex-col border border-b-0 border-rose-950 w-full h-full rounded-xs relative overflow-hidden" >
            <div className="flex flex-row justify-center items-center min-h-12 bg-black p-2.5 border border-l-0 border-r-0 border-t-0 border-b-rose-950">
                {users?.filter(f => f._id == user_to_id)[0] &&
                    <>
                        <div className="fade-in flex justify-start items-center w-8">
                            {!isChatMenu && !isUsersMenu && <><Tooltip className="h-8" anchorSelect="#close" place="right">
                                <p className="md:text-[12px] text-[10px]">Close Chat</p>
                            </Tooltip>
                                <button id='close' onClick={() => [reset(), closeDetail()]} >
                                    <X className="text-zinc-100" />
                                </button></>}
                        </div>
                        <div className="fade-in flex justify-center items-center w-full">
                            <p className="text-[14px] md:text-[16px]">{users?.filter(f => f._id == user_to_id)[0]?.completename}</p>
                        </div>
                        <div className="relative fade-in flex justify-end items-center">
                            <EllipsisVertical onClick={() => isDetail ? [closeDetail(), openInformation(false)] : openDetail()} className="text-zinc-100 cursor-pointer" />
                        </div>
                    </>}
            </div>
            <div className={`relative flex justify-center items-center h-full w-full relative bg-[#060606]`} >
                <Doodle />
                <div className="flex flex-row absolute justify-center items-center ease-in-out animation duration-300 space-x-2"  >
                    <div className="w-[70px]">
                        {hello.trim().length > 0 && <p className={cn("text-sm md:text-2xl ", fade ? 'fade-out' : 'fade-in')}>{hello}</p>}
                    </div>
                    <div className="w-5">
                        {hello2.trim().length > 0 && <p className={cn("text-sm md:text-2xl", fade ? 'fade-out' : 'fade-in')}>{hello2}</p>}
                    </div>
                </div>
                <div onClick={() => closeDetail()} className={cn("absolute flex flex-col-reverse overflow-auto w-full bg-transparent h-full top-0 left-0 ease-in-out animation duration-300 shadow-inner translate-y-full", chat_id.trim().length > 0 && 'translate-y-0')}>
                    <ChatMessage messages={messages} message={message} />
                </div>
                <div className={cn("absolute flex justify-center items-center top-0 right-0 animation duration-300 ", isInformation ? 'md:w-6/12 w-full ' : 'md:w-3/12 w-6/12')} >
                    <div className="flex flex-col relative w-full">
                        <div className={cn("flex ease-in-out animation duration-300 translate-x-full shadow-inner w-full h-50", isDetail && 'translate-x-0 absolute', isInformation && 'h-screen')}>
                            {isInformation ? <ChatInformationUser /> : <ChatDetailsBox />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("flex flex-row relative h-14 w-full bg-black", (user_to_id?.trim().length === 0 || chat_id?.trim().length === 0) && 'border border-t-rose-950 border-l-0 border-r-0 border-b bg-black')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col justify-center w-full top-0 left-0 ease-in-out animation duration-300 translate-y-full ", (user_to_id?.trim().length > 0 || chat_id?.trim().length > 0) && 'translate-y-0')}>
                    <InputChat onKeyDown={handleUserKeyPress} {...register('message', { required: true, onChange: (e) => [setText(e.target.value)] })} className="pe-12 h-full" />
                    <button type="submit"
                        className="hover:border-l-lime-600 hover:border-2 rounded-none w-[58px] border-l-rose-950 absolute  
                        inset-y-0 end-0 flex h-full w-9 items-center justify-center border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Subscribe"><SendHorizonal color="white" size={25} strokeWidth={2} aria-hidden="true" />
                    </button>
                </form>
            </div>
        </div>
    )
}