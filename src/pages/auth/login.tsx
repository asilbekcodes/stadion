import { swaggerUrl } from '@/helpers/api/swagger-url';
import { useGlobalFunction } from '@/helpers/function/global-function';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { loading, error, response, globalDataFunc } = useGlobalFunction(
        `${swaggerUrl}api/v1/auth/login`, 
        'post', 
        { phone, password },
    );


    const handleSubmit = async () => {
        if (phone && password) {
            try {
                await globalDataFunc(); // Loginni chaqiramiz
                navigate('/sadmin/sadmindashboard'); // Muvaffaqiyatli login bo'lsa, navigatsiya
            } catch (error) {
                console.error('Login error', error);
            }
        }
    };

    return (
        <div>
            <div className='relative flex items-center justify-center top-24 container mx-auto'>
                <div className='w-[500px] h-[360px] border shadow-xl border-gray-300 border-solid rounded-xl px-20'>
                    <div className='py-5 space-y-2'>
                        <h1 className="text-xl font-bold">Login</h1>
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
                                    disabled={loading}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password-input" className="block mb-2 text-[12px] font-semibold text-gray-900">Password</label>
                                <input 
                                    placeholder='Enter Password' 
                                    type="password" 
                                    id="password-input" 
                                    className="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500" 
                                    disabled={loading} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleSubmit}
                                type="submit"  
                                className='bg-gradient-to-br from-black to-gray-600 btn w-[350px] rounded-lg text-white py-2 border'
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
                            {response && <p className="text-green-500 text-sm mt-2">Login Successful!</p>}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
