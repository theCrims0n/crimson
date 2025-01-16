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
        <motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.2, ease: 'easeInOut' }
        }}>
            <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
                <div className="flex h-full flex-wrap items-center justify-center lg:justify-between md:space-y-4">
                    <div className="flex items-center justify-center shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
                        <img className="lg:h-36 lg:w-96 sm:h-36 sm:w-96 fade-in max-w-96 fade-in" src="/crimson.png" />
                    </div>
                    <div className="md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">
                        <div className="flex flex-row items-center justify-center lg:justify-start ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}