import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import Notfound from "./pages/Notfound"
import Login from "./pages/auth/login"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="right"/> */}
    </QueryClientProvider >
  )
}

export default App
