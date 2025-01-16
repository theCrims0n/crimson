import { Link } from "react-router-dom";
import { useUIStore } from "../../../store/ui/sidebar-store";
import { ChevronLeft, Mail, User } from "lucide-react";

export const Sidebar = () => {

    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    return (
        <div>
            <nav className={`fixed bg-zinc-800 h-full z-40 top-0 left-0 w-[20svh] ease-in-out duration-300 shadow-inner
                ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col w-full h-28">
                    <ChevronLeft
                        id='closemenu'
                        size={25} color="gray"
                        className="absolute top-8 right-4 cursor-pointer focus:outline-none"
                        onClick={() => closeSideMenu()}
                    />
                </div>
                <div className="flex flex-col">
                        <ul className="flex justify-start flex-col items-center pb-5 space-y-2">
                            <li className="flex justify-start items-center space-x-6 hover:text-white focus:bg-zinc-700 focus:text-white hover:bg-zinc-700 text-zinc-400 rounded px-3 py-2 w-11/12">
                                <p className="text-sm">Users</p>
                            </li>
                            <li className="flex justify-start items-center space-x-6 hover:text-white focus:bg-zinc-700 focus:text-white hover:bg-zinc-700 text-zinc-400 rounded px-3 py-2 w-11/12">
                                <p className="text-sm">Teams</p>
                            </li>
                        </ul>
                </div>
            </nav>
        </div>
    )
}