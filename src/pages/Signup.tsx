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
                password_confirmation: confirm
            });

            const user = res.data.user;
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'individual') {
                navigate('/dashboard');
            } else {
                console.warn('Unexpected role on signup:', user.role);
                navigate('/');
            }
        } catch (err: any) {
            alert('Signup failed');
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleSignup} className="max-w-md mx-auto p-6 border rounded shadow mt-10 space-y-4">
            <h2 className="text-xl font-bold text-center">Sign Up as an Individual</h2>

            <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
            />

            <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700"
            >
                Sign Up
            </button>
        </form>
    );
}