import { useState } from 'react';
import axios from '../api/axios';

const ROLES = ['individual', 'leader', 'owner', 'manager'];

export default function ManagerInviteForm({ onSuccess }: { onSuccess?: () => void }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('individual');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg('');
        try {
            const res = await axios.post('/memberships/invite', {
                email,
                name,
                role,
                organization_id: localStorage.getItem('activeOrganizationId'),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setSuccessMsg(`User ${res.data.membership.user.email} invited as ${res.data.membership.role}`);
            setEmail('');
            setName('');
            setRole('individual');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            alert('Failed to invite user.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border rounded p-4 shadow max-w-xl">
            <h3 className="text-xl font-bold mb-2">Invite a New User</h3>

            <div className="mb-3">
                <label className="block text-sm mb-1">Full Name</label>
                <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm mb-1">Email Address</label>
                <input
                    type="email"
                    className="w-full border rounded px-2 py-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm mb-1">Role</label>
                <select
                    className="w-full border rounded px-2 py-1"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    {ROLES.map((r) => (
                        <option key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? 'Inviting...' : 'Send Invite'}
            </button>

            {successMsg && <p className="mt-3 text-green-600">{successMsg}</p>}
        </form>
    );
}