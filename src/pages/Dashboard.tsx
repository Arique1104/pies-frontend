import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import IndividualDashboard from '../components/IndividualDashboard';
import LeaderDashboard from '../components/LeaderDashboard';
import OwnerDashboard from '../components/OwnerDashboard';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (!stored) {
            navigate('/login');
            return;
        }
        try {
            const parsedUser: User = JSON.parse(stored);
            setUser(parsedUser);
        } catch {
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [navigate]);

    if (!user) return <p>Loading...</p>;

    const dashboards: Record<string, JSX.Element> = {
        individual: <IndividualDashboard />,
        leader: <LeaderDashboard />,
        owner: <OwnerDashboard />,
    };

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            {dashboards[user.role] || (
                <p className="text-red-500">Unknown role: {user.role}</p>
            )}
        </div>
    );
}