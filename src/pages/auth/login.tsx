import { swaggerUrl } from '@/helpers/api/swagger-url';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

function Login(): JSX.Element {
    const navigate = useNavigate()

    const userName = useRef<HTMLInputElement>(null)
    const parol = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false);


    // interface User {
    //     phone: string,
    //     password: string,
    // }
    // function getLogin(): void {
    //     let user: User = {
    //         "phone": userName.current?.value || '',
    //         "password": parol.current?.value || '',
    //     }
    //     console.log(user);
    //     if (userName.current?.value && parol.current?.value) {
    //         axios.post(swaggerUrl + 'api/v1/auth/login', user)
    //             .then((res: AxiosResponse) => {
    //                 console.log(res)
    //                 if (res.data.data) {
    //                     console.log(res.data.data.role);
    //                     if (res.data.data.role == "ROLE_SUPER_ADMIN") {
    //                         localStorage.setItem('token', res.data.data.token)
    //                         isRole('/sadmin/sadmindashboard')
    //                     }
    //                 } else {
    //                     toast.error(res.data.error.message)
    //                 }
    //             }
    //             )
    //             .catch((err: AxiosError) => {
    //                 console.log(err)
    //                 toast.error(err.message)
    //             })
    //     } else {
    //         toast.warning('joylarni tuldiring')
    //     }
    // }

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    const signIn = async (credentials: { phone: string, password: string }) => {
        const response = await axios.post(swaggerUrl + 'api/v1/auth/login', credentials)
        return response.data
    }

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: (data: AxiosResponse) => {
            localStorage.setItem('token', data.data.token)
            if (data.data.role == "ROLE_SUPER_ADMIN") {
                toast.success('Login Successful!')
                navigate('/sadmin/sadmindashboard')
            }
        },
        onError: (error: AxiosError) => {
            toast.error(error.message)
        }
    })

    const getLogin = () => {
        const phone = userName.current?.value || '';
        const password = parol.current?.value || '';
        if (phone && password) {
            mutation.mutate({ phone, password })
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-xl dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-1 md:space-y-3 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <p className="text-[14px] text-gray-600 font-medium">Login to website if you can because we don't have a login flow yet</p>
                        {mutation.error?.message && <div className="text-red-500">{mutation.error?.message}</div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={getLogin}>
                            <div className='mt-7'>
                                <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Phone Number</label>
                                <input
                                    type="text"
                                    ref={userName}
                                    name="phone"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        ref={parol}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <IoEyeOff />
                                        ) : (
                                            <IoEye />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-br from-black to-gray-600 btn rounded-lg text-white py-2 border">
                                {mutation.status === 'pending' ? 'Signing in...' : 'Sign in'}
                                {mutation.error?.message && <p className="text-red-500 text-sm mt-2">Error: {mutation.error?.message}</p>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;





