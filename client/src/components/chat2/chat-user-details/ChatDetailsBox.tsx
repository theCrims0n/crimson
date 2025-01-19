import { useUIStore } from "../../../store/ui/sidebar-store"

export const ChatDetailsBox = () => {

    const { openInformation, closeDetail } = useUIStore()

    return (
        <div className="flex flex-col w-full h-full bg-black border border-l-rose-950 border-r-0 border-t-0 border-b-0">
            <ul className="[&>*]:cursor-pointer [&>*]:text-[12px] [&>*]:p-4 [&>*]:border [&>*]:border-t-0 [&>*]:border-l-0 [&>*]:border-r-0 [&>*]:border-b-rose-950">
                <li onClick={() => openInformation(true)}><p>Information</p></li>
                <li><p>Mute</p></li>
                <li><p>Block</p></li>
                <li><p>Report</p></li>
            </ul>
        </div>
    )
}