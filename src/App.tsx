import { BrowserRouter, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';

import PublicRoutes from './routes/PublicRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import LeaderRoutes from './routes/LeaderRoutes';
import IndividualRoutes from './routes/IndividualRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import EventRoutes from './routes/EventRoutes';

function AppRoutes() {
  const routes = useRoutes([
    ...PublicRoutes,
    ...OwnerRoutes,
    ...LeaderRoutes,
    ...IndividualRoutes,
    ...ManagerRoutes,
    ...EventRoutes,
  ]);

  return routes;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}