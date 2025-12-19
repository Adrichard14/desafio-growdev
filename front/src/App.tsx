import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import { AuthProvider } from "./contexts/authContext"
import { PublicRoute } from "./components/routing/publicRoute"
import { ProtectedRoute } from "./components/routing/protectedRoute"
import LoginPage from "./pages/login/login"
import IndexPage from "./pages/home/index"
import RegisterPage from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<IndexPage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
          </Route>

          <Route path="/" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
