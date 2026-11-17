import React from 'react';
import {
  X,
  FileCheck2,
  Printer,
  Download,
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle2
} from 'lucide-react';

import { RiskBadge } from '../common/RiskBadge';

export const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(Number(amount || 0));

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(report, null, 2));

    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = `${report.id}_Investigation_Report.json`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const statusColors = {
    'FinCEN Submitted':
      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Under Review':
      'bg-sky-500/20 text-sky-400 border-sky-500/30',
    Draft:
      'bg-slate-700/40 text-slate-300 border-slate-600',
    Closed:
      'bg-slate-800 text-slate-400 border-slate-700'
  };

  // Safely handle evidence records
  const exhibits = Array.isArray(report.exhibits)
    ? report.exhibits
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

      {/* Background */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#0a101d] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-[#0d1628] flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">

                <span className="font-mono text-sm font-bold text-white">
                  {report.id}
                </span>

                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                    statusColors[report.filingStatus] || statusColors.Draft
                  }`}
                >
                  {report.filingStatus || 'Draft'}
                </span>

                <RiskBadge
                  level={report.priority || 'Low'}
                  score={report.riskScore || 0}
                  size="sm"
                />

              </div>

              <h2 className="text-base font-bold text-slate-100 mt-1">
                {report.title || 'Investigation Report'}
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleExportJSON}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              title="Export JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6 text-xs text-slate-300">

          {/* Prototype Notice */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">

            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Prototype investigation record. This report does not represent
              an actual regulatory filing or confirmed financial crime.
              All findings require human analyst verification.
            </p>

          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d1424] p-4 rounded-xl border border-slate-800">

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Suspect Entity
              </span>

              <span className="text-sm font-semibold text-white break-words block mt-1">
                {report.suspectEntity || 'Not specified'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Amount Reviewed
              </span>

              <span className="text-sm font-bold font-mono text-cyan-400 block mt-1">
                {formatCurrency(report.amountExposed)}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Created Date
              </span>

              <span className="text-sm font-mono text-slate-200 block mt-1">
                {report.filingDate || 'Not available'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Risk Score
              </span>

              <span className="text-sm font-bold font-mono text-amber-400 block mt-1">
                {report.riskScore ?? 'N/A'}
                {report.riskScore != null ? '/100' : ''}
              </span>
            </div>

          </div>

          {/* Risk Indicator */}
          <div className="space-y-2">

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Risk Indicator
            </h4>

            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">

              <div className="flex items-center gap-2">

                <AlertTriangle className="w-4 h-4 text-amber-400" />

                <span className="text-sm text-slate-200">
                  {report.primaryOffense || 'Not specified'}
                </span>

              </div>

            </div>
          </div>

          {/* Section 1: Investigation Summary */}
          <div className="space-y-2">

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Section 1: Investigation Summary
            </h4>

            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 leading-relaxed text-slate-200 whitespace-pre-wrap">
              {report.narrative || 'No investigation summary available.'}
            </div>

          </div>

          {/* Section 2: Investigation Timeline */}
          {Array.isArray(report.timeline) && report.timeline.length > 0 && (

            <div className="space-y-2">

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Section 2: Investigation Timeline
              </h4>

              <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 space-y-3">

                {report.timeline.map((item, index) => (

                  <div key={index} className="flex items-start gap-3">

                    <Clock className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />

                    <div>

                      <span className="font-mono text-[11px] text-sky-400">
                        {item.time || 'Time unavailable'}
                      </span>

                      <p className="text-slate-300 leading-relaxed mt-1">
                        {item.event || 'Investigation event'}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Section 3: Identified Indicators */}
          {Array.isArray(report.violations) && report.violations.length > 0 && (

            <div className="space-y-2">

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Section 3: Identified Indicators
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                {report.violations.map((item, index) => (

                  <div
                    key={index}
                    className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2"
                  >

                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />

                    <span>{item}</span>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Section 4: Supporting Evidence */}
          <div className="space-y-2">

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Section 4: Supporting Evidence
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

              {exhibits.length > 0 ? (

                exhibits.map((item, index) => {

                  const evidence =
                    typeof item === 'string'
                      ? { name: item }
                      : item || {};

                  return (

                    <div
                      key={index}
                      className="p-3 rounded-lg bg-[#0d1424] border border-slate-800 flex items-center gap-2.5"
                    >

                      <FileText className="w-4 h-4 text-blue-400 shrink-0" />

                      <div className="min-w-0">

                        <span className="font-medium text-slate-200 block truncate">
                          {evidence.name || 'Evidence'}
                        </span>

                        <span className="text-[10px] text-slate-400">
                          {evidence.type || 'Supporting Evidence'}
                          {' • '}
                          {evidence.size || 'Size unavailable'}
                        </span>

                      </div>

                    </div>

                  );

                })

              ) : (

                <div className="col-span-full p-4 rounded-xl bg-[#0d1424] border border-dashed border-slate-700 flex items-center gap-3">

                  <FileText className="w-5 h-5 text-slate-500 shrink-0" />

                  <div>

                    <p className="text-sm font-medium text-slate-300">
                      No supporting evidence attached yet
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1">
                      Evidence records can be added after analyst verification.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* Section 5: Recommended Next Steps */}
          <div className="space-y-2">

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Section 5: Recommended Next Steps
            </h4>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-[#0d1424] border border-blue-500/30 space-y-3">

              <p className="text-xs text-slate-200 leading-relaxed">
                {report.recommendation ||
                  'Further investigation and analyst verification are recommended.'}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap text-[11px] text-slate-400">

                <span>
                  Lead Analyst:{' '}
                  <strong className="text-white">
                    {report.leadInvestigator || 'Not assigned'}
                  </strong>
                </span>

                <span className="font-mono text-amber-400 flex items-center gap-1">

                  <CheckCircle2 className="w-3.5 h-3.5" />

                  Pending Human Verification

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1628] flex items-center justify-between text-xs">

          <span className="text-slate-400 font-mono text-[11px]">
            FinShield • Prototype Investigation Dossier
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Report
          </button>

        </div>

      </div>

    </div>
  );
};