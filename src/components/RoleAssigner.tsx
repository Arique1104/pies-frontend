import { useState } from 'react';
import axios from '../api/axios';

interface RoleAssignerProps {
    membershipId: number;
    currentRole: string;
    onSuccess?: (newRole: string) => void;
}

const ROLE_OPTIONS = ['individual', 'leader', 'owner', 'manager'];

export default function RoleAssigner({ membershipId, currentRole, onSuccess }: RoleAssignerProps) {
    const [newRole, setNewRole] = useState(currentRole);
    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        if (newRole === currentRole) return;

        try {
            setLoading(true);
            const res = await axios.patch(`/memberships/${membershipId}`, { role: newRole }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert(`Role updated to ${res.data.role}`);
            if (onSuccess) onSuccess(res.data.role);
        } catch (err) {
            alert('Failed to update role');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="border rounded px-2 py-1"
                disabled={loading}
            >
                {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>

            <button
                onClick={handleChange}
                disabled={loading || newRole === currentRole}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
                Update Role
            </button>
        </div>
    );
}