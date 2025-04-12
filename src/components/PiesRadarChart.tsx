import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

interface RawEntry {
    id: number;
    checked_in_on: string;
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

interface LayeredEntry {
    category: string;
    [label: string]: string | number;
}

export default function PiesRadarChart() {
    const [data, setData] = useState<LayeredEntry[] | null>(null);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        const fetchLastThree = async () => {
            try {
                const res = await axios.get('/pies_entries');
                const entries: RawEntry[] = res.data
                    .sort((a, b) => new Date(b.checked_in_on).getTime() - new Date(a.checked_in_on).getTime())
                    .slice(0, 3)
                    .reverse(); // oldest first

                const labels = entries.map(e => e.checked_in_on);
                setLabels(labels);

                const merged: LayeredEntry[] = ['Physical', 'Intellectual', 'Emotional', 'Spiritual'].map((category) => {
                    const key = category.toLowerCase() as keyof RawEntry;
                    const entry: LayeredEntry = { category };

                    entries.forEach((e, i) => {
                        entry[labels[i]] = e[key];
                    });

                    return entry;
                });

                setData(merged);
            } catch (err) {
                console.error('Error fetching entries for radar chart', err);
            }
        };

        fetchLastThree();
    }, []);

    return (
        <div>
            <h3>Last 3 Check-Ins: PIES Radar</h3>
            {data && data.length > 0 && labels.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category"
                            tickFormatter={(category) => category.charAt(0)} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        {labels.map((label, i) => (
                            <Radar
                                key={label}
                                name={label}
                                dataKey={label}
                                stroke={['#8884d8', '#82ca9d', '#ffc658'][i]}
                                fill={['#8884d8', '#82ca9d', '#ffc658'][i]}
                                fillOpacity={0.3}
                            />
                        ))}
                    </RadarChart>
                </ResponsiveContainer>
            ) : (
                <p>You need at least 1–3 check-ins to see radar trends.</p>
            )}
        </div>
    );
}