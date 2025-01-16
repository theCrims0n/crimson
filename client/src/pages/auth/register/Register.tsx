import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../components/ui/input/Input"
import { PasswordInput } from "../../../components/ui/password/Password"
import { useForm } from 'react-hook-form'
import { LoaderCircle } from "lucide-react"
import { useAuthStore } from "../../../store/auth-store"
import validateEmail from "../../../helper/validator"

export const Register = () => {

    const { signup, isLoading, errorMessage } = useAuthStore()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        const { password, confirmPassword, email } = data

        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            setError('email', { type: 'pattern', message: 'Email with invalid format' })
            return
        }

        console.log(password)
        console.log(confirmPassword)
        if (password != confirmPassword) {
            setError('confirmPassword', { type: 'custom', message: 'The two passwords do not match' })
            return
        }
        const result: any = await signup(data)

        if (result.status != 200) {
            return
        }
        navigate('/auth/login')
    }

    return (
        <div className="fade-in flex flex-col items-center justify-center shadow-xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-sm w-screen max-w-2xl min-h-96 min-w-96 border border-zinc-600">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <h1 className="font-bold text-3xl text-zinc-100 title uppercase text-center">Hello!</h1>
                <div className="flex lg:flex-row flex-col lg:space-x-2 xs:space-y-2 lg:space-between">
                    <div className="max-h-16 sm:w-full">
                        <label>Name</label>
                        <Input {...register('name', { required: true })} className={errors.name ? "border-red-500" : ''} placeholder="Enter name" />
                        {errors.name && <span className="text-xs mt-2 text-orange-600 w-full">Name is required</span>}
                    </div>
                    <div className="max-h-16 sm:w-full">
                        <label>Last name</label>
                        <Input {...register('lastname', { required: true })} className={errors.lastname ? "border-red-500" : ''} placeholder="Enter last name" />
                        {errors.lastname && <span className="text-xs mt-2 text-orange-600">Last name is required</span>}
                    </div>
                </div>

                <div className="max-h-16">
                    <label>Email</label>
                    <Input {...register('email', { required: true })} className={errors.email ? "border-red-500" : ''} placeholder="Enter Email" />
                    {errors.email && <span className="text-xs mt-2 text-orange-600">Email is required</span>}
                    {errors.email?.message && <span className="text-xs mt-2 text-orange-600">{`${errors.email.message}`}</span>}
                </div>
                <div className="max-h-16">
                    <label>Password</label>
                    <Input {...register('password', { required: true })} className={errors.password ? "border-red-500" : ''} type="password" placeholder="Enter Password" />
                    {errors.password && <span className="text-xs mt-2 text-orange-600">Password is required</span>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <PasswordInput {...register('confirmPassword', { required: true })} className={errors.confirmPassword ? "border-red-500" : ''} type="password" />
                    {errors.confirmPassword && <span className="text-xs mt-2 text-orange-600">{`${errors.confirmPassword.message}`}</span>}
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
                        : 'Register'
                }</button>
                {errorMessage?.trim().length > 0 && <span className="text-xs m-2 text-orange-600 ">{errorMessage}</span>}
            </form>
            <p className="text-xs !mt-4 ">Already have an account?
                <Link to={'/auth/login'} className="hover:underline"> Login</Link>
            </p>
        </div>
    )
}