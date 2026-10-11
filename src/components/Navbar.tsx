import React, { useState } from 'react';
import { Plane, Search, Copy, Check, Compass, PhoneCall, Sparkles } from 'lucide-react';
import { TRIP_DATA } from '../data/tripData';
import { OfflineStatusBadge } from './OfflineIndicator';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenConsultant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenConsultant,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Trip Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white truncate">
                  TripIt Pro
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                <span>{TRIP_DATA.title}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-mono">Ref: {TRIP_DATA.bookingReference}</span>
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <OfflineStatusBadge />

            {/* Search toggle on mobile */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`p-2 rounded-lg border transition ${
                showSearchInput || searchQuery
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Search Itinerary"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Consultant Quick Action */}
            <button
              onClick={onOpenConsultant}
              className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition"
              title="Travel Consultant Emergency Contact"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Daniel</span>
            </button>

            {/* Install PWA Button */}
            <PWAInstallButton compact />
          </div>
        </div>

        {/* Collapsible / Mobile Search Bar */}
        {(showSearchInput || searchQuery) && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 animate-fade-in">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flights, hotels, cities, tours, tickets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/90 text-sm text-white placeholder-slate-400 rounded-xl pl-9 pr-8 py-2 border border-slate-700 focus:outline-none focus:border-sky-500 transition"
                autoFocus={showSearchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Booking Codes Tape */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 bg-slate-800/50 rounded-lg px-2.5 py-1 border border-slate-800">
          <div className="flex items-center gap-3 overflow-x-auto py-0.5 no-scrollbar">
            <span className="text-slate-300 font-medium shrink-0">
              {TRIP_DATA.travelers[1].name.split(' ')[0]} & {TRIP_DATA.travelers[0].name.split(' ')[0]}
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleCopy(TRIP_DATA.bookingReference, 'booking')}
              className="flex items-center gap-1 hover:text-white font-mono shrink-0 transition"
              title="Click to copy Eclipse Booking Reference"
            >
              <span>Booking: <strong>{TRIP_DATA.bookingReference}</strong></span>
              {copiedKey === 'booking' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleCopy(TRIP_DATA.flightReservationCode, 'pnr')}
              className="flex items-center gap-1 hover:text-white font-mono shrink-0 transition"
              title="Click to copy Flight Reservation Code"
            >
              <span>Flight PNR: <strong>{TRIP_DATA.flightReservationCode}</strong></span>
              {copiedKey === 'pnr' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </button>
          </div>
          <span className="hidden md:inline-block text-slate-500 text-[10px]">
            25 Jun - 18 Jul 2027
          </span>
        </div>
      </div>
    </header>
  );
};
