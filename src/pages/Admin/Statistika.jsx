import React, { useState } from "react";
import Layout from "../../components/Admin/Layout";
import Umumiy from "../../components/Admin/Statistika/Umumiy";
import Kunlik from "../../components/Admin/Statistika/Kunlik";
import Oylik from "../../components/Admin/Statistika/Oylik";
import Yillik from "../../components/Admin/Statistika/Yillik";

function Statistika() {
  const [activeTab, setActiveTab] = useState("1"); // Default: Oylik
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 7) // Bugungi oy ("YYYY-MM" formatida)
  );

  const [kunlikDate, setKunlikDate] = useState(
    new Date().toISOString().slice(0, 10) // Bugungi kun ("YYYY-MM-DD" formatida)
  );

  const kunlikDateChange = (event) => {
    setKunlikDate(event.target.value);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Tanlangan oyning qiymatini yangilash
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Tanlangan yillik qiymatini yangilash
  };

  const formatMonthYear = (date) => {
    const options = { month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("uz-UZ", options).format(new Date(date));
  };

  const monthlyData = {
    month: formatMonthYear(selectedDate),
    totalBookings: 15,
    totalRevenue: "1,200,000 so'm",
    details: [
      { day: "1-dekabr", count: 3, amount: "300,000 so'm" },
      { day: "5-dekabr", count: 5, amount: "500,000 so'm" },
      { day: "10-dekabr", count: 7, amount: "400,000 so'm" },
    ],
  };

  const yearlyData = {
    year: selectedYear,
    totalBookings: 180,
    totalRevenue: "14,400,000 so'm",
    details: [
      { month: "Yanvar", count: 15, amount: "1,200,000 so'm" },
      { month: "Fevral", count: 12, amount: "960,000 so'm" },
      { month: "Mart", count: 18, amount: "1,440,000 so'm" },
      // Add remaining months...
    ],
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Statistika
        </h1>

        {/* Tabs Navigation */}
        <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700">
          {[
            { key: "1", label: "Umumiy" },
            { key: "2", label: "Kunlik" },
            { key: "3", label: "Oylik" },
            { key: "4", label: "Yillik" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.key
                  ? "dark:text-white border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "1" && <Umumiy />}
          {activeTab === "2" && (
            <Kunlik
              kunlikDateChange={kunlikDateChange}
              kunlikDate={kunlikDate}
            />
          )}
          {activeTab === "3" && (
            <Oylik
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              monthlyData={monthlyData}
            />
          )}
          {activeTab === "4" && (
            <Yillik
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              yearlyData={yearlyData}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Statistika;
