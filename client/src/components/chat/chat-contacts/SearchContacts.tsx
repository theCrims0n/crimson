import { useUIStore } from "../../../store/ui/sidebar-store"
import { useAuthStore } from "../../../store/auth-store"
import { useChatStore } from "../../../store/chat-store"
import { Spinner } from "../../ui/spinner/Spinner"
import { Windows_Dimensions } from "../../../components/ui/windows-dimensions/windows-dimensions"
import { cn } from "../../../lib/utils"

export const SearchContacts = () => {

    const { contacts, getSocket_To, user_to, isLoadingContacts, getAllMessages } = useChatStore()
    const { isContactsOpen } = useUIStore()
    const { user }: any = useAuthStore()

    const windowDimensions = Windows_Dimensions()

    return (
        <>
            <div className={`bg-zinc-950 flex flex-col top-0 left-0 w-full ${windowDimensions?.width > 1000 ? 'h-full' : ''} ease-in-out duration-300 shadow-inner
            ${isContactsOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {isLoadingContacts ? <Spinner /> :
                    contacts?.filter(f => f._id != user._id)?.map((contact, index) => {
                        return (
                            <div key={index} onClick={() => contact.chat_id ? getAllMessages(contact.chat_id, contact._id) : getSocket_To(contact._id)} className={`cursor-pointer border-b border-zinc-500 flex flex-row h-14 w-full hover:bg-zinc-900 justify-start items-center ${contact._id == user_to ? 'bg-zinc-900' : ''}`}>
                                <div className="flex flex-row w-full justify-start items-center m-2 space-x-2">
                                    <div className={cn("inline-flex items-center justify-center min-w-[5px] min-h-[5px] overflow-hidden bg-green rounded-full", contact.socket_id && 'dark:bg-green-500')} />
                                    <div className="inline-flex items-center justify-center w-8 h-7 overflow-hidden bg-black rounded-full dark:bg-zinc-950">
                                        <span className="font-bold text-[10px] text-gray-100 dark:text-gray-100 uppercase tracking-[.10em]">{contact.name[0] + contact.lastname[0]}</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-100 text-start">{contact.email}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}