import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface PIESSummary {
    checked_in_on: string;
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

interface SuggestedLeader {
    id: number;
    name: string;
    match_reason: string;
    open_slots: number;
}

interface Individual {
    id: number;
    name: string;
    pies_history: PIESSummary[];
    streak_score: number;
    suggested_leaders: SuggestedLeader[];
}

interface AssignedIndividual extends Omit<Individual, 'suggested_leaders'> { }

interface Leader {
    id: number;
    name: string;
    pies_averages: Record<string, number>;
    assigned_individuals: AssignedIndividual[];
    open_slots: number;
}

export default function SuggestedMatches() {
    const [unassigned, setUnassigned] = useState<Individual[]>([]);
    const [leaders, setLeaders] = useState<Leader[]>([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('/assignment_insights');
            setUnassigned(res.data.unassigned_individuals);
            setLeaders(res.data.leaders);
        } catch (err) {
            console.error("Assignment dashboard fetch error:", err);
        }
    };

    const assignIndividual = async (individualId: number, leaderId: number) => {
        await axios.post('/team_assignments', { individual_id: individualId, leader_id: leaderId });
        fetchData();
    };

    const unassignIndividual = async (individualId: number) => {
        const leader = leaders.find(l => l.assigned_individuals.some(ind => ind.id === individualId));
        if (!leader) return;
        const assignment = await axios.get(`/team_assignments/find_by_pair`, {
            params: { individual_id: individualId, leader_id: leader.id }
        });
        await axios.delete(`/team_assignments/${assignment.data.id}`);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-8 p-4">
            <div>
                <h2 className="text-xl font-bold mb-2">Unassigned Individuals</h2>
                {unassigned.map((ind) => (
                    <div key={ind.id} className="border p-4 rounded-xl mb-4 shadow">
                        <h3 className="font-semibold">{ind.name}</h3>
                        <p className="text-sm text-gray-500">Check-ins (last 3):</p>
                        <ul className="text-xs mb-2">
                            {ind.pies_history.map((entry, idx) => (
                                <li key={idx}>
                                    {String(entry.checked_in_on)}: P {String(entry.physical)}, I {String(entry.intellectual)}, E {String(entry.emotional)}, S {String(entry.spiritual)}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm">
                            🔥 Streak Score: {ind.streak_score != null ? String(ind.streak_score) : '—'}
                        </p>
                        {ind.suggested_leaders.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium">Suggested Leader:</p>
                                {ind.suggested_leaders.slice(0, 1).map((leader) => (
                                    <div key={leader.id} className="mb-2">
                                        <p className="text-sm">{leader.name} ({leader.open_slots} open)</p>
                                        <p className="text-xs italic text-gray-600">{leader.match_reason}</p>
                                        <button
                                            className="mt-1 bg-blue-600 text-white px-2 py-1 rounded"
                                            onClick={() => assignIndividual(ind.id, leader.id)}
                                        >
                                            Assign to {leader.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            
        </div>
    );
}
