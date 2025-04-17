import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerSignup from './pages/OwnerSignup';
import LeaderSignup from './pages/LeaderSignup.tsx';
import UnmatchedKeywordTipFormPage from './components/UnmatchedKeywordTipForm.tsx';
import UnmatchedKeywords from './components/UnmatchedKeywords.tsx';
import ReflectionTipsManager from './components/ReflectionTipsManager.tsx';
import SuggestedMatches from './components/SuggestedMatches.tsx';
import TeamManagement from './components/TeamManagement.tsx';
import OwnerDashboard from './components/OwnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/secret-owner-signup" element={<OwnerSignup />} />
        <Route path="/secret-leader-signup" element={<LeaderSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unmatched_keywords/:id/new_tip" element={<UnmatchedKeywordTipFormPage />} />

        {/* Owner Dashboard (Protected + Nested Views) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
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