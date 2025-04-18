import { useEffect, useState } from 'react';
import axios from '../api/axios';

export function useActiveRole() {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const activeOrgId = localStorage.getItem('activeOrganizationId');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get('/memberships/me', {
                    params: { organization_id: activeOrgId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRole(res.data.role);
            } catch (err) {
                console.error('Error fetching role in org:', err);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        if (activeOrgId) fetchRole();
    }, [activeOrgId]);

    return { role, loading };
}