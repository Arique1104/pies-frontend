import { useState } from 'react';
import axios from '../api/axios';

interface CreateReflectionTipFormProps {
    word: string;
    category: string;
    example: string | null;
    keywordId: number;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function CreateReflectionTipForm({
    word,
    category,
    example,
    keywordId,
    onCancel,
    onSuccess,
}: CreateReflectionTipFormProps) {
    const [tipText, setTipText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/reflection_tips', {
                reflection_tip: {
                    word,
                    category,
                    tip: tipText,
                },
            });

            // Clean up unmatched keyword
            // await axios.delete(`/unmatched_keywords/${keywordId}`);

            alert('Tip added successfully!');
            setTipText('');
            onSuccess();
        } catch (err) {
            alert('Failed to add tip.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} aria-label={`Form to create reflection tip for ${word}`}>
            <h4 className="text-lg font-semibold mb-2">Add Tip for "{word}"</h4>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Quote:</strong> <em>{example || '—'}</em></p>

            <label htmlFor="reflection-tip-textarea" className="block mt-2">Reflection Tip</label>
            <textarea
                id="reflection-tip-textarea"
                name="reflection_tip"
                className="w-full border rounded p-2 mt-1"
                placeholder="Enter a helpful reflection tip..."
                value={tipText}
                onChange={(e) => setTipText(e.target.value)}
            />

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    Save Tip
                </button>
            </div>
        </form>
    );
}