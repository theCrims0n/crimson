import { Link } from "react-router-dom"
import { useAuthStore } from "../../../store/auth-store"
import { useEffect, useRef, useState } from "react"
import { CircleHelp, InboxIcon, LogOut, Menu, User, UserRoundPen } from "lucide-react"
import { useUIStore } from "../../../store/ui/sidebar-store"

export const Header = () => {
    const { logout, user } = useAuthStore()
    const { openSideMenu, closeSideMenu } = useUIStore()
    const ref: any = useRef(null)
    const [open, setOpen] = useState(true)
    const handleOpen = () => {
        setOpen(!open)
    }

    const { name = '', lastname = '' }: any = user

    useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <nav className="bg-zinc-900 rounded-md h-14 w-screen flex items-center justify-between">
            <div className="flex justify-start items-center pl-6">
                <button onClick={openSideMenu}>
                    <Menu color="white" />
                </button>
                <Link className="pl-8" to={'/'}><img className="fade-in h-8 w-25" src="/crimson.png" /></Link>
            </div>
            <div className="flex justify-end">
                <div ref={ref} className="relative ">
                    <div className="flex justify-end pr-6 ">
                        <button onClick={() => [handleOpen(), closeSideMenu()]} type="button" className="flex rounded-full text-sm focus:border-zinc-900" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full hover:bg-zinc-900 bg-zinc-950">
                                <span className="text-gray-100 dark:text-gray-100 uppercase font-bold tracking-[.10em]">{name[0] + lastname[0]}</span>
                            </div>
                        </button>
                    </div>
                    <div className="mr-52">
                        <menu
                            hidden={open}
                            data-popover="profile-menu"
                            data-popover-placement="bottom"
                            className="absolute m-2 mr-28 z-10 min-w-[180px] overflow-auto rounded-lg border border-rose-950 bg-zinc-900 p-1.5 shadow-lg shadow-sm focus:outline-none"
                        >
                            <Link to='/profile' onClick={handleOpen}
                                role="menuitem"
                                className="cursor-pointer  flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-zinc-800 focus:bg-zinc-100 active:bg-zinc-100"
                            >
                                <User color="white" size={20} />
                                <p className="text-xs ml-2">
                                    My Profile
                                </p>
                            </Link>
                            <Link
                                to='/profile/edit' onClick={handleOpen}
                                role="menuitem"
                                className="cursor-pointer  flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-zinc-800 focus:bg-zinc-100 active:bg-zinc-100"
                            >
                                <UserRoundPen color="white" size={20} />
                                <p className=" text-xs ml-2">
                                    Edit Profile
                                </p>
                            </Link>
                            <Link
                                onClick={handleOpen}
                                to='/chat'
                                role="menuitem"
                                className="cursor-pointer  flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-zinc-800 focus:bg-zinc-100 active:bg-zinc-100"
                            >
                                <InboxIcon color="white" size={20} />
                                <p className=" text-xs ml-2">
                                    Inbox
                                </p>
                            </Link>
                            <Link
                                to='/'
                                role="menuitem"
                                className="cursor-pointer  flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-zinc-800 focus:bg-zinc-100 active:bg-zinc-100"
                            >
                                <CircleHelp color="white" size={20} />
                                <p className=" text-xs ml-2">
                                    Help
                                </p>
                            </Link>
                            <hr className="my-2 border-rose-950" role="menuitem" />
                            <button
                                onClick={() => [logout(), handleOpen()]}
                                role="menuitem"
                                className="cursor-pointer  flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-zinc-800 focus:bg-zinc-100 active:bg-zinc-100"
                            >
                                <LogOut color="white" size={20} />
                                <p className=" text-xs ml-2">
                                    Log Out
                                </p>
                            </button>
                        </menu>
                    </div>
                </div>
            </div>
        </nav>
    )
}