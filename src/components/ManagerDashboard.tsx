import { useEffect, useState } from 'react';
import axios from '../api/axios';
import RoleAssigner from './RoleAssigner';
import ManagerInviteForm from './ManagerInviteForm';

interface Membership {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    role: string;
}

export default function ManagerDashboard() {
    const [memberships, setMemberships] = useState<Membership[]>([]);

    const fetchMemberships = async () => {
        const orgId = localStorage.getItem('activeOrganizationId');
        const res = await axios.get(`/memberships`, {
            params: { organization_id: orgId },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setMemberships(res.data);
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold">Manager Dashboard</h2>

            {/* Invite Form */}
            <ManagerInviteForm onSuccess={fetchMemberships} />

            {/* Role Management Table */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Current Organization Members</h3>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Role</th>
                            <th className="text-left p-2">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberships.map((m) => (
                            <tr key={m.id} className="border-t">
                                <td className="p-2">{m.user.name}</td>
                                <td className="p-2">{m.user.email}</td>
                                <td className="p-2 capitalize">{m.role}</td>
                                <td className="p-2">
                                    <RoleAssigner
                                        membershipId={m.id}
                                        currentRole={m.role}
                                        onSuccess={(newRole) =>
                                            setMemberships((prev) =>
                                                prev.map((mem) =>
                                                    mem.id === m.id ? { ...mem, role: newRole } : mem
                                                )
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}