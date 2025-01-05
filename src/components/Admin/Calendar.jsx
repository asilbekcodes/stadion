import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current month and year every minute
    const updateMonth = () => {
      const now = new Date();
      setCurrentMonth(now.getMonth());
      setCurrentYear(now.getFullYear());
    };

    const intervalId = setInterval(updateMonth, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ];

  const daysOfWeek = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCurrentDay = () => {
    const today = new Date();
    return today.getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let days = [];
    // Haftaning birinchi kuni dushanba bo'lishi uchun shift
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 rounded bg-gray-100 dark:bg-gray-300"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === getCurrentDay() && currentMonth === new Date().getMonth();
      days.push(
        <div
          key={i}
          className={`p-2 rounded ${
            isToday ? 'bg-yellow-300 text-gray-800 font-semibold' : 'bg-gray-100 dark:bg-gray-300'
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
      <div className="flex justify-between text-lg font-bold mb-4">
        <h2>Calendar</h2>
        <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
      </div>
      <div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 rounded font-bold bg-gray-100 dark:bg-gray-50">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
