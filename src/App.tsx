import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/auth/login"
import Notfound from "./pages/notfound"
import { useEffect } from "react"
import SadminDash from "./pages/dashboard/dashboard"
import SadminClie from "./pages/dashboard/dashboardclie"
import SadminMaster from "./pages/dashboard/dashboardmas"
import SadminMasterr from "./pages/dashboard/dashboardmaster"
import Dashboard from "./pages/dashboard/dashboard"
import Client from "./pages/dashboard/dashboardclient"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
// import ConfirmedMas from "./pages/sadmin/ConfirmedMas"
// import NotConfirmedMas from "./pages/sadmin/NotConfirmedMas"

const queryClient = new QueryClient()

function App() {
  const navigate = useNavigate()

  function checkLogin() {
    let token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        
        {/* Notfound */}
        <Route path="/*" element={<Notfound />} />

        {/* Super Admin */}
        {/* <Route path="/sadmin" element={<Sadmin />} /> */}
        <Route path="/sadmin/sadmindashboard" element={<SadminDash />} />
        <Route path="/sadmin/sadminmaster" element={<SadminMaster />} />
        <Route path="/sadmin/sadminmasterr" element={< SadminMasterr />} />
        <Route path="/sadmin/sadminclient" element={<SadminClie />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/sadmin/sadminmasterconfirmedmas" element={<ConfirmedMas />} /> */}
        {/* <Route path="/sadmin/sadminmasternotconfirmedmas" element={<NotConfirmedMas />} /> */}
        {/* <Route path="/index" element={<Index />} /> */}

        <Route path="/c" element={<Client />} />
      </Routes>
        <ToastContainer />
      {/* <ReactQueryDevtools initialIsOpen={false} position="right"/> */}
    </QueryClientProvider >
  )
}
export default App
