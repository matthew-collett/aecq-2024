import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from '@state/AuthProvider'
import AppLayout from '@layouts/AppLayout'
import ProtectedRoute from '@layouts/ProtectedRoute'
import Dashboard from '@views/Dashboard'

const App = () => {
  return (
    <Router>
      {/* <AuthProvider> */}
      <Routes>
        {/* <Route path="/login" element={<LoginView />} /> */}
        {/* <Route path="/register" element={<RegisterView />} /> */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* </Route> */}
      </Routes>
      {/* </AuthProvider> */}
    </Router>
  )
}

export default App
