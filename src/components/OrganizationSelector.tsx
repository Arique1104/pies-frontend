import { useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from '../api/axios';

interface Organization {
    id: string;
    name: string;
}

export default function OrganizationSelector() {
    const { activeOrgId, setActiveOrgId } = useUserContext();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrgs = async () => {
            try {
                const res = await axios.get('/organizations');
                setOrganizations(res.data);
            } catch (err) {
                console.error('Failed to load organizations', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrgs();
    }, []);

    if (loading) return <p>Loading organizations...</p>;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Select Organization</h3>
            <ul className="space-y-1">
                {organizations.map((org) => (
                    <li
                        key={org.id}
                        className={`border rounded px-3 py-2 cursor-pointer ${org.id === activeOrgId ? 'bg-green-100 border-green-400' : 'hover:bg-gray-100'
                            }`}
                        onClick={() => setActiveOrgId(org.id)}
                    >
                        {org.name}
                        {org.id === activeOrgId && (
                            <span className="text-sm text-green-700 ml-2 font-medium">(Active)</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}