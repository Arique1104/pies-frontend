import { useState } from 'react';
import axios from '../api/axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/password_resets', { email });
            setSubmitted(true);
        } catch (err) {
            alert('Something went wrong.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Forgot Your Password?</h2>
            {submitted ? (
                <p className="text-green-600">If your email exists, a reset link has been sent.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2 mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Send Reset Link
                    </button>
                </form>
            )}
        </div>
    );
}