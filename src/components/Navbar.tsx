import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    );
}