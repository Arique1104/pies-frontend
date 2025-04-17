import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface ReflectionTip {
    id: number;
    word: string;
    category: string;
    tip: string;
}

interface Props {
    userRole: 'owner' | 'leader';
}

export default function ReflectionTipsManager({ userRole }: Props) {
    const [tips, setTips] = useState<ReflectionTip[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTip, setNewTip] = useState({ word: '', category: '', tip: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTips = async () => {
        try {
            const res = await axios.get('/reflection_tips');
            setTips(res.data);
        } catch (err) {
            console.error('Failed to fetch tips:', err);
        }
    };

    useEffect(() => {
        fetchTips();
    }, []);

    const handleUpdate = async (tip: ReflectionTip) => {
        try {
            await axios.put(`/reflection_tips/${tip.id}`, { reflection_tip: tip });
            setEditingId(null);
            fetchTips();
        } catch (err) {
            alert('Failed to update tip.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this tip?')) return;
        try {
            await axios.delete(`/reflection_tips/${id}`);
            fetchTips();
        } catch (err) {
            alert('Failed to delete tip.');
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post('/reflection_tips', { reflection_tip: newTip });
            setNewTip({ word: '', category: '', tip: '' });
            fetchTips();
        } catch (err) {
            alert('Failed to create tip.');
        }
    };

    // 🔍 Filter tips by search query
    const visibleTips = tips.filter(
        (tip) =>
            tip.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tip.tip.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h3>Reflection Tips</h3>

            {/* 🔍 Search Bar */}
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search tips by keyword or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Category</th>
                        <th>Tip</th>
                        {userRole === 'owner' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {visibleTips.map((tip) => (
                        <tr key={tip.id}>
                            <td>{tip.word}</td>
                            <td>{tip.category}</td>
                            <td>
                                {userRole === 'owner' && editingId === tip.id ? (
                                    <textarea
                                        value={tip.tip}
                                        onChange={(e) =>
                                            setTips((prev) =>
                                                prev.map((t) =>
                                                    t.id === tip.id ? { ...t, tip: e.target.value } : t
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    <em>{tip.tip}</em>
                                )}
                            </td>
                            {userRole === 'owner' && (
                                <td>
                                    {editingId === tip.id ? (
                                        <button onClick={() => handleUpdate(tip)}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => setEditingId(tip.id)}>Edit</button>
                                            <button
                                                onClick={() => handleDelete(tip.id)}
                                                style={{ marginLeft: '0.5rem' }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {userRole === 'owner' && (
                <>
                    <hr />
                    <h4>Add New Tip</h4>
                    <input
                        placeholder="Keyword"
                        value={newTip.word}
                        onChange={(e) => setNewTip({ ...newTip, word: e.target.value })}
                    />
                    <input
                        placeholder="Category (physical, emotional...)"
                        value={newTip.category}
                        onChange={(e) =>
                            setNewTip({ ...newTip, category: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Suggestion text"
                        value={newTip.tip}
                        onChange={(e) => setNewTip({ ...newTip, tip: e.target.value })}
                    />
                    <br />
                    <button onClick={handleCreate}>Add Tip</button>
                </>
            )}
        </div>
    );
}