import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface PiesEntry {
    id: number;
    checked_in_on: string;
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

export default function PiesHistory() {
    const [entries, setEntries] = useState<PiesEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await axios.get('/pies_entries');
                setEntries(res.data);
            } catch (err) {
                console.error('Error fetching entries:', err);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div>
            <h3>Past Check-Ins</h3>
            {entries.length === 0 ? (
                <p>No entries yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Physical</th>
                            <th>Intellectual</th>
                            <th>Emotional</th>
                            <th>Spiritual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.checked_in_on}</td>
                                <td>{entry.physical}</td>
                                <td>{entry.intellectual}</td>
                                <td>{entry.emotional}</td>
                                <td>{entry.spiritual}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}