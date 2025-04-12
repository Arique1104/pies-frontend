import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { piesTipMap } from '../utils/piesSuggestions';

interface PiesEntry {
    checked_in_on: string;
    physical_description: string;
    intellectual_description: string;
    emotional_description: string;
    spiritual_description: string;
}

interface Suggestion {
    category: string;
    text: string;
}

export default function PiesSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        const fetchLatestEntry = async () => {
            try {
                const res = await axios.get('/pies_entries');
                const sorted = res.data.sort(
                    (a: PiesEntry, b: PiesEntry) =>
                        new Date(b.checked_in_on).getTime() - new Date(a.checked_in_on).getTime()
                );
                const latest = sorted[0];
                if (!latest) return;

                const newSuggestions: Suggestion[] = [];

                const categories = ['physical', 'intellectual', 'emotional', 'spiritual'] as const;

                categories.forEach((category) => {
                    const text = latest[`${category}_description`] as string;
                    const tipsForCategory = piesTipMap[category];

                    for (const keyword in tipsForCategory) {
                        if (text.toLowerCase().includes(keyword)) {
                            const tips = tipsForCategory[keyword];
                            newSuggestions.push({
                                category,
                                text: tips[0]
                            });
                            break;
                        }
                    }
                });

                setSuggestions(newSuggestions);
            } catch (err) {
                console.error('Failed to fetch suggestions', err);
            }
        };

        fetchLatestEntry();
    }, []);

    if (suggestions.length === 0) return null;

    return (
        <div>
            <h4>Reflective Suggestions</h4>
            <ul>
                {suggestions.map((sugg, idx) => (
                    <li key={idx}>
                        <strong>{sugg.category.charAt(0).toUpperCase() + sugg.category.slice(1)}:</strong> {sugg.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}