import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import Notfound from "./pages/notfound"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<Notfound />} />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="right"/> */}
    </QueryClientProvider >
  )
}

export default App
