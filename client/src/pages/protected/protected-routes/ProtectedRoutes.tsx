import { useEffect } from "react"
import { Footer } from "../../../components/ui/footer/Footer"
import { Header } from "../../../components/ui/header/Header"
import { useAuthStore } from "../../../store/auth-store"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { useUIStore } from "../../../store/ui/sidebar-store"
import { Sidebar } from "../../../components/ui/sidebar/SideBar"
import { LoaderCircle } from "lucide-react"
export const ProtectedRoutes = () => {

    const { isAuthentic, veryfy, isLoading } = useAuthStore()
    const { closeSideMenu } = useUIStore()
    const navigate = useNavigate()

    useEffect(() => {
        veryfy()
        if (!isAuthentic) {
            closeSideMenu()
        }
    }, [isAuthentic, navigate])

    if (!isAuthentic) {
        return (
            <Navigate to={'/auth/login'} />
        )
    }

    return (
        <div className="flex flex-col h-screen justify-between" >
            <Header />
            <Sidebar />
            <main className="mb-auto flex-grow" onClick={closeSideMenu}>
                {isLoading ?
                    <div className="w-full h-full flex justify-center place-items-center">
                        <LoaderCircle
                            className="-ms-1 me-2 animate-spin"
                            size={40}
                            strokeWidth={2}
                            aria-hidden="true"
                            color="white"
                        />
                    </div>
                    : <Outlet />}
            </main>
            <Footer />
        </div>
    )
}