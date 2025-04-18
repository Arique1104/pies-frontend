import { useUserContext } from '../contexts/UserContext';

export default function OrgSwitcher({ orgs }: { orgs: { id: string; name: string }[] }) {
    const { activeOrgId, setActiveOrgId } = useUserContext();

    return (
        <select
            value={activeOrgId || ''}
            onChange={(e) => setActiveOrgId(e.target.value)}
            className="border px-2 py-1 rounded"
        >
            <option value="">Select an organization</option>
            {orgs.map((org) => (
                <option key={org.id} value={org.id}>
                    {org.name}
                </option>
            ))}
        </select>
    );
}