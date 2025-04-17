import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { User } from '../types/User';

export default function ResetPassword() {
    const [params] = useSearchParams();
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = params.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axios.get(`/password_resets/edit?token=${token}`);
                setValid(res.data.valid);
            } catch {
                setError('Invalid or expired token.');
            }
        };
        if (token) verifyToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.patch<{ token: string; user: User }>('/password_resets', {
                token,
                password,
            });

            const { token: newToken, user } = res.data;

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(user));

            // 🎯 Role-based routing
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
        } catch {
            setError('Failed to reset password.');
        }
    };

    if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
            {valid ? (
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">New Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2 mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Reset Password
                    </button>
                </form>
            ) : (
                <p className="text-gray-600">Verifying token...</p>
            )}
        </div>
    );
}