import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import OwnerSignup from '../pages/OwnerSignup';
import LeaderSignup from '../pages/LeaderSignup';

const PublicRoutes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/forgot_password', element: <ForgotPassword /> },
    { path: '/reset_password', element: <ResetPassword /> },
    { path: '/secret-owner-signup', element: <OwnerSignup /> },
    { path: '/secret-leader-signup', element: <LeaderSignup /> }
];

export default PublicRoutes;