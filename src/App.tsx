import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

import OwnerSignup from './pages/OwnerSignup';
import LeaderSignup from './pages/LeaderSignup';
import OwnerDashboard from './components/OwnerDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import LeaderDashboard from './components/LeaderDashboard';

import UnmatchedKeywordTipFormPage from './components/UnmatchedKeywordTipForm';
import UnmatchedKeywords from './components/UnmatchedKeywords';
import ReflectionTipsManager from './components/ReflectionTipsManager';
import SuggestedMatches from './components/SuggestedMatches';
import TeamManagement from './components/TeamManagement';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        {/* Signup for internal roles (optional: protect with token/invite later) */}
        <Route path="/secret-owner-signup" element={<OwnerSignup />} />
        <Route path="/secret-leader-signup" element={<LeaderSignup />} />

        {/* Owner-only route: Creating reflection tips */}
        <Route path="/unmatched_keywords/:id/new_tip" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <UnmatchedKeywordTipFormPage />
          </ProtectedRoute>
        } />

        {/* Individual Dashboard */}
        <Route path="/individual/dashboard" element={
          <ProtectedRoute allowedRoles={['individual']}>
            <IndividualDashboard />
          </ProtectedRoute>
        } />

        {/* Leader Dashboard */}
        <Route path="/leader/dashboard" element={
          <ProtectedRoute allowedRoles={['leader']}>
            <LeaderDashboard />
          </ProtectedRoute>
        } />

        {/* Owner Dashboard and its routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }>
          <Route path="suggested_matches" element={<SuggestedMatches />} />
          <Route path="teams" element={<TeamManagement />} />
          <Route path="unmatched_keywords" element={<UnmatchedKeywords />} />
          <Route path="reflection_tips" element={<ReflectionTipsManager userRole="owner" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;