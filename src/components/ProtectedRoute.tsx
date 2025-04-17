import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.role) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
}