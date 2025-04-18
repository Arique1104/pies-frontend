import ReflectionTipsManager from "./ReflectionTipsManager";
import LeaderTeamAnalytics from "./LeaderTeamAnalytics";
import { useNavigate } from 'react-router-dom';

export default function LeaderDashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <h3>Leader Dashboard</h3>
            <p>View your team, submit check-ins, and monitor group progress</p>
            <ReflectionTipsManager userRole="leader" />
            {/* <YourCheckinHistory /> */}
            <LeaderTeamAnalytics />
            <button
                onClick={() => navigate('/events/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create New Event
            </button>
        </div>

    );
}