import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart, Legend
} from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { formatINR } from '../utils/currency';
import {
  revenueData, categoryBreakdown, topItems, topCustomers,
  salespersonPerformance, paymentModes
} from '../data/analytics';

const tabs = ['Today', 'This Week', 'This Month', 'Custom'];

const PIE_COLORS = ['#C9A84C', '#4A7C59', '#4A6B9C', '#C9893C', '#B94040'];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('This Month');

  return (
    <div className="space-y-4">
      {/* Date Range Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center bg-[#EDE8DC] rounded-lg p-1 border border-[#E0D8C8]">
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
              {tab === 'Custom' && <Calendar size={12} className="inline mr-1" />}
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Revenue Trend (30 Days)</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0D8C8" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#7A6E5F' }} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: '#7A6E5F' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip
                formatter={(value) => [formatINR(value), 'Revenue']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0D8C8' }}
              />
              <Area type="monotone" dataKey="total" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Breakdown */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Category Breakdown</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0D8C8" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#7A6E5F' }} />
                <YAxis tick={{ fontSize: 10, fill: '#7A6E5F' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value) => [formatINR(value), 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0D8C8' }} />
                <Bar dataKey="revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Comparison */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Branch Comparison</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(-7)} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0D8C8" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#7A6E5F' }} />
                <YAxis tick={{ fontSize: 10, fill: '#7A6E5F' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value) => [formatINR(value)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0D8C8' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="alkapuri" name="Alkapuri" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bhayli" name="Bhayli" fill="#4A7C59" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top 5 Items */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Top 5 Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                  <th className="text-left py-2 font-medium">SKU</th>
                  <th className="text-left py-2 font-medium">Name</th>
                  <th className="text-center py-2 font-medium">Sold</th>
                  <th className="text-right py-2 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topItems.map((item, idx) => (
                  <tr key={item.sku} className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}>
                    <td className="py-2 px-1 font-code text-[10px]">{item.sku}</td>
                    <td className="py-2 px-1">{item.name}</td>
                    <td className="py-2 px-1 text-center">{item.sold}</td>
                    <td className="py-2 px-1 text-right font-code font-medium">{formatINR(item.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 5 Customers */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Top 5 Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                  <th className="text-left py-2 font-medium">Customer</th>
                  <th className="text-center py-2 font-medium">Purchases</th>
                  <th className="text-right py-2 font-medium">Total Spent</th>
                  <th className="text-center py-2 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((cust, idx) => (
                  <tr key={cust.name} className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}>
                    <td className="py-2 px-1">{cust.name}</td>
                    <td className="py-2 px-1 text-center">{cust.purchases}</td>
                    <td className="py-2 px-1 text-right font-code font-medium">{formatINR(cust.totalSpent)}</td>
                    <td className="py-2 px-1 text-center">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] font-medium">
                        {cust.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson Performance */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Salesperson Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                  <th className="text-left py-2 font-medium">Name</th>
                  <th className="text-center py-2 font-medium">Bills</th>
                  <th className="text-right py-2 font-medium">Revenue</th>
                  <th className="text-center py-2 font-medium">Branch</th>
                </tr>
              </thead>
              <tbody>
                {salespersonPerformance.map((sp, idx) => (
                  <tr key={sp.name} className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}>
                    <td className="py-2 px-1 font-medium">{sp.name}</td>
                    <td className="py-2 px-1 text-center">{sp.bills}</td>
                    <td className="py-2 px-1 text-right font-code font-medium">{formatINR(sp.revenue)}</td>
                    <td className="py-2 px-1 text-center text-[#7A6E5F]">{sp.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Mode Pie */}
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Payment Mode Distribution</h3>
          <div className="h-[220px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentModes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="amount"
                  nameKey="mode"
                  label={({ mode, percentage }) => `${mode} ${percentage}%`}
                  labelLine={false}
                >
                  {paymentModes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatINR(value)]} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E0D8C8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {paymentModes.map((pm, idx) => (
              <div key={pm.mode} className="flex items-center gap-1 text-[10px]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                <span className="text-[#7A6E5F]">{pm.mode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
