import ReflectionTipsManager from "./ReflectionTipsManager";

export default function LeaderDashboard() {
    return (
        <div>
            <h3>Leader Dashboard</h3>
            <p>View your team, submit check-ins, and monitor group progress</p>
            <ReflectionTipsManager userRole="leader" />
        </div>

    );
}