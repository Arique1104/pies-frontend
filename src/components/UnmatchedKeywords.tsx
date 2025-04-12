import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Keyword {
    id: number;
    word: string;
    category: string;
    count: number;
    example: string | null;
}

export default function UnmatchedKeywords() {
    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [addingWord, setAddingWord] = useState<Keyword | null>(null);
    const [tipText, setTipText] = useState('');

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const res = await axios.get('/unmatched_keywords');
                setKeywords(res.data);
            } catch (err) {
                console.error('Error fetching unmatched keywords:', err);
            }
        };

        fetchKeywords();
    }, []);

    return (
        <div>
            <h3>Unmatched User Keywords</h3>

            {keywords.length === 0 ? (
                <p>No unmatched words logged yet.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>PIES Category</th>
                                <th>Count</th>
                                <th>Example Quote</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywords.map((kw) => (
                                <tr key={kw.id}>
                                    <td>{kw.word}</td>
                                    <td>{kw.category}</td>
                                    <td>{kw.count}</td>
                                    <td><em>"{kw.example || '--'}"</em></td>
                                    <td>
                                        <button onClick={() => {
                                            setAddingWord(kw);
                                            setTipText('');
                                        }}>
                                            Add to Tips
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {addingWord && (
                        <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', background: '#f9f9f9' }}>
                            <h4>Add Tip for "{addingWord.word}"</h4>
                            <p><strong>Category:</strong> {addingWord.category}</p>
                            <p><strong>Quote:</strong> <em>{addingWord.example || '—'}</em></p>

                            <textarea
                                style={{ width: '100%', height: '80px' }}
                                placeholder="Enter a tip or suggestion..."
                                value={tipText}
                                onChange={(e) => setTipText(e.target.value)}
                            />

                            <br />
                            <button
                                onClick={async () => {
                                    try {
                                        await axios.post('/reflection_tips', {
                                            reflection_tip: {
                                                word: addingWord.word,
                                                category: addingWord.category,
                                                tip: tipText
                                            }
                                        });
                                        alert('Tip added!');
                                        setAddingWord(null);
                                        setTipText('');
                                    } catch (err) {
                                        alert('Failed to add tip.');
                                    }
                                }}
                            >
                                Save Tip
                            </button>
                            <button onClick={() => setAddingWord(null)} style={{ marginLeft: '0.5rem' }}>
                                Cancel
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
    }