import React, { useState } from 'react';
import { X, FilePlus, Check, AlertTriangle } from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const CreateReportModal = ({ isOpen, onClose }) => {
  const { addReport, settings } = useInvestigation();

  const [title, setTitle] = useState('');
  const [suspectEntity, setSuspectEntity] = useState('');
  const [amountExposed, setAmountExposed] = useState('');
  const [priority, setPriority] = useState('High');
  const [primaryOffense, setPrimaryOffense] = useState('Structuring & Rapid Layering');
  const [narrative, setNarrative] = useState('');

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setSuspectEntity('');
    setAmountExposed('');
    setPriority('High');
    setPrimaryOffense('Structuring & Rapid Layering');
    setNarrative('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !suspectEntity.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    const amount = Number(amountExposed || 0);

    if (!Number.isFinite(amount) || amount < 0) {
      setError('Please enter a valid amount.');
      return;
    }

    const newId = `MAN-${Date.now().toString().slice(-8)}`;

    const riskScore = {
      Critical: 95,
      High: 80,
      Medium: 55,
      Low: 20
    }[priority];

    const newReport = {
      id: newId,

      title: title.trim(),

      suspectEntity: suspectEntity.trim(),

      primaryOffense,

      filingStatus: 'Draft',

      filingDate: new Date().toISOString().slice(0, 10),

      priority,

      riskScore,

      amountExposed: amount,

      currency: 'INR',

      leadInvestigator:
        settings?.analystName || 'Investigation Analyst',

      narrative:
        narrative.trim() ||
        'A demonstration investigation record has been created. Further investigation and analyst verification are required.',

      timeline: [
        {
          time: new Date().toLocaleString(),
          event: `Demonstration report ${newId} created manually.`
        }
      ],

      violations: [
        primaryOffense
      ],

      exhibits: [],

      recommendation:
        'Review the available information, verify supporting evidence, and complete analyst assessment before taking further action.',

      jurisdictions: ['India'],

      isDemo: true,

      dataSource: 'Manually Created Demonstration Record'
    };

    addReport(newReport);

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-xl bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0e1728] flex items-center justify-between">

          <div className="flex items-center gap-2.5">

            <FilePlus className="w-5 h-5 text-blue-400" />

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Create Investigation Report
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                Prototype Demonstration Record
              </p>
            </div>

          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">

          {/* Notice */}
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/30 flex items-start gap-2">

            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />

            <p className="text-[11px] text-slate-400 leading-relaxed">
              This creates a prototype investigation record only.
              It does not submit a regulatory report or confirm financial crime.
            </p>

          </div>

          {/* Title */}
          <div>

            <label className="block text-slate-300 font-semibold mb-1">
              Investigation Title *
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter investigation title"
              className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Entity and Amount */}
          <div className="grid grid-cols-2 gap-3">

            <div>

              <label className="block text-slate-300 font-semibold mb-1">
                Suspect Entity / Account *
              </label>

              <input
                type="text"
                required
                value={suspectEntity}
                onChange={e => setSuspectEntity(e.target.value)}
                placeholder="e.g. ACC001"
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-1">
                Amount Reviewed (INR)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={amountExposed}
                onChange={e => setAmountExposed(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* Priority and Risk */}
          <div className="grid grid-cols-2 gap-3">

            <div>

              <label className="block text-slate-300 font-semibold mb-1">
                Priority Level
              </label>

              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-1">
                Primary Risk Indicator
              </label>

              <select
                value={primaryOffense}
                onChange={e => setPrimaryOffense(e.target.value)}
                className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option>Structuring & Rapid Layering</option>
                <option>High-Value Transaction</option>
                <option>Multiple Rapid Transactions</option>
                <option>Unusual Transaction Pattern</option>
                <option>Suspicious Account Activity</option>
                <option>Other Suspicious Activity</option>
              </select>

            </div>

          </div>

          {/* Narrative */}
          <div>

            <label className="block text-slate-300 font-semibold mb-1">
              Investigation Summary / Narrative
            </label>

            <textarea
              rows="4"
              value={narrative}
              onChange={e => setNarrative(e.target.value)}
              placeholder="Describe suspicious indicators, transaction patterns, and available evidence..."
              className="w-full bg-[#090e1a] border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">

            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20"
            >
              <Check className="w-4 h-4" />
              Create Demo Report
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};