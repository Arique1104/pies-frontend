import { useUserContext } from '../contexts/UserContext';
import IndividualDashboard from '../components/IndividualDashboard';
import LeaderDashboard from '../components/LeaderDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import ManagerDashboard from '../components/ManagerDashboard';
import BasicDashboard from '../components/BasicDashboard';

export default function Dashboard() {
    const { user, roleInOrg } = useUserContext();

    if (!user) return <p>Loading user...</p>;

    const roleDashboards: Record<string, JSX.Element> = {
        individual: <IndividualDashboard />,
        leader: <LeaderDashboard />,
        owner: <OwnerDashboard />,
        manager: <ManagerDashboard />
    };

    return (
        <div className="space-y-8">
            <BasicDashboard />

            {roleInOrg && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">
                        Role Dashboard ({roleInOrg})
                    </h2>
                    {roleDashboards[roleInOrg] ?? (
                        <p className="text-red-500">Unknown role: {roleInOrg}</p>
                    )}
                </div>
            )}
        </div>
    );
}