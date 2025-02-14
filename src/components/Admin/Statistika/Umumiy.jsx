import React, { useEffect } from "react";
import Card from "../Card";
import axios from "axios";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

function Umumiy() {
  const [umumiyData, setUmumiyData] = React.useState([]);

  const umumiyStatistika = () => {
    axios.get(`${baseUrl}stadion/statistika-umum/`, Adminconfig)
    .then((res) => {
      setUmumiyData(res.data)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    umumiyStatistika();
  }, [])
  return (
    <div>
      <h2 className="text-lg my-5 font-medium text-gray-800 dark:text-gray-100">
        Umumiy statistika
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card icon={<MdOutlineSportsSoccer /> } title="Stadionlar soni" value={umumiyData.stadion_count} />
        <Card icon={<FaShoppingCart />} title="Bronlar soni" value={umumiyData.bron_count} />
        <Card icon={<FaMoneyBillWave />} title="Olingan daromad" value={umumiyData.price} />
      </div>
    </div>
  );
}

export default Umumiy;
