import { useAuthStore } from "../../../store/auth-store"
import { cn } from "../../../lib/utils"
import { useChatStore } from "../../../store/chat-store"

interface Props {
    allMessages: any[]
}
export const ChatMessages = ({ allMessages }: Props) => {

    const { user }: any = useAuthStore()

    const { isTyping, user_to, noticeChat_id, chat_id, currentChat_Id } = useChatStore()

    const formattedTime = (date: Date) => {
        const time = new Date(date)
        const timeArray = [time.getHours(), time.getMinutes()]
        return `${timeArray[0]?.toString().padStart(2, '0')}:${timeArray[1]?.toString().padStart(2, '0')}`;
    }

    return (
        <>
            <div className={cn("absolute  overflow-auto bg-zinc-950 flex flex-col-reverse  top-0 left-0 w-full h-full ease-in-out duration-300 shadow-inner",
                allMessages.length > 0 && allMessages[0]?.chat_id == currentChat_Id ? "translate-x-0" : '-translate-x-full')}>
                <div className={cn(`w-40 flex justify-start animation duration-300 ml-1 mb-1 h-0 `, isTyping && chat_id == noticeChat_id && 'h-8 animation duration-300 mb-1')} >
                    <div className={`bg-zinc-800 border border-zinc-600 rounded-md rounded-tl-none px-4 py-2 m-1  line-clamp overflow-hidden`}>
                        <div className='flex space-x-2 justify-center items-center'>
                            <div className='h-[5px] w-[5px] bg-zinc-100 rounded-full animate-bounce [animation-delay:-0.3s]' />
                            <div className='h-[5px] w-[5px] bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]' />
                            <div className='h-[5px] w-[5px] bg-zinc-300 rounded-full animate-bounce' />
                        </div>
                    </div>
                </div>
                {allMessages[0]?.chat_id == currentChat_Id && allMessages?.map((data: any, index: number) => {
                    const { message, date, user_id } = data
                    return (
                        <div key={index} className={`flex ${user_id == user._id ? 'justify-end ' : 'justify-start'} content-fit  m-1`} >
                            <div className={`max-w-[60%] bg-zinc-800 border border-zinc-600 rounded-md  ${user_id == user._id ? 'rounded-tr-none' : 'rounded-tl-none'} px-4 py-2 m-1  line-clamp overflow-hidden`}>
                                <p className="text-zinc-100 text-[12px] font-normal w-full line-clamp break-words" >{message}</p>
                                <div className="flex justify-end">
                                    <p className="text-gray-400 text-[10px] w-full flex justify-end mt-1 mr-1" >{formattedTime(date)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {allMessages.length == 0 && <div className="fade-in flex justify-center items-center h-full w-full">
                <p className="text-xl font-bold">{user_to?.trim().length > 0 ? 'Ok, type and enjoy' : 'Start a new chat or retake an old chat'}</p>
            </div>}
        </>
    )
}