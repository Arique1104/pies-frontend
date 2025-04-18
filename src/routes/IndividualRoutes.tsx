import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import IndividualDashboard from '../components/IndividualDashboard';

const IndividualRoutes: RouteObject[] = [
    {
        path: '/individual/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['individual']}>
                <IndividualDashboard />
            </ProtectedRoute>
        ),
    },
];

export default IndividualRoutes;