import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";

export default function RegionSelect({ onSelectRegion, onSelectDistrict }) {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}utils/viloyatlar/`)
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    setSelectedDistrict("");
    onSelectRegion(regionId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    onSelectDistrict(districtId);
  };

  const selectedRegionData =
    regions.find((region) => region.id === Number(selectedRegion)) || {
      tumanlar: [],
    };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-[12px] ">
        <label className="block md:mb-2 md:text-lg dark:text-gray-100 text-gray-700">
          Viloyatni tanlang:<span className="text-red-500 mx-2">*</span>
        </label>
        <select
          className="p-2 border border-gray-700 dark:border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="">Viloyatni tanlang</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-[12px] mt-4">
        <label className="block md:text-lg md:mb-2 dark:text-gray-100 text-gray-700">
          Tumanni tanlang:<span className="text-red-500 mx-2">*</span>
        </label>
        <select
          className="p-2 border border-gray-700 dark:border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedRegion}
        >
          <option value="">Tumanni tanlang</option>
          {selectedRegion &&
            selectedRegionData.tumanlar.map((tuman) => (
              <option key={tuman.id} value={tuman.id}>
                {tuman.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
