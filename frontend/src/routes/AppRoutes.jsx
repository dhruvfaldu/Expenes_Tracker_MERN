import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Transactions from '../pages/Transactions.jsx'
import Categories from '../pages/Categories.jsx'
import Profile from '../pages/Profile.jsx'
import MainLayout from '@/Layout/MainLayout.jsx';
import PublicRoutes from './PublicRoutes.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import Reports from '@/pages/Reports.jsx'

function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />} >
                        {/* ProtectedRoutes */}
                        <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                        <Route path="/transactions" element={<ProtectedRoutes><Transactions /></ProtectedRoutes>} />
                        <Route path="/categories" element={<ProtectedRoutes><Categories /></ProtectedRoutes>} />
                        <Route path="/reports" element={<ProtectedRoutes><Reports /></ProtectedRoutes>} />
                        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                        

                        {/* PublicRoutes */}
                        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
                        <Route path="/register" element={<PublicRoutes><Signup /></PublicRoutes>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRoutes;