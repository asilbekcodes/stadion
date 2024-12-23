import { useState } from 'react';
// import { FaChevronLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Buttons from '../../components/Buttons';
import Navbar from '../../components/Client/Navbar';

const ClintCod = () => {
  const [code, setCode] = useState(new Array(5).fill(""));

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && e.target.nextSibling) {
        e.target.nextSibling.focus();
        navigate('/clint/register');
      }
    }
  };

  return (
    <div>
      <div className="p-4 block lg:hidden">
        <Buttons text={'Avtorizatsiya'} />
      </div>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="flex flex-col items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <h3 className="text-xl font-semibold mt-4">Kodni kiriting</h3>
        <p className="text-gray-500 text-[19px] mb-4">
          Telefon raqamingizni tasdiqlash uchun 5 xonali kodni yuboring .
        </p>

        <Link to={'/clintLogin'} className="text-blue-500 underline mb-6 block">Raqamni o`zgartirish</Link>

        {/* Kod kiritish maydonlari */}
        <div className="flex justify-center space-x-2 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-10 h-10 border rounded-md p-3 text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <Link to={'/clint/register'}>
          <div className='mt-52 flex justify-center '>
            <p className='w-[400px] text-center'>Если код не придёт, можно получить новый
              через 130 сек</p>
          </div>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default ClintCod;
