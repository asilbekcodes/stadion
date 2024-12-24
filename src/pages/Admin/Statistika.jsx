import React, { useState } from "react";
import Layout from "../../components/Admin/Layout";
import Card from "../../components/Admin/Card";

function Statistika() {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
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
          {activeTab === "1" && (
            <div>
              <h2 className="text-lg my-5 font-medium text-gray-800 dark:text-gray-100">
                Umumiy statistika
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
                <Card icon="📊" title="Stadionlar soni" value="2" />
                <Card icon={"📊"} title="Bronlar soni" value="" />
                <Card icon={"📊"} title="Olingan daromat" value="" />
              </div>
            </div>
          )}
          {activeTab === "2" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Kunlik statistika
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ma'lumot mavjud emas
              </p>
            </div>
          )}
          {activeTab === "3" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Oylik statistika
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ma'lumot mavjud emas
              </p>
            </div>
          )}
          {activeTab === "4" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Yillik statistika
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ma'lumot mavjud emas
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Statistika;
