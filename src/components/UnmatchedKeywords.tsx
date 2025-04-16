import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import CreateReflectionTipForm from './CreateReflectionTipForm';
import Modal from './Modal';

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
    const [isClient, setIsClient] = useState(false);

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


    useEffect(() => {
        setIsClient(true);
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
                                    <td><em>{kw.example || '--'}</em></td>
                                    <td>
                                        <Link to={`/unmatched_keywords/${kw.id}/new_tip`}>
                                            <button>Add to Tip</button>
                                        </Link>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={async () => {
                                                if (confirm(`Permanently dismiss "${kw.word}"?`)) {
                                                    try {
                                                        await axios.post('/dismissed_keywords', { word: kw.word });
                                                        await axios.delete(`/unmatched_keywords/${kw.id}`);
                                                        setKeywords(keywords.filter(k => k.id !== kw.id));
                                                    } catch (err) {
                                                        alert('Failed to dismiss keyword.');
                                                        console.error(err);
                                                    }
                                                }
                                            }}
                                        >
                                            Dismiss
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                        {isClient && addingWord && (
                            <Modal isOpen={!!addingWord} onClose={() => setAddingWord(null)}>
                                <CreateReflectionTipForm
                                    word={addingWord.word}
                                    category={addingWord.category}
                                    example={addingWord.example}
                                    keywordId={addingWord.id}
                                    onCancel={() => setAddingWord(null)}
                                    onSuccess={() => {
                                        setAddingWord(null);
                                        fetchKeywords();
                                    }}
                                />
                            </Modal>
                        )}
                </>
            )}
        </div>
    );
}