import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import IndividualDashboard from '../components/IndividualDashboard';
import LeaderDashboard from '../components/LeaderDashboard';
import OwnerDashbaord from '../components/OwnerDashboard';


export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (!stored) {
            navigate('/login');
            return;
        }
        const parsedUser: User = JSON.parse(stored);
        setUser(parsedUser);
    }, [navigate]);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            {user.role === 'individual' && <IndividualDashboard/>}
            {user.role === 'leader' && <LeaderDashboard/>}
            {user.role === 'owner' && <OwnerDashbaord/>}
        </div>
    );
}