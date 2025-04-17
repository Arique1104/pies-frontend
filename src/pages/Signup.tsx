import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post<{ token: string; user: User }>('/signup', {
                name,
                email,
                password,
                password_confirmation: confirm,
            });

            const user = res.data.user;

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'individual') {
                navigate('/individual/dashboard');
            } else if (user.role === 'leader') {
                navigate('/leader/dashboard');
            } else if (user.role === 'owner') {
                navigate('/dashboard');
            } else {
                console.warn('Unknown role:', user.role);
                navigate('/');
            }
        } catch (err) {
            alert('Signup failed');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>

            <p>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </p>

            <p>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>

            <p>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </p>

            <p>
                <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </p>

            <button type="submit">Sign Up</button>
        </form>
    );
}