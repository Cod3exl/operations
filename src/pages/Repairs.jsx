import { useState } from 'react';
import { Wrench, Plus, Printer, MessageCircle, Search, Filter, X } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { repairs as seedRepairs } from '../data/repairs';
import { karigars } from '../data/karigars';

const statusColors = {
  Pending: { color: '#C9893C', bg: '#C9893C15', border: '#E0D8C8' },
  'In Progress': { color: '#4A6B9C', bg: '#4A6B9C15', border: '#E0D8C8' },
  Ready: { color: '#4A7C59', bg: '#F0FFF4', border: '#4A7C59' },
  Delivered: { color: '#7A6E5F', bg: '#EDE8DC', border: '#E0D8C8' },
};

export default function Repairs() {
  const [repairsList, setRepairsList] = useState(seedRepairs);
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [generatedToken, setGeneratedToken] = useState(null);
  const [whatsappPreview, setWhatsappPreview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    customer: '',
    phone: '',
    itemType: '',
    problem: '',
    cost: '',
    readyDate: '',
    karigar: '',
    advance: '',
  });

  const handleGenerateToken = () => {
    const nextId = `REP-${String(repairsList.length + 41).padStart(4, '0')}`;
    const newRepair = {
      id: nextId,
      item: form.itemType,
      customer: form.customer,
      phone: form.phone,
      givenDate: new Date().toISOString().split('T')[0],
      readyDate: form.readyDate,
      status: 'Pending',
      cost: Number(form.cost),
      advance: Number(form.advance),
      karigar: form.karigar,
      problem: form.problem,
    };
    setRepairsList([...repairsList, newRepair]);
    setGeneratedToken(newRepair);
    setShowIntakeForm(false);
    setForm({ customer: '', phone: '', itemType: '', problem: '', cost: '', readyDate: '', karigar: '', advance: '' });
  };

  const handleMarkReady = (repairId) => {
    const repair = repairsList.find((r) => r.id === repairId);
    setRepairsList(repairsList.map((r) => (r.id === repairId ? { ...r, status: 'Ready' } : r)));
    setWhatsappPreview(repair);
  };

  const handleMarkDelivered = (repairId) => {
    setRepairsList(repairsList.map((r) => (r.id === repairId ? { ...r, status: 'Delivered' } : r)));
  };

  const filteredRepairs = repairsList.filter((r) => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-heading font-semibold text-[#2C2C2C] flex items-center gap-2">
          <Wrench size={20} className="text-[#C9893C]" />
          Repair Jobs
        </h2>
        <button
          onClick={() => setShowIntakeForm(true)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200"
        >
          <Plus size={14} />
          New Repair
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6E5F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, customer, or item..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-[#E0D8C8] rounded-md focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
          />
        </div>
        <div className="flex items-center bg-[#EDE8DC] rounded-lg p-0.5 border border-[#E0D8C8]">
          {['All', 'Pending', 'In Progress', 'Ready', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1.5 text-[10px] font-medium rounded-md transition-all duration-200 cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#C9A84C] text-[#2C2C2C]'
                  : 'text-[#7A6E5F] hover:text-[#2C2C2C]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Active Repairs Table */}
      <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                <th className="text-left py-2 font-medium">Job ID</th>
                <th className="text-left py-2 font-medium">Item</th>
                <th className="text-left py-2 font-medium">Customer</th>
                <th className="text-left py-2 font-medium">Given</th>
                <th className="text-left py-2 font-medium">Est. Ready</th>
                <th className="text-right py-2 font-medium">Cost</th>
                <th className="text-center py-2 font-medium">Status</th>
                <th className="text-center py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.map((repair, idx) => (
                <tr
                  key={repair.id}
                  className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}
                  style={{
                    borderLeft: repair.status === 'Ready' ? '3px solid #4A7C59' : 'none',
                    backgroundColor: repair.status === 'Ready' ? '#F0FFF4' : undefined,
                  }}
                >
                  <td className="py-2 px-1 font-code text-[11px] font-medium">{repair.id}</td>
                  <td className="py-2 px-1">{repair.item}</td>
                  <td className="py-2 px-1">{repair.customer}</td>
                  <td className="py-2 px-1 text-[#7A6E5F]">{repair.givenDate}</td>
                  <td className="py-2 px-1 text-[#7A6E5F]">{repair.readyDate}</td>
                  <td className="py-2 px-1 text-right font-code">{formatINR(repair.cost)}</td>
                  <td className="py-2 px-1 text-center">
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        color: statusColors[repair.status]?.color,
                        backgroundColor: statusColors[repair.status]?.bg,
                      }}
                    >
                      {repair.status}
                    </span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {repair.status === 'In Progress' && (
                        <button
                          onClick={() => handleMarkReady(repair.id)}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#4A7C59]/10 text-[#4A7C59] font-medium cursor-pointer hover:bg-[#4A7C59]/20 transition-all"
                        >
                          Mark Ready
                        </button>
                      )}
                      {repair.status === 'Ready' && (
                        <button
                          onClick={() => handleMarkDelivered(repair.id)}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#7A6E5F]/10 text-[#7A6E5F] font-medium cursor-pointer hover:bg-[#7A6E5F]/20 transition-all"
                        >
                          Delivered
                        </button>
                      )}
                      {repair.status === 'Pending' && (
                        <button
                          onClick={() => setRepairsList(repairsList.map((r) => r.id === repair.id ? { ...r, status: 'In Progress' } : r))}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#4A6B9C]/10 text-[#4A6B9C] font-medium cursor-pointer hover:bg-[#4A6B9C]/20 transition-all"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intake Form Modal */}
      {showIntakeForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg border border-[#E0D8C8] max-h-[90vh] overflow-y-auto" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold">New Repair Intake</h3>
              <button onClick={() => setShowIntakeForm(false)} className="text-[#7A6E5F] hover:text-[#2C2C2C] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={form.customer}
                    onChange={(e) => setForm({ ...form, customer: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="98XXX-XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Item Type</label>
                <input
                  type="text"
                  value={form.itemType}
                  onChange={(e) => setForm({ ...form, itemType: e.target.value })}
                  className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="e.g. Gold Chain, Ring, Bangle"
                />
              </div>
              <div>
                <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Problem Description</label>
                <textarea
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                  rows={2}
                  placeholder="Describe the issue..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Advance (₹)</label>
                  <input
                    type="number"
                    value={form.advance}
                    onChange={(e) => setForm({ ...form, advance: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Est. Ready Date</label>
                  <input
                    type="date"
                    value={form.readyDate}
                    onChange={(e) => setForm({ ...form, readyDate: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Assign Karigar</label>
                  <select
                    value={form.karigar}
                    onChange={(e) => setForm({ ...form, karigar: e.target.value })}
                    className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 cursor-pointer"
                  >
                    <option value="">Select Karigar</option>
                    {karigars.map((k) => (
                      <option key={k.id} value={k.id}>{k.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerateToken}
                className="w-full mt-2 px-4 py-2.5 text-sm font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200"
              >
                Generate Repair Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Token */}
      {generatedToken && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md border border-[#E0D8C8]" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <div className="p-6 print-area">
              <div className="text-center mb-4">
                <h3 className="text-xl font-heading font-bold text-[#2C2C2C]">Vraj Jewellers</h3>
                <p className="text-[10px] text-[#7A6E5F]">Repair Token</p>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-code font-bold text-[#C9A84C]">{generatedToken.id}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Customer:</span>
                  <span className="font-medium">{generatedToken.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Phone:</span>
                  <span className="font-medium">{generatedToken.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Item:</span>
                  <span className="font-medium">{generatedToken.item}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Given Date:</span>
                  <span className="font-medium">{generatedToken.givenDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Est. Ready:</span>
                  <span className="font-medium">{generatedToken.readyDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Cost:</span>
                  <span className="font-code font-medium">{formatINR(generatedToken.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E5F]">Advance:</span>
                  <span className="font-code font-medium">{formatINR(generatedToken.advance)}</span>
                </div>
              </div>
              {/* QR Placeholder */}
              <div className="mt-4 flex justify-center">
                <div className="w-20 h-20 border-2 border-dashed border-[#E0D8C8] rounded-md flex items-center justify-center text-[10px] text-[#7A6E5F]">
                  QR Code
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[#E0D8C8] flex gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all"
              >
                <Printer size={14} />
                Print Token
              </button>
              <button
                onClick={() => setGeneratedToken(null)}
                className="flex-1 px-4 py-2 text-sm font-medium border border-[#E0D8C8] text-[#7A6E5F] rounded-md cursor-pointer hover:bg-[#EDE8DC] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Preview */}
      {whatsappPreview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-[#E0D8C8]" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
                <MessageCircle size={20} className="text-[#25D366]" />
                WhatsApp Notification
              </h3>
              <button onClick={() => setWhatsappPreview(null)} className="text-[#7A6E5F] hover:text-[#2C2C2C] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="bg-[#DCF8C6] rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Dear {whatsappPreview.customer},</p>
              <p className="mb-2">
                Your repair job <span className="font-code font-semibold">{whatsappPreview.id}</span> ({whatsappPreview.item}) is now <strong>Ready for Pickup</strong>.
              </p>
              <p className="mb-2">Please visit our Alkapuri branch at your convenience.</p>
              <p className="text-[#7A6E5F] text-xs mt-3">— Vraj Jewellers, Alkapuri</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-[#25D366] text-white rounded-md cursor-pointer hover:opacity-90 transition-all">
                <MessageCircle size={14} />
                Send WhatsApp
              </button>
              <button
                onClick={() => setWhatsappPreview(null)}
                className="flex-1 px-4 py-2 text-sm font-medium border border-[#E0D8C8] text-[#7A6E5F] rounded-md cursor-pointer hover:bg-[#EDE8DC] transition-all"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
