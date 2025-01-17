import { useAuthStore } from "../../../store/auth-store"
import { Navigate, Outlet } from "react-router-dom"
import { motion } from 'framer-motion'

export const AuthProtected = () => {

    const { isAuthentic } = useAuthStore()

    if (isAuthentic) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
        <motion.div className="flex justify-center items-center" initial={{ opacity: 0 }} animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.2, ease: 'easeInOut' }
        }}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 justify-center items-center min-h-screen min-w-screen min-w-80">
                <div className="flex justify-center items-center m-1 w-full">
                    <img className="fade-in max-w-80 w-full" src="/crimson.png" />
                </div>
                <div className="flex justify-center items-center">
                    <Outlet />
                </div>
            </div>
        </motion.div>
    )
}