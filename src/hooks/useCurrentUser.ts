import { useEffect, useState } from 'react';
import { User } from '../types/User';

export function useCurrentUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    return user;
}