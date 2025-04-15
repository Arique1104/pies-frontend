import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface AssignedIndividual {
    id: number;
    name: string;
    streak_score: number;
}

interface Leader {
    id: number;
    name: string;
    pies_averages: Record<string, number>;
    assigned_individuals: AssignedIndividual[];
    open_slots: number;
}

export default function TeamManagement() {
    const [leaders, setLeaders] = useState<Leader[]>([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('/assignment_insights');
            setLeaders(res.data.leaders);
        } catch (error) {
            console.error('Error loading leader data:', error);
        }
    };

    const unassignIndividual = async (individualId: number) => {
        const leader = leaders.find(l => l.assigned_individuals.some(ind => ind.id === individualId));
        if (!leader) return;
        try {
            const assignment = await axios.get(`/team_assignments/find_by_pair`, {
                params: { individual_id: individualId, leader_id: leader.id }
            });
            await axios.delete(`/team_assignments/${assignment.data.id}`);
            fetchData();
        } catch (error) {
            console.error("Failed to unassign individual:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Leaders & Assigned Individuals</h2>
            {leaders.length === 0 && <p>No leaders available.</p>}
            {leaders.map((leader) => (
                <div key={leader.id} className="border p-4 rounded-xl mb-4 shadow">
                    <h3 className="font-semibold">{leader.name} ({leader.open_slots} open slots)</h3>
                    <p className="text-xs text-gray-600 mb-1">
                        PIES Averages:
                        P {String(leader.pies_averages?.physical ?? '-')},
                        I {String(leader.pies_averages?.intellectual ?? '-')},
                        E {String(leader.pies_averages?.emotional ?? '-')},
                        S {String(leader.pies_averages?.spiritual ?? '-')}
                    </p>
                    <ul className="text-sm">
                        {leader.assigned_individuals.map((ind) => (
                            <li key={ind.id} className="flex justify-between items-center border-b py-1">
                                <span>{ind.name} 🔥 {ind.streak_score}</span>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => unassignIndividual(ind.id)}
                                >
                                    Unassign
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
