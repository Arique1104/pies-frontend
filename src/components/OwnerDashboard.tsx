import ReflectionTipsManager from "./ReflectionTipsManager";
import UnmatchedKeywords from "./UnmatchedKeywords";
export default function OwnerDashbaord() {
    return (
        <div>
            <h3> Owner Dashboard </h3>
            <p>Manage all users, assign leaders, assign teams, and oversee system-wide growth</p>
            <UnmatchedKeywords/>
            <ReflectionTipsManager/>
        </div>
    );
}