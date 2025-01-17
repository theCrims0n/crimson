import { EllipsisVertical, MessageSquare, SendHorizonal, X } from "lucide-react"
import { InputChat } from "../../../components/ui/input-chat/InputChat"
import { ChatMessage } from "../chat-messages/ChatMessages"
import { useChatStore2 } from "../../../store/chat-store2"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { cn } from "../../../lib/utils"
import { Doodle } from "../../doodle/Doodle"
import { Tooltip } from 'react-tooltip'

export const ChatForm = () => {
    const { register, handleSubmit, resetField } = useForm()
    const { messages, sendMessage, socket_to, message, getMessage, Typing, setLastMessages, chat_id, users, user_to_id, reset } = useChatStore2()
    const [text, setText] = useState('')

    const onSubmit = ({ message }: any) => {
        if (message.trim().length == 0) return
        sendMessage(message)
        setLastMessages()
        resetField('message')
    }

    useEffect(() => {
        getMessage()
    }, [])

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

    return (
        <div className="flex flex-col border border-b-0 border-zinc-600 w-full h-full rounded-xs relative overflow-hidden" >
            <div className="flex flex-row justify-center items-center min-h-12 bg-black p-2.5 border border-l-0 border-r-0 border-t-0 border-b-zinc-600">
                {users?.filter(f => f._id == user_to_id)[0] &&
                    <>
                        <div className="flex justify-start items-center">
                            <Tooltip className="h-8" anchorSelect="#close" place="right">
                                <p className="md:text-[12px] text-[10px]">Close Chat</p>
                            </Tooltip>
                            <button id='close' onClick={() => reset()} >
                                <X className="text-zinc-100" />
                            </button>
                        </div>
                        <div className="fade-in flex justify-center items-center w-full">
                            <p className="text-[14px] md:text-[16px]">{users?.filter(f => f._id == user_to_id)[0]?.completename}</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <EllipsisVertical className="text-zinc-100" />
                        </div>
                    </>}
            </div>
            <div className={`flex justify-center items-center h-full w-full relative bg-black`}>
                <Doodle />
                <div className={cn("absolute flex flex-col-reverse overflow-auto w-full bg-transparent h-full top-0 left-0 ease-in-out animation duration-300 shadow-inner translate-y-full", chat_id.trim().length > 0 && 'translate-y-0')}>
                    <ChatMessage messages={messages} message={message} />
                </div>
            </div>
            <div className="flex flex-row relative h-14 w-full bg-black">
                <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col justify-center w-full top-0 left-0 ease-in-out animation duration-300 translate-y-full ", (user_to_id?.trim().length > 0 || chat_id?.trim().length > 0) && 'translate-y-0')}>
                    <InputChat onKeyDown={handleUserKeyPress} {...register('message', { required: true, onChange: (e) => [setText(e.target.value)] })} className="pe-12 h-full border border-l-0 border-r-0 focus:border " />
                    <button type="submit"
                        className="hover:border-l-lime-600 hover:border-2 rounded-none w-[58px] border-l-zinc-600 absolute  
                        inset-y-0 end-0 flex h-full w-9 items-center justify-center border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Subscribe"><SendHorizonal color="white" size={25} strokeWidth={2} aria-hidden="true" />
                    </button>
                </form>
            </div>
        </div>
    )
}