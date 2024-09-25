import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Options from "../../helpers/interface/types"

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MyChart: React.FC = () => {
    // Example data
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0],  // Example data to match the spike in the chart
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 5,
                fill: true, // You can make it a filled line chart
                pointRadius: 0,
            },
        ],
    };

    const options: Options = {
        responsive: true,
        maintainAspectRatio: false, // Allow custom sizing
        plugins: {
            legend: {
                display: false, // Completely remove the legend
            },
            title: {
                display: true,
                text: 'Client Count', // Title text
                align: 'center', // Align the title to center
                font: {
                    size: 18, // Customize font size
                    weight: 'bold',
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Ensure Y-axis starts from zero
            },
        },
    };

    return (
        <div
            style={{
                width: '350px',
                height: '300px',
                marginTop: '70px',
                // margin: '0 auto', // Center the chart
                backgroundColor: 'white', // Set background color to white
                borderRadius: '10px', // Add rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                padding: '20px', // Add padding to create space around the chart
            }}
        >
            <Line data={data} options={options} />
        </div>
    );
};

export default MyChart;
