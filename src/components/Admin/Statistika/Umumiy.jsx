import React from "react";
import Card from "../Card";

function Umumiy() {
  return (
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
  );
}

export default Umumiy;
