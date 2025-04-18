import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import ManagerDashboard from '../components/ManagerDashboard';

const ManagerRoutes: RouteObject[] = [
    {
        path: '/manager/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
            </ProtectedRoute>
        ),
    },
];

export default ManagerRoutes;