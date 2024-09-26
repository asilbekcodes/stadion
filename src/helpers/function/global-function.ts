import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';

export interface useGlobalTypes<T> {
    loading: boolean;
    error: Error | null;
    response: T | undefined | string | null;   
    globalDataFunc: () => void;
}

export function useGlobalFunction<T>(
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data?: T,
    config?: any
): useGlobalTypes<T> {
    const mutation = useMutation({
        mutationFn: async () => {
            let res;
            switch (method) {
                case 'get':
                    res = await axios.get(url, config || {});
                    break;
                case 'post':
                    res = await axios.post(url, data || {}, config || {});
                    break;
                case 'put':
                    res = await axios.put(url, data || {}, config || {});
                    break;
                case 'delete':
                    res = await axios.delete(url, config || {});
                    break;
                default:
                    throw new Error('Invalid method');
            }
            console.log('Axios response:', res); // Javobni konsolga chiqaramiz

            if (res.data.error) {
                if (method !== 'get') {
                    toast.error(res.data.message);
                } else {
                    return '';
                }
            }
            return res.data.data; // 'data' ichidagi 'data'ni qaytaramiz
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('Backend response:', data); // Backend'dan kelgan 'data'ni konsolga chiqaramiz

            // Login muvaffaqiyatli bo'lsa, tokenni saqlash
            if (method === 'post' && url.includes('login')) {
                if (data.token) {
                    localStorage.setItem('token', data.token); // tokenni localStorage'ga saqlaymiz
                    toast.success('Login Successful!');
                } else {
                    console.error('Token is not available in the response');
                }
            }
        }
    });

    return {
        loading: mutation.status === 'pending',
        error: mutation.error,
        response: mutation.data,
        globalDataFunc: mutation.mutateAsync
    };
}


