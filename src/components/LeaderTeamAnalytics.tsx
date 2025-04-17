import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TeamMember {
    id: number;
    name: string;
    streak_score: number;
}

interface PIESData {
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

export default function LeaderTeamAnalytics() {
    const [piesAverages, setPiesAverages] = useState<PIESData | null>(null);
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/leader_team_insights');
                setPiesAverages(res.data.team_average_pies);
                setMembers(res.data.team_members);
            } catch (error) {
                console.error('Error fetching team insights:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = piesAverages
        ? [
            { category: 'P', value: piesAverages.physical },
            { category: 'I', value: piesAverages.intellectual },
            { category: 'E', value: piesAverages.emotional },
            { category: 'S', value: piesAverages.spiritual },
        ]
        : [];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Team PIES Overview</h2>

            {piesAverages && (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={chartData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="category" />
                            <PolarRadiusAxis domain={[0, 10]} />
                            <Radar name="Team Avg" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold">Team Members & Streaks</h3>
                <ul className="text-sm mt-2 space-y-1">
                    {members.map((member) => (
                        <li key={member.id} className="flex justify-between border-b py-1">
                            <span>{member.name}</span>
                            <span>🔥 {member.streak_score}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
