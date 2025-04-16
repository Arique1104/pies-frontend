import { useState } from 'react';
import UnmatchedKeywords from './UnmatchedKeywords';
import ReflectionTipsManager from './ReflectionTipsManager';
import SuggestedMatches from './SuggestedMatches';
import TeamManagement from './TeamManagement';

export default function OwnerDashboard() {
    const [activeTab, setActiveTab] = useState<'keywords' | 'tips' | 'suggested' | 'teams'>('suggested');
    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4 border-b pb-2">
                <button
                    onClick={() => setActiveTab('assignments')}
                    className={`px-4 py-2 rounded-t ${activeTab === 'assignments' ? 'bg-white font-bold border border-b-0' : 'bg-gray-200'}`}
                >
                    Suggested Matches
                </button>
                <button
                    onClick={() => setActiveTab('keywords')}
                    className={`px-4 py-2 rounded-t ${activeTab === 'keywords' ? 'bg-white font-bold border border-b-0' : 'bg-gray-200'}`}
                >
                    Unmatched Keywords
                </button>
                <button
                    onClick={() => setActiveTab('tips')}
                    className={`px-4 py-2 rounded-t ${activeTab === 'tips' ? 'bg-white font-bold border border-b-0' : 'bg-gray-200'}`}
                >
                    Reflection Tips Manager
                </button>
                <button
                    onClick={() => setActiveTab('teams')}
                    className={`px-4 py-2 rounded-t ${activeTab === 'teams' ? 'bg-white font-bold border border-b-0' : 'bg-gray-200'}`}
                >
                    Teams
                </button>
            </div>

            <div className="border p-4 rounded-b shadow bg-white">
                {activeTab === 'assignments' && <SuggestedMatches />}
                {activeTab === 'keywords' && <UnmatchedKeywords />}
                {activeTab === 'tips' && <ReflectionTipsManager userRole="owner" />}
                {activeTab === 'teams' && <TeamManagement />}
            </div>
        </div>
    );
}
