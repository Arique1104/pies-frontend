import { useState } from 'react';
import PiesCheckinForm from './PiesCheckinForm';
import PiesSuggestions from './PiesSuggestions';
import PiesTrendChart from './PiesTrendChart';
import PiesRadarChart from './PiesRadarChart';
import PiesHistory from './PiesHistory';
import { useUserContext } from '../contexts/UserContext';

const tabs = [
    { key: 'checkin', label: 'Check-In' },
    { key: 'suggestions', label: 'Suggestions' },
    { key: 'trends', label: 'Trends' },
    { key: 'history', label: 'History' },
] as const;

export default function BasicDashboard() {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('checkin');
    const { user } = useUserContext();
    return (
        
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-48 bg-gray-100 p-4 space-y-2 border-r">
                <h2 className="text-lg font-bold mb-4">My Dashboard</h2>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`block w-full text-left px-3 py-2 rounded ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'checkin' && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Daily Check-In</h2>
                        <PiesCheckinForm />
                    </>
                )}

                {activeTab === 'suggestions' && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Your Tips</h2>
                        <PiesSuggestions />
                    </>
                )}

                {activeTab === 'trends' && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">PIES Trends</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border p-4 rounded shadow">
                                <PiesTrendChart />
                            </div>
                            <div className="border p-4 rounded shadow">
                                <PiesRadarChart />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Check-In History</h2>
                        <PiesHistory />
                    </>
                )}
            </main>
        </div>
    );
}