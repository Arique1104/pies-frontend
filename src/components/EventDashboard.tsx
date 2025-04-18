import { useParams } from 'react-router-dom';
import { useIsEventHost } from '../hooks/useIsEventHost';

export default function EventDashboard() {
    const { id } = useParams();
    const { isHost, loading } = useIsEventHost(id || '');

    if (loading) return <p>Loading...</p>;
    if (!isHost) return <p className="text-red-600 font-semibold">Unauthorized – You are not a host for this event.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Event Dashboard</h2>
            <p>You're a host for event #{id}. You can manage submissions, view analytics, and more.</p>
            {/* Add more dashboard content here */}
        </div>
    );
}