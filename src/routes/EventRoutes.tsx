import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateEventForm from '../components/CreateEventForm';
import EventDashboard from '../components/EventDashboard';

const EventRoutes: RouteObject[] = [
    {
        path: '/events/:id/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['owner', 'leader', 'individual']}>
                <EventDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/events/new',
        element: (
            <ProtectedRoute allowedRoles={['owner', 'leader']}>
                <CreateEventForm />
            </ProtectedRoute>
        ),
    },
];

export default EventRoutes;