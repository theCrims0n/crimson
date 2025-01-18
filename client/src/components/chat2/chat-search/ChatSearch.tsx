import { Search, X } from "lucide-react"
import { Input } from "../../../components/ui/input/Input"
import { useChatStore2 } from "../../../store/chat-store2"
import { cn } from "../../../lib/utils"
import { useEffect, useState } from "react"
interface Props {
    type: number
}
export const ChatSearch = ({ type }: Props) => {
    const { search } = useChatStore2()
    const [text, setText] = useState('')

    useEffect(() => {
        search(text, type)
    }, [text])

    return (
        <div className="relative flex flex-row  justify-start items-center w-full ">
            <Input value={text} id="search" placeholder={cn("Search", type === 1 ? 'users...' : 'chats...')} onChange={(e) => setText(e.target.value)} className="rounded-xs h-12 pl-12 
            border border-t-0 border-r-0 focus:border" />
            <button className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear input" onClick={() => setText('')}>
                <X className="text-zinc-300" size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            <Search color="white" className="absolute start-3  outline-offset-2 " />
        </div>
    )
}