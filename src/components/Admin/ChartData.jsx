import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../helpers/api/baseUrl';
import { Adminconfig } from '../../helpers/token/admintoken';

// Asosiy `dataBar` obyekti (bo'sh holatda)
export const dataBar = {
    labels: [], // Stadion nomlari (API dan keladigan sana)
    datasets: [
        {
            label: 'Quantity',
            data: [], // Bron ma'lumotlari
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }
    ]
};

const Dashboard = () => {
    const [chartData, setChartData] = useState(dataBar);

    // API ma'lumotlarini olish funksiyasi
    function fetchChartData() {
        axios.get(`${baseUrl}order/stadion-statistika/`, Adminconfig())
            .then(res => {
                const dates = res.data.date; // API dan olingan "date"
                const brons = res.data.bron; // API dan olingan "bron"

                // `dataBar` ni yangilash
                setChartData({
                    labels: dates, // Sana ma'lumotlarini o'z ichiga oladi
                    datasets: [
                        {
                            label: 'Quantity',
                            data: brons, // Bron ma'lumotlarini o'z ichiga oladi
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            })
            .catch(err => console.error("API xatolik:", err));
    }

    // Ma'lumotlarni yuklash uchun `useEffect`
    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <div className="p-8 grow dark:bg-gray-900">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-4">Product Data</h3>
                <Line data={chartData} /> {/* Yangilangan `chartData`ni foydalaning */}
            </div>
        </div>
    );
};

export default Dashboard;

   
