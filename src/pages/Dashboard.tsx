import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

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
            {user.role === 'individual' && (
                <p>You are an individual. Here's your PIES check-in form and stats.</p>
            )}
            {user.role === 'leader' && (
                <p>You are a leader. Here's your team dashboard and check-in tools.</p>
            )}
            {user.role === 'owner' && (
                <p>You are an owner. You have access to all users and team assignments.</p>
            )}
        </div>
    );
}