import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Hammer, Wrench, AlertTriangle } from 'lucide-react';

const navItems = [
  { to: '/operations/overview', label: 'Daily Overview', icon: LayoutDashboard },
  { to: '/operations/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/operations/karigar', label: 'Karigar', icon: Hammer },
  { to: '/operations/repairs', label: 'Repairs', icon: Wrench },
  { to: '/operations/alerts', label: 'Alerts', icon: AlertTriangle },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] bg-[#2C2C2C] flex-col z-40">
        {/* VJ Monogram */}
        <div className="flex items-center justify-center h-[72px] border-b border-white/10">
          <span className="text-3xl font-bold tracking-wider font-heading" style={{ color: '#C9A84C' }}>
            VJ
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#C9A84C] border-l-[3px] border-[#C9A84C] bg-white/5'
                    : 'text-white/80 border-l-[3px] border-transparent hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2C2C2C] z-40 flex items-center justify-around px-2 py-1 border-t border-white/10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                isActive ? 'text-[#C9A84C]' : 'text-white/70'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
