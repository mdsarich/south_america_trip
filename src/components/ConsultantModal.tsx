import React from 'react';
import { X, Phone, Mail, MapPin, ShieldCheck, UserCheck, Clock } from 'lucide-react';
import { TRIP_DATA } from '../data/tripData';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultantModal: React.FC<ConsultantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { consultant, bookingReference } = TRIP_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            DT
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{consultant.name}</h3>
            <p className="text-xs text-sky-400 font-medium">{consultant.role}</p>
            <p className="text-[11px] text-slate-400">{consultant.agency}</p>
          </div>
        </div>

        {/* Booking tag */}
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-3 mb-5 flex items-center justify-between text-xs">
          <span className="text-slate-300">Your Booking Reference:</span>
          <span className="font-mono font-bold text-sky-300 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
            {bookingReference}
          </span>
        </div>

        {/* Emergency & Direct Lines */}
        <div className="space-y-2.5 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Contact Numbers</p>
          
          <a
            href={`tel:${consultant.phoneAU.replace(/\s+/g, '')}`}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-300">Australia (Sydney HQ)</div>
                <div className="font-mono text-sm text-white">{consultant.phoneAU}</div>
              </div>
            </div>
            <span className="text-xs text-sky-400 font-medium group-hover:underline">Call</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${consultant.phoneNZ.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-white transition"
            >
              <div className="text-left text-xs">
                <span className="text-slate-400 block text-[10px]">New Zealand</span>
                <span className="font-mono text-xs">{consultant.phoneNZ}</span>
              </div>
            </a>
            <a
              href={`tel:${consultant.phoneUS.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-white transition"
            >
              <div className="text-left text-xs">
                <span className="text-slate-400 block text-[10px]">USA / Canada</span>
                <span className="font-mono text-xs">{consultant.phoneUS}</span>
              </div>
            </a>
          </div>

          <a
            href={`mailto:${consultant.email}?subject=Itinerary Reference ${bookingReference} - Michael & Elissa Sarich`}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-300">Email Consultant</div>
                <div className="text-xs text-sky-300 truncate">{consultant.email}</div>
              </div>
            </div>
            <span className="text-xs text-sky-400 font-medium group-hover:underline">Email</span>
          </a>
        </div>

        {/* Agency Info */}
        <div className="border-t border-slate-800 pt-4 text-xs space-y-2 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>24/7 Emergency support with trusted local operators across Latin America</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Eclipse Travel General Line: <strong>1300 575 752</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{consultant.agencyAddress}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
