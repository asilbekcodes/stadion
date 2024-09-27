import { swaggerUrl } from '@/helpers/api/swagger-url';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login(): JSX.Element {
    const isRole = useNavigate()

    const userName = useRef<HTMLInputElement>(null)
    const parol = useRef<HTMLInputElement>(null)

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


    const signIn = async (credentials:{phone: string, password: string}) =>{
        const response = await axios.post(swaggerUrl + 'api/v1/auth/login', credentials)
        return response.data
    }

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: (data: AxiosResponse) => {
            localStorage.setItem('token', data.data.token)
            if (data.data.role == "ROLE_SUPER_ADMIN") {
                isRole('/sadmin/sadmindashboard')
            }
        },
        onError: (error: AxiosError) => {
            toast.error(error.message)
        }
    })
    
    const getLogin = () => {
        const phone = userName.current?.value ||'';
        const password = parol.current?.value ||'';
        if (phone && password) {
            mutation.mutate({phone, password})
        }
    }

    return (
        <div className='bg-[#f1f3f5] w-[100%] h-[100vh]'>
            <div className='relative flex items-center justify-center top-24 container mx-auto'>
                <div className='w-[500px] h-[360px] border shadow-xl border-gray-300 border-solid rounded-xl px-20 bg-white'>
                    <div className='py-5 space-y-2'>
                        <h1 className="text-xl font-bold">Sign in</h1>
                        <p className="text-[12px] text-gray-600 font-medium">Login to website if you can because we don't have a login flow yet</p>
                    </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <label htmlFor="phone-input" className="block mb-2 text-[12px] font-semibold text-gray-900">Phone Number</label>
                                <input 
                                    placeholder='Enter Phone Number' 
                                    type="text" 
                                    id="phone-input" 
                                    className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500" 
                                    disabled={mutation.status === 'pending'}
                                    // value={phone}
                                    // onChange={(e) => setPhone(e.target.value)}
                                    ref={userName}
                                />
                            </div>
                            <div>
                                <label htmlFor="password-input" className="block mb-2 text-[12px] font-semibold text-gray-900">Password</label>
                                <input 
                                    placeholder='Enter Password' 
                                    type="password" 
                                    id="password-input" 
                                    className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500" 
                                    disabled={mutation.status === 'pending'} 
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    ref={parol}
                                />
                            </div>
                            <button 
                                onClick={getLogin}
                                type="submit"  
                                className='bg-gradient-to-br from-black to-gray-600 btn w-[350px] rounded-lg text-white py-2 border'
                                disabled={mutation.status === 'pending'}
                            >
                                {mutation.status === 'pending' ? 'Signing in...' : 'Sign In'}
                                {/* Sign in */}
                            </button>
                            {/* {mutation.error && <p className="text-red-500 text-sm mt-2">Error: {mutation.error.message}</p>}
                            {mutation.isSuccess && <p className="text-green-500 text-sm mt-2">Login Successful!</p>} */}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Login;





