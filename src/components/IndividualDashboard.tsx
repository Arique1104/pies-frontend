import { useEffect, useState, useCallback } from 'react';
import axios from '../api/axios';
import PiesCheckinForm from './PiesCheckinForm';
import PiesHistory from './PiesHistory';
// import PiesTrendChart from './PiesTrendChart';
import PiesRadarChart from './PiesRadarChart'
import PiesSuggestions from './PiesSuggestions';

interface PiesEntry {
    id: number;
    checked_in_on: string;
    physical: number;
    intellectual: number;
    emotional: number;
    spiritual: number;
}

export default function IndividualDashboard() {
    const [entries, setEntries] = useState<PiesEntry[]>([]);
    const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    const fetchEntries = useCallback(async () => {
        try {
            const res = await axios.get('/pies_entries');
            setEntries(res.data);

            const checkedIn = res.data.some((entry: PiesEntry) => entry.checked_in_on === today);
            setHasCheckedInToday(checkedIn);
        } catch (err) {
            console.error('Failed to fetch check-ins', err);
        }
    }, [today]);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    return (
        <div>
            <h3>Individual Dashboard</h3>

            {!hasCheckedInToday ? (
                <>
                    <p>You haven’t checked in today yet. 🌞</p>
                    <PiesCheckinForm onSubmitSuccess={fetchEntries} />
                </>
            ) : (
                <>
                    <p>Here’s your progress so far. ✅</p>
                    {/* <PiesTrendChart/> */}
                    <PiesSuggestions/>
                    <PiesRadarChart/>
                    <PiesHistory />
                </>
            )}
        </div>
    );
}