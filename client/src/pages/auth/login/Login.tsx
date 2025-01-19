import { Link } from "react-router-dom"
import { Input } from "../../../components/ui/input/Input"
import { useAuthStore } from "../../../store/auth-store"
import { useForm } from 'react-hook-form'
import { LoaderCircle } from "lucide-react"

export const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const { login, isLoading, errorMessage } = useAuthStore()

    const onSubmit = async (data: any) => {
        await login(data)
    }

    return (
        <div className="fade-in flex flex-col items-center justify-center shadow-xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-sm w-screen max-w-2xl min-h-96 min-w-96 border border-rose-950">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                <h1 className="font-bold text-3xl text-zinc-100 title uppercase text-center">Welcome back</h1>
                <div className="max-h-16">
                    <label >Email</label>
                    <Input {...register('email', { required: true })} className={errors.email ? "border-red-500" : ''} placeholder="Enter Email" />
                    {errors.email && <span className="text-xs mt-2 text-orange-600">Email is required</span>}
                </div>
                <div className="max-h-16">
                    <label >Password</label>
                    <Input {...register('password', { required: true })} className={errors.password ? "border-red-500" : ''} placeholder="Enter Password" />
                    {errors.password && <span className="text-xs mt-2 text-orange-600">Password is required</span>}
                </div>
                <button disabled={isSubmitting} className="button w-full justify-center flex" type="submit">{
                    isSubmitting
                        ?
                        <LoaderCircle
                            className="-ms-1 me-2 animate-spin"
                            size={20}
                            strokeWidth={2}
                            aria-hidden="true"
                            color="white"
                        />
                        : 'Login'
                }</button>
                {errorMessage.trim().length > 0 && <span className="text-xs m-2 text-orange-600 ">{errorMessage}</span>}
            </form>
            <p className="text-xs !mt-4 ">Don't have an account?
                <Link to={'/auth/register'} className="hover:underline"> Register here and live this new experience</Link>
            </p>
        </div>
    )
}
