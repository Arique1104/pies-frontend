import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import OwnerDashboard from '../components/OwnerDashboard';
import SuggestedMatches from '../components/SuggestedMatches';
import TeamManagement from '../components/TeamManagement';
import UnmatchedKeywords from '../components/UnmatchedKeywords';
import ReflectionTipsManager from '../components/ReflectionTipsManager';
import UnmatchedKeywordTipFormPage from '../components/UnmatchedKeywordTipForm';

const OwnerRoutes: RouteObject[] = [
    {
        path: '/unmatched_keywords/:id/new_tip',
        element: (
            <ProtectedRoute allowedRoles={['owner']}>
                <UnmatchedKeywordTipFormPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['owner']}>
                <OwnerDashboard />
            </ProtectedRoute>
        ),
        children: [
            { path: 'suggested_matches', element: <SuggestedMatches /> },
            { path: 'teams', element: <TeamManagement /> },
            { path: 'unmatched_keywords', element: <UnmatchedKeywords /> },
            { path: 'reflection_tips', element: <ReflectionTipsManager userRole="owner" /> },
        ],
    },
];

export default OwnerRoutes;