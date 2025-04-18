import { useEffect, useState } from 'react';
import axios from '../api/axios';

export function useIsEventHost(eventId: string | number) {
    const [isHost, setIsHost] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkHost = async () => {
            try {
                const res = await axios.get(`/events/${eventId}/host_check`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setIsHost(res.data.is_host);
            } catch (err) {
                console.error('Error checking host status:', err);
                setIsHost(false);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) checkHost();
    }, [eventId]);

    return { isHost, loading };
}