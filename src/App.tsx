import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/auth/login"
import Notfound from "./pages/notfound"
import { useEffect } from "react"
import Sadmin from "./pages/sadmin/index"
import SadminDash from "./pages/sadmin/sadmindash"
import SadminClie from "./pages/sadmin/sadminclie"
import SadminMaster from "./pages/sadmin/sadminmas"

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
        {/* Notfound */}
        <Route path="*" element={<Notfound />} />

        {/* Super Admin */}
        <Route path="/sadmin" element={<Sadmin />} />
        <Route path="/sadmin/sadmindashboard" element={<SadminDash />} />
        <Route path="/sadmin/sadminmaster" element={<SadminMaster />} />
        <Route path="/sadmin/sadminclient" element={<SadminClie />} />

      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="right"/> */}
    </QueryClientProvider >
  )
}
export default App
