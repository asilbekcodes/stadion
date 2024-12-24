import React, { useState } from 'react';
import Layout from './Layout';

const Money = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    // Haftalik daromad
    const weeklyData = [
        { day: 'Dushanba', amount: 100 },
        { day: 'Seshanba', amount: 120 },
        { day: 'Chorshanba', amount: 90 },
        { day: 'Payshanba', amount: 110 },
        { day: 'Juma', amount: 130 },
        { day: 'Shanba', amount: 150 },
        { day: 'Yakshanba', amount: 80 },
    ];

    // Oylik daromad (30 kun uchun)
    const monthlyData = Array.from({ length: 30 }, (_, i) => ({
        day: `Kun ${i + 1}`,
        amount: Math.floor(Math.random() * 150) + 50, // Tasodifiy summalar
    }));

    // Haftalik daromadni ko'rsatish
    const showWeekly = () => {
        setData(weeklyData);
        setTotal(weeklyData.reduce((sum, item) => sum + item.amount, 0));
    };

    // Oylik daromadni ko'rsatish
    const showMonthly = () => {
        setData(monthlyData);
        setTotal(monthlyData.reduce((sum, item) => sum + item.amount, 0));
    };

    return (
        <div >
            <Layout>
                <div className="p-6 py-10 bg-slate-900 flex flex-col sm:flex-row gap-3 justify-between ">
                    <div className='flex gap-3'>
                        <button
                            onClick={showWeekly}
                            className="p-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                        >
                            Haftalik daromad
                        </button>
                        <button
                            onClick={showMonthly}
                            className="p-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                        >
                            Oylik daromad
                        </button>
                    </div>
                    <input type='text' className=' p-2 w-96  rounded-lg text-black' placeholder='Kun bo`yicha qidiruv' />
                </div>

                {/* Jadval */}
                {data.length > 0 && (
                    <div className="p-6 bg-slate-900">
                        <table className="w-full  bg-slate-700 border-collapse border border-gray-300 text-sm sm:text-base">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2  text-left">Kun</th>
                                    <th className="border border-gray-300 px-4 py-2  text-left">Daromad (so'm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{item.day}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Jami</td>
                                    <td className="border border-gray-300 px-4 py-2 font-bold">{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default Money;
