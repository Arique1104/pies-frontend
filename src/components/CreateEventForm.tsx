import { useState, useEffect } from 'react';
import axios from '../api/axios';

interface User {
    id: number;
    name: string;
}

export default function CreateEventForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [hosts, setHosts] = useState<number[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchLeadersAndOwners = async () => {
            try {
                const res = await axios.get('/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const filtered = res.data.filter((u: User) =>
                    ['owner', 'leader'].includes(u.role)
                );
                setAllUsers(filtered);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchLeadersAndOwners();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                '/events',
                {
                    event: { title, description, date, location },
                    host_ids: hosts,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('Event created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setHosts([]);
        } catch (err) {
            alert('Failed to create event');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4 border rounded shadow">
            <h2 className="text-xl font-bold">Create New Event</h2>

            <input
                className="w-full border p-2 rounded"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <input
                className="w-full border p-2 rounded"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <input
                className="w-full border p-2 rounded"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />

            <label className="block font-semibold">Select Hosts</label>
            <select
                multiple
                className="w-full border p-2 rounded"
                value={hosts.map(String)}
                onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
                    setHosts(selected);
                }}
            >
                {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Event
            </button>
        </form>
    );
}