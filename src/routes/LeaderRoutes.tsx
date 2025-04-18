import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LeaderDashboard from '../components/LeaderDashboard';

const LeaderRoutes: RouteObject[] = [
    {
        path: '/leader/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['leader']}>
                <LeaderDashboard />
            </ProtectedRoute>
        ),
    },
];

export default LeaderRoutes;