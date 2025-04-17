import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface PiesEntry {
    id: number;
    checked_in_on: string;
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

export default function PiesTrendChart() {
    const [entries, setEntries] = useState<PiesEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await axios.get('/pies_entries');
                setEntries(res.data.reverse()); // show oldest to newest
            } catch (err) {
                console.error('Error fetching entries:', err);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div>
            <h3>PIES Trend Chart</h3>
            {entries.length === 0 ? (
                <p>No data yet to chart.</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={entries}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="checked_in_on" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="physical" stroke="#8884d8" />
                        <Line type="monotone" dataKey="intellectual" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="emotional" stroke="#ffc658" />
                        <Line type="monotone" dataKey="spiritual" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}