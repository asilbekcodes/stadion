import React, { useState } from "react";
import Layout from "../../components/Admin/Layout";
import Umumiy from "../../components/Admin/Statistika/Umumiy";
import Kunlik from "../../components/Admin/Statistika/Kunlik";
import Oylik from "../../components/Admin/Statistika/Oylik";
import Yillik from "../../components/Admin/Statistika/Yillik";
import Kunlar from "../../components/Admin/Statistika/Kunlar";

function Statistika() {
  const [activeTab, setActiveTab] = useState("1"); // Default: Oylik
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 7) // Bugungi oy ("YYYY-MM" formatida)
  );

  const [kunlikDate, setKunlikDate] = useState(
    new Date().toISOString().slice(0, 10) // Bugungi kun ("YYYY-MM-DD" formatida)
  );

  const [kunlarDate, setKunlarDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [kunlarDays, setKunlarDays] = useState(
    // new Date().toISOString().slice(0, 10)
    []
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

  const handleKunlikDateChange = (event) => {
    setKunlarDate(event.target.value);
  };

  const handleKunlikDaysChange = (event) => {
    setKunlarDays(event.target.value);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-3 md:p-8">
        <h1 className="text-xl md:text-2xl mb-3 text-gray-800 dark:text-gray-100">
          Statistika
        </h1>

        {/* Tabs Navigation */}
        <div className="flex space-x-0 md:space-x-5 border-b border-gray-300 dark:border-gray-700">
          {[
            { key: "1", label: "Umumiy" },
            { key: "2", label: "Kunlik" },
            { key: "3", label: "Kunlar" },
            { key: "4", label: "Oylik" },
            { key: "5", label: "Yillik" },
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
            <Kunlar
              kunlarDateChange={handleKunlikDateChange}
              kunlarDate={kunlarDate}
              kunlarDaysChange={handleKunlikDaysChange}
              kunlarDays={kunlarDays}
            />
          )}
          {activeTab === "4" && (
            <Oylik
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          )}
          {activeTab === "5" && (
            <Yillik
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Statistika;
