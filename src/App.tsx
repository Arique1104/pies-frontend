import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerSignup from './pages/OwnerSignup';
import LeaderSignup from './pages/LeaderSignup'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/secret-owner-signup' element={<OwnerSignup/>}/>
        <Route path='/secret-leader-signup' element={<LeaderSignup/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;