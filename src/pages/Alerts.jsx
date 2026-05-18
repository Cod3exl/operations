import { useState } from 'react';
import { AlertTriangle, CheckCircle, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { alerts as seedAlerts } from '../data/alerts';

const severityColors = {
  HIGH: '#B94040',
  MEDIUM: '#C9893C',
  LOW: '#4A7C59',
};

const severityEmoji = {
  HIGH: '🔴',
  MEDIUM: '🟡',
  LOW: '🟢',
};

const tabs = ['All', 'Active', 'Resolved'];

export default function Alerts() {
  const [alertsList, setAlertsList] = useState(seedAlerts);
  const [activeTab, setActiveTab] = useState('Active');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    lowStock: true,
    overdueRepairs: true,
    goldRateStale: true,
    pendingFollowups: true,
    branchInactivity: true,
    staffEvents: true,
  });

  const handleResolve = (alertId) => {
    setAlertsList(
      alertsList.map((a) =>
        a.id === alertId
          ? { ...a, resolved: true, resolvedAt: new Date().toLocaleString('en-IN') }
          : a
      )
    );
  };

  const filteredAlerts = alertsList
    .filter((a) => {
      if (activeTab === 'Active') return !a.resolved;
      if (activeTab === 'Resolved') return a.resolved;
      return true;
    })
    .sort((a, b) => {
      const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      return order[a.severity] - order[b.severity];
    });

  const activeCount = alertsList.filter((a) => !a.resolved).length;
  const resolvedCount = alertsList.filter((a) => a.resolved).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-semibold text-[#2C2C2C] flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#B94040]" />
            Alerts
          </h2>
          {activeCount > 0 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#B94040]/10 text-[#B94040]">
              {activeCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium border border-[#E0D8C8] text-[#7A6E5F] rounded-md cursor-pointer hover:bg-[#EDE8DC] transition-all duration-200"
        >
          <Settings size={14} />
          Alert Settings
          {showSettings ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Alert Settings */}
      {showSettings && (
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Alert Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: 'lowStock', label: 'Low Stock Alerts' },
              { key: 'overdueRepairs', label: 'Overdue Repairs' },
              { key: 'goldRateStale', label: 'Gold Rate Stale' },
              { key: 'pendingFollowups', label: 'Pending Follow-ups' },
              { key: 'branchInactivity', label: 'Branch Inactivity' },
              { key: 'staffEvents', label: 'Staff Events' },
            ].map((setting) => (
              <label
                key={setting.key}
                className="flex items-center justify-between p-3 bg-[#F5F0E8] rounded-md cursor-pointer"
              >
                <span className="text-xs font-medium text-[#2C2C2C]">{setting.label}</span>
                <div
                  onClick={() => setSettings({ ...settings, [setting.key]: !settings[setting.key] })}
                  className={`w-9 h-5 rounded-full transition-all duration-200 cursor-pointer relative ${
                    settings[setting.key] ? 'bg-[#4A7C59]' : 'bg-[#E0D8C8]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                      settings[setting.key] ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center bg-[#EDE8DC] rounded-lg p-1 border border-[#E0D8C8] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'bg-[#C9A84C] text-[#2C2C2C]'
                : 'text-[#7A6E5F] hover:text-[#2C2C2C]'
            }`}
          >
            {tab}
            {tab === 'Active' && activeCount > 0 && (
              <span className="ml-1 text-[9px]">({activeCount})</span>
            )}
            {tab === 'Resolved' && resolvedCount > 0 && (
              <span className="ml-1 text-[9px]">({resolvedCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 && (
          <div className="text-center py-8 text-sm text-[#7A6E5F]">
            {activeTab === 'Resolved' ? 'No resolved alerts yet.' : 'No active alerts. All clear!'}
          </div>
        )}
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white border border-[#E0D8C8] rounded-lg p-4 border-l-[4px] transition-all duration-200"
            style={{
              borderLeftColor: severityColors[alert.severity],
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              opacity: alert.resolved ? 0.7 : 1,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      color: severityColors[alert.severity],
                      backgroundColor: `${severityColors[alert.severity]}15`,
                    }}
                  >
                    {severityEmoji[alert.severity]} {alert.severity}
                  </span>
                  <span className="text-[10px] text-[#7A6E5F]">{alert.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#2C2C2C]">{alert.title}</h4>
                <p className="text-xs text-[#7A6E5F] mt-1">{alert.description}</p>
                {alert.resolved && alert.resolvedAt && (
                  <p className="text-[10px] text-[#4A7C59] mt-2 flex items-center gap-1">
                    <CheckCircle size={10} />
                    Resolved at {alert.resolvedAt}
                  </p>
                )}
              </div>
              {!alert.resolved && (
                <button
                  onClick={() => handleResolve(alert.id)}
                  className="px-3 py-1.5 text-xs font-medium border border-[#E0D8C8] text-[#7A6E5F] rounded-md cursor-pointer hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59] transition-all duration-200"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
