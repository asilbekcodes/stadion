import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import ThemeContextProvider from "./context/ThemeContextProvider";
import Loading from "./components/Loading";
import StadionEdit from "./components/Admin/Addstadion/StadionEdit";

const Home = lazy(() => import("./pages/Client/Home"));
const Main = lazy(() => import("./pages/Client/Main"));
const NotFound = lazy(() => import("./pages/Notfount"));
const About = lazy(() => import("./pages/Client/About"));
const Map = lazy(() => import("./pages/Client/Map"));
const Dashboards = lazy(() => import("./pages/Admin/Dashboards"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Profil = lazy(() => import("./pages/Admin/Profil"));
const ClintLogin = lazy(() => import("./pages/auth/clintLogin"));
const ClintCod = lazy(() => import("./pages/auth/clintCod"));
const ClintIsmFamiliya = lazy(() => import("./pages/auth/clintIsm_familiya"));
const ClintBron = lazy(() => import("./pages/Client/clintBron"));
const OrdersPage = lazy(() => import("./pages/Client/OrdersPage"));
const Favorites = lazy(() => import("./pages/Client/Favorites"));
const Profils = lazy(() => import("./pages/Client/Profils"));
const Register = lazy(() => import("./pages/auth/Regester"));
const StadinAdd = lazy(() => import("./pages/Admin/StadinAdd"));
const Statistika = lazy(() => import("./pages/Admin/Statistika"));
const TimesPages = lazy(() => import("./pages/Admin/Times"));
const Times = lazy(() => import("./components/Admin/Times"));
const History = lazy(() => import("./pages/Admin/History"));
const General = lazy(() => import("./components/Admin/Addstadion/General"));

function App() {
  const navigate = useNavigate();

  function RoleAuth() {
    if (
      localStorage.getItem("adminToken") &&
      localStorage.getItem("role") === "A"
    ) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }
  useEffect(() => {
    RoleAuth();
  }, []);

  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("lastPage", location.pathname);
  }, [location]);

  useEffect(() => {
    const lastPage = sessionStorage.getItem("lastPage");
    if (lastPage) {
      navigate(lastPage);
    }
  }, [navigate]);

  return (
    <>
      <Suspense fallback={<Loading isLoading={true} fullScreen />}>
        <Routes>
          {/* Client pages */}
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/about/:resultId" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/auth/login" element={<ClintLogin />} />
          <Route path="/clintCod" element={<ClintCod />} />
          <Route path="/clint/register" element={<ClintIsmFamiliya />} />
          <Route path="/clintBron/:resultId" element={<ClintBron />} />
          <Route path="/ordersPage" element={<OrdersPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/client/profil" element={<Profils />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Admin pages */}
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
            path="/times"
            element={
              <ThemeContextProvider>
                <TimesPages />
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
          <Route
            path="/time_boshqarish"
            element={
              <ThemeContextProvider>
                <Times />
              </ThemeContextProvider>
            }
          />
          <Route
            path="/history"
            element={
              <ThemeContextProvider>
                <History />
              </ThemeContextProvider>
            }
          />
          <Route
            path="/general"
            element={
              <ThemeContextProvider>
                <General />
              </ThemeContextProvider>
            }
          />
          <Route
            path="/stadionEdit/:id"
            element={
              <ThemeContextProvider>
                <StadionEdit />
              </ThemeContextProvider>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
