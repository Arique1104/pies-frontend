import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import CreateReflectionTipForm from '../components/CreateReflectionTipForm';

interface Keyword {
    id: number;
    word: string;
    category: string;
    example: string | null;
}

export default function UnmatchedKeywordTipFormPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<Keyword | null>(null);

    useEffect(() => {
        const fetchKeyword = async () => {
            try {
                const res = await axios.get(`/unmatched_keywords`);
                const match = res.data.find((kw: Keyword) => kw.id === parseInt(id!));
                setKeyword(match);
            } catch (err) {
                console.error('Failed to load keyword:', err);
            }
        };
        fetchKeyword();
    }, [id]);

    if (!keyword) return <p>Loading unmatched keyword...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Add Reflection Tip for "{keyword.word}"</h2>
            <CreateReflectionTipForm
                word={keyword.word}
                category={keyword.category}
                example={keyword.example}
                keywordId={keyword.id}
                onCancel={() => navigate('/unmatched_keywords')}
                onSuccess={async () => {
                    await axios.delete(`/unmatched_keywords/${keyword.id}`);
                    navigate('/unmatched_keywords');
                }}
            />
        </div>
    );
}