import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const AppRouter = () => (
    <Routes>
        {/* Redireccion a / */}
        <Route path="*" element={<Navigate to="/auth/login" />} />

        {/* Login */}
        <Route path='/auth/login' element={<LoginPage />} />

    </Routes>
)

export default AppRouter