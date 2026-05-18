import { useState } from 'react';
import {
  IndianRupee, Receipt, Users, UserCheck, Wrench, PackageX,
  TrendingUp, ArrowRight, AlertTriangle, Plus, Phone, FileText,
  RefreshCw
} from 'lucide-react';
import { formatINR } from '../utils/currency';
import { repairs } from '../data/repairs';
import { alerts } from '../data/alerts';
import { bills, revenueData } from '../data/analytics';

const kpis = [
  { label: "Today's Revenue", value: '₹4,85,000', icon: IndianRupee, color: '#C9A84C' },
  { label: 'Bills', value: '5', icon: Receipt, color: '#4A6B9C' },
  { label: 'Customers', value: '8', icon: Users, color: '#4A7C59' },
  { label: 'Staff', value: '5/5', icon: UserCheck, color: '#4A7C59' },
  { label: 'Repairs Ready', value: '1', icon: Wrench, color: '#C9893C' },
  { label: 'Low Stock', value: '2', icon: PackageX, color: '#B94040' },
];

const statusColor = {
  Ready: '#4A7C59',
  'In Progress': '#4A6B9C',
  Pending: '#C9893C',
};

const severityColor = {
  HIGH: '#B94040',
  MEDIUM: '#C9893C',
  LOW: '#4A7C59',
};

export default function DailyOverview() {
  const sortedRepairs = [...repairs].sort((a, b) => {
    const order = { Ready: 0, 'In Progress': 1, Pending: 2 };
    return order[a.status] - order[b.status];
  });

  const activeAlerts = alerts.filter(a => !a.resolved).slice(0, 3);

  // Branch comparison data
  const alkapuriRevenue = 485000;
  const bhayliRevenue = 218000;
  const maxRevenue = Math.max(alkapuriRevenue, bhayliRevenue);

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-[#2C2C2C]">
          Tuesday, 14 May 2025 — Alkapuri Branch
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-[#E0D8C8] rounded-lg p-3 flex flex-col gap-1"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center gap-2">
              <kpi.icon size={16} style={{ color: kpi.color }} />
              <span className="text-[11px] text-[#7A6E5F] font-medium">{kpi.label}</span>
            </div>
            <span className="text-lg font-semibold font-code text-[#2C2C2C]">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Gold Rate Widget */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#2C2C2C] flex items-center gap-2">
                <TrendingUp size={16} className="text-[#C9A84C]" />
                Gold Rate
              </h3>
              <button className="text-xs text-[#C9A84C] font-medium hover:underline cursor-pointer flex items-center gap-1">
                <RefreshCw size={12} />
                Update Rate
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F5F0E8] rounded-md p-2 text-center">
                <span className="text-[10px] text-[#7A6E5F] block">22KT</span>
                <span className="text-sm font-code font-semibold text-[#2C2C2C]">₹7,150/g</span>
              </div>
              <div className="bg-[#F5F0E8] rounded-md p-2 text-center">
                <span className="text-[10px] text-[#7A6E5F] block">24KT</span>
                <span className="text-sm font-code font-semibold text-[#2C2C2C]">₹7,820/g</span>
              </div>
              <div className="bg-[#F5F0E8] rounded-md p-2 text-center">
                <span className="text-[10px] text-[#7A6E5F] block">Silver</span>
                <span className="text-sm font-code font-semibold text-[#2C2C2C]">₹89/g</span>
              </div>
            </div>
          </div>

          {/* Today's Bills */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
              <Receipt size={16} className="text-[#4A6B9C]" />
              Today&apos;s Bills
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                    <th className="text-left py-2 font-medium">Bill #</th>
                    <th className="text-left py-2 font-medium">Customer</th>
                    <th className="text-left py-2 font-medium">Time</th>
                    <th className="text-right py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.slice(0, 5).map((bill, idx) => (
                    <tr key={bill.id} className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}>
                      <td className="py-2 px-1 font-code text-[11px]">{bill.id}</td>
                      <td className="py-2 px-1">{bill.customer}</td>
                      <td className="py-2 px-1 text-[#7A6E5F]">{bill.time}</td>
                      <td className="py-2 px-1 text-right font-code font-medium">{formatINR(bill.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Repairs */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
              <Wrench size={16} className="text-[#C9893C]" />
              Pending Repairs
            </h3>
            <div className="space-y-2">
              {sortedRepairs.map((repair) => (
                <div
                  key={repair.id}
                  className="flex items-center justify-between p-2 rounded-md border"
                  style={{
                    borderColor: repair.status === 'Ready' ? '#4A7C59' : '#E0D8C8',
                    backgroundColor: repair.status === 'Ready' ? '#F0FFF4' : '#F5F0E8',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-code text-[11px] font-medium">{repair.id}</span>
                    <span className="text-xs text-[#2C2C2C]">{repair.item}</span>
                    <span className="text-[10px] text-[#7A6E5F]">{repair.customer}</span>
                  </div>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: statusColor[repair.status],
                      backgroundColor: `${statusColor[repair.status]}15`,
                    }}
                  >
                    {repair.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Branch Comparison */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Branch Comparison</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#7A6E5F]">Alkapuri</span>
                  <span className="font-code font-medium">{formatINR(alkapuriRevenue)}</span>
                </div>
                <div className="h-4 bg-[#EDE8DC] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(alkapuriRevenue / maxRevenue) * 100}%`,
                      backgroundColor: '#C9A84C',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#7A6E5F]">Bhayli</span>
                  <span className="font-code font-medium">{formatINR(bhayliRevenue)}</span>
                </div>
                <div className="h-4 bg-[#EDE8DC] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(bhayliRevenue / maxRevenue) * 100}%`,
                      backgroundColor: '#4A7C59',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#B94040]" />
              Active Alerts
            </h3>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-2 rounded-md border-l-[3px] bg-[#F5F0E8]"
                  style={{ borderLeftColor: severityColor[alert.severity] }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          color: severityColor[alert.severity],
                          backgroundColor: `${severityColor[alert.severity]}15`,
                        }}
                      >
                        {alert.severity}
                      </span>
                      <p className="text-[11px] font-medium text-[#2C2C2C] mt-1">{alert.title}</p>
                    </div>
                    <span className="text-[9px] text-[#7A6E5F] whitespace-nowrap">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200">
                <Plus size={14} />
                New Bill
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#EDE8DC] text-[#2C2C2C] rounded-md cursor-pointer hover:bg-[#E0D8C8] transition-all duration-200 border border-[#E0D8C8]">
                <Phone size={14} />
                Follow-up
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#EDE8DC] text-[#2C2C2C] rounded-md cursor-pointer hover:bg-[#E0D8C8] transition-all duration-200 border border-[#E0D8C8]">
                <Wrench size={14} />
                New Repair
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#EDE8DC] text-[#2C2C2C] rounded-md cursor-pointer hover:bg-[#E0D8C8] transition-all duration-200 border border-[#E0D8C8]">
                <FileText size={14} />
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
