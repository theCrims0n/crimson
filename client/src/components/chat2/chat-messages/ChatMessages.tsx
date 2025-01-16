import { useEffect } from "react";
import { cn } from "../../../lib/utils";
import { useAuthStore } from "../../../store/auth-store";
import { useChatStore2 } from "../../../store/chat-store2";
import { Check, CheckCheck } from "lucide-react";

interface Props {
    messages: any[]
    message: Object;
}

export const ChatMessage = ({ messages, message }: Props) => {

    const { user }: any = useAuthStore()

    const { current_chat_id, isTyping, chat_id, chat_typing, socket_to }: any = useChatStore2()

    const { message: chat, user_id, chat_id: chat_id_message }: any = message

    const addMessage = () => {

        const element = document.getElementById('messages');

        const htmlString =
            `            
              <div class='flex flex-col justify-center content-fit m-1 ${user._id == user_id ? 'items-end' : 'items-start'}'>
                 <div class='flex flex-col max-w-[50%] w-auto min-w-40 min-h-[40px] bg-zinc-800 bg-opacity-75 border border-zinc-600 rounded-md py-2 m-1 line-clamp overflow-hidden ${user._id == user_id ? 'rounded-tr-none' : 'rounded-tl-none'} '>
                      <p class=" text-zinc-100 text-[10px] md:text-[12px] w-full font-normal line-clamp break-words pr-2 pl-2">${chat}</p>
                       <div class="flex justify-end items-center">
                          <div class='flex h-[4px] pb-1 pr-1'>
                            <p class="text-zinc-300 text-[9px] w-full" >${new Date(Date.now()).toLocaleString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}</p>
                            ${socket_to ? '<CheckCheck size={12} class="text-zinc-300" />' : '<Check size={12} class="text-zinc-300" />'}
                          </div>
                      </div>
                  </div>
              </div>`;
        element?.insertAdjacentHTML('beforeend', htmlString);
    }

    useEffect(() => {
        if (current_chat_id != chat_id_message || chat?.trim().length == 0) { return }
        addMessage()
    }, [message])

    return (
        <>
            {chat_id.trim().length > 0 && <><div className={cn(`w-40 flex justify-start animation duration-300 ml-1 mb-1 h-0 `, isTyping && (chat_typing === current_chat_id) && 'absolute h-8 animation duration-300 mb-1')} >
                <div className={`bg-zinc-800 border border-zinc-600 rounded-md rounded-tl-none px-4 py-2 m-1  line-clamp overflow-hidden`}>
                    <div className='flex space-x-2 justify-center items-center'>
                        <div className='h-[5px] w-[5px] bg-zinc-100 rounded-full animate-bounce [animation-delay:-0.3s]' />
                        <div className='h-[5px] w-[5px] bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]' />
                        <div className='h-[5px] w-[5px] bg-zinc-300 rounded-full animate-bounce' />
                    </div>
                </div>
            </div>
                <div id='messages' className={cn('animation duration-300', isTyping && 'pb-8 ')}></div>
                {messages?.map((data, index) => {
                    const { message, user_id, date } = data
                    return (
                        <div key={index} className={cn('flex flex-col justify-center content-fit m-1 ', user._id == user_id ? 'items-end' : 'items-start')}>
                            <div className={cn('flex flex-col max-w-[50%] w-auto min-w-40 min-h-[40px] bg-zinc-800 bg-opacity-75 border border-zinc-600 rounded-md py-2 m-1 line-clamp overflow-hidden', user._id == user_id ? 'rounded-tr-none' : 'rounded-tl-none')}>
                                <p className=" text-zinc-100 text-[10px] md:text-[12px] w-full font-normal line-clamp break-words pr-2 pl-2">{message}</p>
                                <div className="flex justify-end items-center">
                                    <div className='flex h-[4px] pb-1 pr-1'>
                                        <p className="text-zinc-300 text-[9px] w-full" >{new Date(date).toLocaleString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}</p>
                                        {socket_to ? <CheckCheck size={12} className="text-zinc-300" /> : <Check size={12} className="text-zinc-300" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>}
        </>
    )
}