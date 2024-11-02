import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from '@state/AuthProvider'
import AppLayout from '@layouts/AppLayout'
import ProtectedRoute from '@layouts/ProtectedRoute'
import Dashboard from '@views/Dashboard'
import Journal from '@views/Journal/Journal'
import Prediction from './views/Prediction/Prediction'
import CropInfo from '@views/CropInfo/CropInfo'

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
          <Route path="journal" element={<Journal />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/cropinfo" element={<CropInfo />} />
        </Route>
        {/* </Route> */}
      </Routes>
      {/* </AuthProvider> */}
    </Router>
  )
}

export default App
