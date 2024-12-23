import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Kalendarni to'g'ri ko'rsatish uchun CSS faylini import qilish

const Calendar1 = () => {
  const [value, setValue] = useState(new Date());

  // Date formatlash funksiyasi
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  // Tile-disabled funksiyasi: O'tgan kunlarni bloklash
  const disablePastDates = ({ date }) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0); // Hozirgi kunning 00:00 vaqtidan oldingi barcha kunlarni bloklaydi
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center">
        <Calendar
          className="w-full max-w-sm border-2 border-green-500 rounded-lg shadow-md bg-gray-50"
          onChange={setValue}
          value={value}
          tileDisabled={disablePastDates} // O'tgan kunlarni bloklash
        />
        <p className="mt-4 text-center">Tanlangan sana: {formatDate(value)}</p>
      </div>
    </div>
  );
};

export default Calendar1;
