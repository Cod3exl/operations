import { useState } from 'react';
import { Hammer, Plus, ChevronDown, ChevronUp, Check, AlertTriangle, Eye, X } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { karigars, karigarJobs } from '../data/karigars';

const statusColors = {
  'In Progress': { bg: '#4A6B9C', text: '#fff' },
  Completed: { bg: '#4A7C59', text: '#fff' },
  Delayed: { bg: '#B94040', text: '#fff' },
  QC: { bg: '#C9893C', text: '#fff' },
};

export default function Karigar() {
  const [jobs, setJobs] = useState(karigarJobs);
  const [expandedKarigar, setExpandedKarigar] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [qcJob, setQcJob] = useState(null);
  const [qcNotes, setQcNotes] = useState('');

  const getKarigarJobs = (karigarId) => jobs.filter((j) => j.karigarId === karigarId);

  const handleMarkComplete = (jobId) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: 'Completed' } : j)));
  };

  const handleFlagDelayed = (jobId) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: 'Delayed' } : j)));
  };

  const handleSendToQC = (jobId) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: 'QC' } : j)));
  };

  const handleQCPass = (jobId) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: 'Completed' } : j)));
    setQcJob(null);
    setQcNotes('');
  };

  const handleQCFail = (jobId) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: 'In Progress' } : j)));
    setQcJob(null);
    setQcNotes('');
  };

  const activeJobs = jobs.filter((j) => j.status !== 'Completed');
  const completedJobs = jobs.filter((j) => j.status === 'Completed');

  const totalGoldOut = jobs.reduce((sum, j) => sum + j.goldOut, 0);
  const totalGoldReturned = completedJobs.reduce((sum, j) => sum + j.goldOut, 0);

  return (
    <div className="space-y-4">
      {/* Karigar Cards */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-[#2C2C2C]">Karigars</h2>
        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200"
        >
          <Plus size={14} />
          Assign New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {karigars.map((karigar) => {
          const kJobs = getKarigarJobs(karigar.id);
          const isExpanded = expandedKarigar === karigar.id;
          return (
            <div key={karigar.id} className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-sm font-semibold text-[#C9A84C]">
                  {karigar.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#2C2C2C]">{karigar.name}</h4>
                  <p className="font-code text-[10px] text-[#7A6E5F]">{karigar.id}</p>
                  <p className="text-[11px] text-[#7A6E5F] mt-0.5">{karigar.speciality}</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#4A6B9C]/10 text-[#4A6B9C]">
                  {karigar.activeJobs} jobs
                </span>
              </div>
              <button
                onClick={() => setExpandedKarigar(isExpanded ? null : karigar.id)}
                className="mt-3 w-full flex items-center justify-center gap-1 text-[11px] text-[#C9A84C] font-medium cursor-pointer hover:underline"
              >
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {isExpanded ? 'Hide Jobs' : 'View Jobs'}
              </button>
              {isExpanded && (
                <div className="mt-3 space-y-2 border-t border-[#E0D8C8] pt-3">
                  {kJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-2 rounded-md text-[11px] border"
                      style={{
                        borderColor: job.status === 'Delayed' ? '#B94040' : '#E0D8C8',
                        backgroundColor: job.status === 'Delayed' ? '#FFF0F0' : '#F5F0E8',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-code font-medium">{job.id}</span>
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: statusColors[job.status]?.bg,
                            color: statusColors[job.status]?.text,
                          }}
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-[#2C2C2C] mt-1">{job.item}</p>
                      <p className="text-[#7A6E5F]">Due: {job.dueDate} | Gold: {job.goldOut}g</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Jobs Table */}
      <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
          <Hammer size={16} className="text-[#C9A84C]" />
          Active Jobs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                <th className="text-left py-2 font-medium">Job ID</th>
                <th className="text-left py-2 font-medium">Item</th>
                <th className="text-left py-2 font-medium">Karigar</th>
                <th className="text-left py-2 font-medium">Given</th>
                <th className="text-left py-2 font-medium">Due</th>
                <th className="text-right py-2 font-medium">Gold (g)</th>
                <th className="text-right py-2 font-medium">Advance</th>
                <th className="text-center py-2 font-medium">Status</th>
                <th className="text-center py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeJobs.map((job, idx) => {
                const karigar = karigars.find((k) => k.id === job.karigarId);
                return (
                  <tr
                    key={job.id}
                    className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}
                    style={{
                      borderLeft: job.status === 'Delayed' ? '3px solid #B94040' : 'none',
                      backgroundColor: job.status === 'Delayed' ? '#FFF0F0' : undefined,
                    }}
                  >
                    <td className="py-2 px-1 font-code text-[11px]">{job.id}</td>
                    <td className="py-2 px-1">{job.item}</td>
                    <td className="py-2 px-1">{karigar?.name}</td>
                    <td className="py-2 px-1 text-[#7A6E5F]">{job.givenDate}</td>
                    <td className="py-2 px-1 text-[#7A6E5F]">{job.dueDate}</td>
                    <td className="py-2 px-1 text-right font-code">{job.goldOut}</td>
                    <td className="py-2 px-1 text-right font-code">{formatINR(job.advance)}</td>
                    <td className="py-2 px-1 text-center">
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: statusColors[job.status]?.bg,
                          color: statusColors[job.status]?.text,
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-2 px-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {job.status === 'QC' ? (
                          <button
                            onClick={() => setQcJob(job)}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-[#C9893C]/10 text-[#C9893C] font-medium cursor-pointer hover:bg-[#C9893C]/20 transition-all"
                          >
                            QC Review
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleMarkComplete(job.id)}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#4A7C59]/10 text-[#4A7C59] font-medium cursor-pointer hover:bg-[#4A7C59]/20 transition-all"
                              title="Mark Complete"
                            >
                              <Check size={10} />
                            </button>
                            <button
                              onClick={() => handleFlagDelayed(job.id)}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#B94040]/10 text-[#B94040] font-medium cursor-pointer hover:bg-[#B94040]/20 transition-all"
                              title="Flag Delayed"
                            >
                              <AlertTriangle size={10} />
                            </button>
                            <button
                              onClick={() => handleSendToQC(job.id)}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#4A6B9C]/10 text-[#4A6B9C] font-medium cursor-pointer hover:bg-[#4A6B9C]/20 transition-all"
                              title="Send to QC"
                            >
                              <Eye size={10} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Material Reconciliation */}
      <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Material Reconciliation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F5F0E8] rounded-md p-3 text-center">
            <span className="text-[10px] text-[#7A6E5F] block">Total Gold Out</span>
            <span className="text-lg font-code font-semibold text-[#2C2C2C]">{totalGoldOut.toFixed(1)}g</span>
          </div>
          <div className="bg-[#F5F0E8] rounded-md p-3 text-center">
            <span className="text-[10px] text-[#7A6E5F] block">Gold Returned</span>
            <span className="text-lg font-code font-semibold text-[#4A7C59]">{totalGoldReturned.toFixed(1)}g</span>
          </div>
          <div className="bg-[#F5F0E8] rounded-md p-3 text-center">
            <span className="text-[10px] text-[#7A6E5F] block">Outstanding</span>
            <span className="text-lg font-code font-semibold text-[#C9893C]">{(totalGoldOut - totalGoldReturned).toFixed(1)}g</span>
          </div>
        </div>
      </div>

      {/* Completed Jobs Log */}
      {completedJobs.length > 0 && (
        <div className="bg-white border border-[#E0D8C8] rounded-lg p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-sm font-semibold text-[#2C2C2C] mb-3">Completed Jobs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#7A6E5F] border-b border-[#E0D8C8]">
                  <th className="text-left py-2 font-medium">Job ID</th>
                  <th className="text-left py-2 font-medium">Item</th>
                  <th className="text-left py-2 font-medium">Karigar</th>
                  <th className="text-right py-2 font-medium">Gold (g)</th>
                  <th className="text-center py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.map((job, idx) => {
                  const karigar = karigars.find((k) => k.id === job.karigarId);
                  return (
                    <tr key={job.id} className={idx % 2 === 0 ? 'bg-[#F5F0E8]' : 'bg-[#EDE8DC]'}>
                      <td className="py-2 px-1 font-code text-[11px]">{job.id}</td>
                      <td className="py-2 px-1">{job.item}</td>
                      <td className="py-2 px-1">{karigar?.name}</td>
                      <td className="py-2 px-1 text-right font-code">{job.goldOut}</td>
                      <td className="py-2 px-1 text-center">
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#4A7C59] text-white">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QC Review Inline */}
      {qcJob && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-[#E0D8C8]" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold">QC Review — {qcJob.id}</h3>
              <button onClick={() => setQcJob(null)} className="text-[#7A6E5F] hover:text-[#2C2C2C] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-[#7A6E5F] mb-2">Item: {qcJob.item}</p>
            <p className="text-sm text-[#7A6E5F] mb-4">Gold: {qcJob.goldOut}g</p>
            <label className="text-xs text-[#7A6E5F] font-medium block mb-1">QC Notes</label>
            <textarea
              value={qcNotes}
              onChange={(e) => setQcNotes(e.target.value)}
              className="w-full p-3 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
              rows={3}
              placeholder="Enter QC observations..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleQCPass(qcJob.id)}
                className="flex-1 px-4 py-2 text-sm font-semibold bg-[#4A7C59] text-white rounded-md cursor-pointer hover:opacity-90 transition-all"
              >
                Pass
              </button>
              <button
                onClick={() => handleQCFail(qcJob.id)}
                className="flex-1 px-4 py-2 text-sm font-semibold bg-[#B94040] text-white rounded-md cursor-pointer hover:opacity-90 transition-all"
              >
                Fail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign New Job Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg border border-[#E0D8C8]" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold">Assign New Job</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-[#7A6E5F] hover:text-[#2C2C2C] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Karigar</label>
                <select className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 cursor-pointer">
                  <option value="">Select Karigar</option>
                  {karigars.map((k) => (
                    <option key={k.id} value={k.id}>{k.name} — {k.speciality}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Item Description</label>
                <input type="text" className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" placeholder="e.g. Kundan Necklace Set" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Gold Out (g)</label>
                  <input type="number" className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" placeholder="0.0" />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Advance (₹)</label>
                  <input type="number" className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Given Date</label>
                  <input type="date" className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E5F] font-medium block mb-1">Due Date</label>
                  <input type="date" className="w-full p-2.5 border border-[#E0D8C8] rounded-md text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 cursor-pointer" />
                </div>
              </div>
              <button className="w-full mt-2 px-4 py-2.5 text-sm font-semibold bg-[#C9A84C] text-[#2C2C2C] rounded-md cursor-pointer hover:opacity-90 transition-all duration-200">
                Assign Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
