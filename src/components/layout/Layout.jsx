import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/operations/overview': 'Daily Overview',
  '/operations/analytics': 'Analytics',
  '/operations/karigar': 'Karigar Management',
  '/operations/repairs': 'Repairs',
  '/operations/alerts': 'Alerts',
};

export default function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Operations';

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Sidebar />

      <div className="md:ml-[240px] pb-20 md:pb-0">
        <Header title={title} />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
