import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { User } from '../types/User';

interface UserContextType {
    user: User | null;
    roleInOrg: string | null;
    activeOrgId: string | null;
    setActiveOrgId: (id: string | null) => void;
    refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [roleInOrg, setRoleInOrg] = useState<string | null>(null);
    const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

    // Load from localStorage on first render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const orgId = localStorage.getItem('activeOrganizationId');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (orgId) {
            setActiveOrgId(orgId);
        }
    }, []);

    // Fetch role from backend when org or user changes
    useEffect(() => {
        const fetchRole = async () => {
            if (!activeOrgId || !user) return;
            try {
                const res = await axios.get('/memberships/me', {
                    params: { organization_id: activeOrgId }
                });
                setRoleInOrg(res.data.role);
            } catch (err) {
                console.warn('Failed to fetch role for org:', err);
                setRoleInOrg(null);
            }
        };
        fetchRole();
    }, [user, activeOrgId]);

    const refreshUser = () => {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    return (
        <UserContext.Provider value={{ user, roleInOrg, activeOrgId, refreshUser, setActiveOrgId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUserContext must be used within UserProvider');
    return context;
}