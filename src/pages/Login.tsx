import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types/User';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post<{ token: string; user: User }>('/login', {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Log In</button>
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
           

            <p className="mt-4 text-sm text-center">
                <Link to="/forgot_password" className="text-blue-600 hover:underline">
                    Forgot your password?
                </Link>
            </p>
    
        </form>
    );
}