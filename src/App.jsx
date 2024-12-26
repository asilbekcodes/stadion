import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './pages/Client/Main';
import NotFound from './pages/Notfount';
import About from './pages/Client/About';
import Map from './pages/Client/Map';
import Dashboards from './pages/Admin/Dashboards';
import Orders from './pages/Admin/Orders';
import Profil from './pages/Admin/Profil';
import ClintLogin from './pages/auth/clintLogin';
import ClintCod from './pages/auth/clintCod';
import ClintIsm_familiya from './pages/auth/clintIsm_familiya';
import ClintBron from './pages/Client/clintBron';
import OrdersPage from './pages/Client/OrdersPage';
import ThemeContextProvider from './context/ThemeContextProvider';
import Home from './pages/Client/Home';
import Favorites from './pages/Client/Favorites';
import Profils from './pages/Client/Profils';
import Regester from './pages/auth/Regester';
import StadinAdd from './pages/Admin/StadinAdd';
import { useEffect } from 'react';
import Money from './components/Admin/Money';
import Statistika from './pages/Admin/Statistika';
import Times_Pages from './pages/Admin/Times';
import Times from './components/Admin/Times';

function App() {
  const navigate = useNavigate()
  function RoleAuth() {
    if (localStorage.getItem("adminToken") && localStorage.getItem("role") === "A") {
      navigate("/dashboard")
    }
    else {
      navigate("/")
    }
  }
  useEffect(() => {
    RoleAuth()
  }, [])
  return (

    <Routes>
      {/* Client page routes */}
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/about/:resultId" element={<About />} />
      <Route path="/map" element={<Map />} />
      <Route path="/auth/login" element={<ClintLogin />} />
      <Route path="/clintCod" element={<ClintCod />} />
      <Route path="/clint/register" element={<ClintIsm_familiya />} />
      <Route path="/clintBron/:resultId" element={<ClintBron />} />
      <Route path="/ordersPage" element={<OrdersPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/client/profil" element={<Profils />} />
      <Route path="/auth/register" element={<Regester />} />

      {/* Admin page routes wrapped with ThemeContextProvider */}
      <Route
        path="/dashboard"
        element={
          <ThemeContextProvider>
            <Dashboards />
          </ThemeContextProvider>
        }
      />
      <Route
        path="/statistika"
        element={
          <ThemeContextProvider>
            <Statistika />
          </ThemeContextProvider>
        }
      />
      <Route
        path="/stadionAdd"
        element={
          <ThemeContextProvider>
            <StadinAdd />
          </ThemeContextProvider>
        }
      />
      <Route
        path="/orders"
        element={
          <ThemeContextProvider>
            <Orders />
          </ThemeContextProvider>
        }
      />
      <Route
        path='/daromat'
        element={
          <ThemeContextProvider>
            <Money />
          </ThemeContextProvider>
        }
      />
      <Route
        path="/times"
        element={
          <ThemeContextProvider>
            <Times_Pages />
          </ThemeContextProvider>
        }
      />
      <Route
        path="/profil"
        element={
          <ThemeContextProvider>
            <Profil />
          </ThemeContextProvider>
        }
      />
      <Route path='/time_boshqarish' element = {<ThemeContextProvider><Times/></ThemeContextProvider>}/>
    </Routes>
  );
}

export default App;
