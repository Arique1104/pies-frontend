import { Navigate } from 'react-router-dom';
import { useActiveRole } from '../hooks/useActiveRole';

interface Props {
    allowedRoles: string[];
    children: JSX.Element;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
    const { role, loading } = useActiveRole();

    if (loading) return <p>Loading...</p>;
    if (!role || !allowedRoles.includes(role)) return <Navigate to="/" />;

    return children;
}