import { useState } from 'react';
import PiesCheckinForm from './PiesCheckinForm';
import PiesSuggestions from './PiesSuggestions';
import PiesTrendChart from './PiesTrendChart';
import PiesRadarChart from './PiesRadarChart';
import PiesHistory from './PiesHistory';

const tabs = [
    { key: 'checkin', label: 'Check-In' },
    { key: 'suggestions', label: 'Suggestions' },
    { key: 'trends', label: 'Trends' },
    { key: 'history', label: 'History' },
] as const;

export default function BasicDashboard() {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('checkin');

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-6 border-r flex flex-col">
                <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
                <nav className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-all
                ${activeTab === tab.key
                                    ? 'bg-blue-600 text-white font-semibold'
                                    : 'text-gray-700 hover:bg-blue-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-white">
                {activeTab === 'checkin' && (
                    <>
                        <h3 className="text-xl font-semibold mb-4">Daily Check-In</h3>
                        <PiesCheckinForm />
                    </>
                )}

                {activeTab === 'suggestions' && (
                    <>
                        <h3 className="text-xl font-semibold mb-4">Your Suggestions</h3>
                        <PiesSuggestions />
                    </>
                )}

                {activeTab === 'trends' && (
                    <>
                        <h3 className="text-xl font-semibold mb-4">PIES Trends</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4 shadow bg-white">
                                <PiesTrendChart />
                            </div>
                            <div className="border rounded-lg p-4 shadow bg-white">
                                <PiesRadarChart />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <>
                        <h3 className="text-xl font-semibold mb-4">Check-In History</h3>
                        <PiesHistory />
                    </>
                )}
            </main>
        </div>
    );
}