import { useState } from 'react';
import axios from '../api/axios';

interface Props {
    onSubmitSuccess: () => void;
}

export default function PiesCheckinForm({ onSubmitSuccess }: Props) {
    const today = new Date().toISOString().split('T')[0];
    const [form, setForm] = useState({
        checked_in_on: today,
        physical: 5,
        physical_description: '',
        intellectual: 5,
        intellectual_description: '',
        emotional: 5,
        emotional_description: '',
        spiritual: 5,
        spiritual_description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/pies_entries', { pies_entry: form });
            alert('Check-in submitted!');
            onSubmitSuccess(); // ✅ Call the parent to refresh view
        } catch (err) {
            alert('Check-in failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Daily PIES Check-In</h3>
            {['physical', 'intellectual', 'emotional', 'spiritual'].map((key) => (
                <div key={key}>
                    <label>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                        <div>
                            <input
                                type="range"
                                name={key}
                                min="1"
                                max="10"
                                step="1"
                                value={(form as any)[key]}
                                onChange={handleChange}
                            />
                            <span>{(form as any)[key]}</span>
                        </div>
                    </label>
                    <textarea
                        name={`${key}_description`}
                        placeholder={`Describe your ${key} experience today`}
                        value={(form as any)[`${key}_description`]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">Submit Check-In</button>
        </form>
    );
}