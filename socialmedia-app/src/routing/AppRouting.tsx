import { Navigate, Route, Routes } from "react-router"
import AuthLayout from "@/pages/auth/AuthLayout"
import SignInPage from "@/pages/auth/pages/signin/SignInPage"
import ProtectedLayout from "@/pages/protected/ProtectedLayout"
import RootPage from "@/pages/protected/root/RootPage"


export default function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="auth/signin" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="auth/signin" element={<SignInPage />} />
      </Route>
      <Route path="app" element={<ProtectedLayout />}>
        <Route index element={<RootPage />} />
      </Route>
    </Routes>
  )
}
