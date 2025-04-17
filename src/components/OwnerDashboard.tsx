import { Outlet, NavLink } from 'react-router-dom';

export default function OwnerDashboard() {
    const linkBaseStyle = 'block px-4 py-2 rounded hover:bg-blue-100';
    const activeStyle = 'bg-white font-semibold border-l-4 border-blue-500 text-blue-700';

    return (
        <div className="flex h-screen">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-gray-100 p-4 space-y-4 border-r">
                <h2 className="text-xl font-bold mb-6">Owner Dashboard</h2>
                <nav className="flex flex-col space-y-3">
                    <NavLink
                        to="suggested_matches"
                        className={({ isActive }) =>
                            `block w-full text-left rounded-md transition ${isActive
                                ? 'bg-blue-600 text-white font-semibold shadow'
                                : 'bg-white text-gray-800 hover:bg-blue-50 border'
                            }`
                        }
                    >
                        <button className="w-full px-4 py-2">Suggested Matches</button>
                    </NavLink>

                    <NavLink
                        to="teams"
                        className={({ isActive }) =>
                            `block w-full text-left rounded-md transition ${isActive
                                ? 'bg-blue-600 text-white font-semibold shadow'
                                : 'bg-white text-gray-800 hover:bg-blue-50 border'
                            }`
                        }
                    >
                        <button className="w-full px-4 py-2">Teams</button>
                    </NavLink>

                    <NavLink
                        to="unmatched_keywords"
                        className={({ isActive }) =>
                            `block w-full text-left rounded-md transition ${isActive
                                ? 'bg-blue-600 text-white font-semibold shadow'
                                : 'bg-white text-gray-800 hover:bg-blue-50 border'
                            }`
                        }
                    >
                        <button className="w-full px-4 py-2">Unmatched Keywords</button>
                    </NavLink>

                    <NavLink
                        to="reflection_tips"
                        className={({ isActive }) =>
                            `block w-full text-left rounded-md transition ${isActive
                                ? 'bg-blue-600 text-white font-semibold shadow'
                                : 'bg-white text-gray-800 hover:bg-blue-50 border'
                            }`
                        }
                    >
                        <button className="w-full px-4 py-2">Reflection Tips</button>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto bg-white">
                <Outlet />
            </main>
        </div>
    );
}