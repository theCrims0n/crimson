import { X } from "lucide-react"
import { useUIStore } from "../../../store/ui/sidebar-store"

export const ChatInformationUser = () => {
    const { closeDetail, openInformation } = useUIStore()
    return (
        <div className="flex flex-col w-full h-full bg-black border border-l-rose-950 border-r-0 border-t-0 border-b-0">
            <ul className="[&>*]:text-[12px] [&>*]:p-4 [&>*]:border [&>*]:border-t-0 [&>*]:border-l-0 [&>*]:border-r-0 [&>*]:border-b-rose-950">
                <div className="flex justify-start items-center">
                    <button onClick={() => [setTimeout(() => {
                        openInformation(false)
                    }, 300), closeDetail()]}><X size={20} color='white' /></button>
                </div>
                <li><p>Name</p></li>
                <li><p>Last name</p></li>
                <li><p>Email</p></li>
            </ul>
        </div>
    )
}