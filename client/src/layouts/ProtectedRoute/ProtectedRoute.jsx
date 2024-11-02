import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@state/AuthProvider'

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
