import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  Luggage, 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  Info,
  Calendar,
  CheckCircle2,
  Users
} from 'lucide-react';
import { FlightSegment, TRIP_DATA } from '../data/tripData';

interface FlightsViewProps {
  searchQuery?: string;
  onSelectFlight?: (flight: FlightSegment) => void;
}

export const FlightsView: React.FC<FlightsViewProps> = ({ searchQuery = '', onSelectFlight }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'outbound' | 'internal' | 'return'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCategory = (index: number): 'outbound' | 'internal' | 'return' => {
    if (index < 3) return 'outbound';
    if (index < 7) return 'internal';
    return 'return';
  };

  const filteredFlights = TRIP_DATA.flights.filter((flight, idx) => {
    const category = getCategory(idx);
    const matchesCategory = filterCategory === 'all' || filterCategory === category;
    
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(query) ||
      flight.airline.toLowerCase().includes(query) ||
      flight.departCity.toLowerCase().includes(query) ||
      flight.arriveCity.toLowerCase().includes(query) ||
      flight.departCode.toLowerCase().includes(query) ||
      flight.arriveCode.toLowerCase().includes(query) ||
      flight.bookingRef.toLowerCase().includes(query) ||
      flight.passengers.some(p => p.ticketNumber.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Flight Summary Card */}
      <div className="bg-gradient-to-r from-sky-950/80 to-slate-900 border border-sky-800/40 rounded-2xl p-4 text-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
                All-Air Travel Pass
              </span>
              <span className="text-xs text-slate-400">10 Total Flights</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Confirmed Flight Itinerary</h2>
            <p className="text-xs text-slate-400">
              Qantas Airways, LATAM Airlines Group & Aerolineas Argentinas
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">Master PNR:</span>
            <button
              onClick={(e) => handleCopy(TRIP_DATA.flightReservationCode, 'master-pnr', e)}
              className="font-mono font-bold text-sky-400 hover:text-white flex items-center gap-1 transition"
              title="Copy Master PNR"
            >
              <span>{TRIP_DATA.flightReservationCode}</span>
              {copiedKey === 'master-pnr' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Baggage Advisory Pill */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong>Baggage Notice:</strong> Flight AR1780 (Buenos Aires to Iguazu) has a <strong>15kg checked limit</strong>.
            All other LATAM & Qantas flights include <strong>23kg checked + 16kg carry-on</strong>. Luggage on AR1780 can be increased to 23kg at check-in for ~AUD $60.
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'all', label: 'All 10 Flights' },
          { id: 'outbound', label: 'Outbound (Australia → SA)' },
          { id: 'internal', label: 'Internal SA Flights' },
          { id: 'return', label: 'Return (SA → Australia)' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilterCategory(btn.id as any)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition active:scale-95 ${
              filterCategory === btn.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Flights List */}
      <div className="space-y-4">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 p-6">
            <Plane className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm font-medium">No flights match your search query.</p>
          </div>
        ) : (
          filteredFlights.map((flight, idx) => {
            const isAerolineas = flight.airlineCode === 'AR';
            const isQantas = flight.airlineCode === 'QF';
            const isLatam = flight.airlineCode === 'LA';

            return (
              <div
                key={flight.id}
                onClick={() => onSelectFlight?.(flight)}
                className="bg-slate-800/90 hover:bg-slate-800/95 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden transition group cursor-pointer"
              >
                {/* Header Strip */}
                <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm tracking-wide">
                      {flight.airline}
                    </span>
                    <span className="font-mono text-sky-400 font-bold bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
                      {flight.flightNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
                        flight.cabin === 'Business'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : flight.cabin === 'Premium Economy'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {flight.cabin}
                    </span>
                    <span className="hidden xs:inline-flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* Main Flight Path Visualizer */}
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-12 items-center gap-2">
                    {/* Departure info */}
                    <div className="col-span-4 text-left">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {flight.departCode}
                      </div>
                      <div className="text-sm font-semibold text-slate-200 mt-0.5">
                        {flight.departTime}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {flight.departCity.split(',')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {flight.departDateFormatted}
                      </div>
                      {flight.departTerminal && (
                        <div className="text-[10px] text-sky-400/90 font-medium truncate mt-0.5">
                          {flight.departTerminal}
                        </div>
                      )}
                    </div>

                    {/* Flight Duration & Line Indicator */}
                    <div className="col-span-4 flex flex-col items-center justify-center text-center px-1">
                      <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 mb-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{flight.duration}</span>
                      </div>
                      <div className="w-full flex items-center relative my-1">
                        <div className="h-[2px] bg-slate-600 w-full" />
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-slate-900 border border-slate-700 rounded-full p-1 text-sky-400 shadow">
                          <Plane className="w-3.5 h-3.5 rotate-90" />
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-full font-mono mt-1">
                        {flight.aircraft}
                      </div>
                    </div>

                    {/* Arrival info */}
                    <div className="col-span-4 text-right">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {flight.arriveCode}
                      </div>
                      <div className="text-sm font-semibold text-slate-200 mt-0.5">
                        {flight.arriveTime}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {flight.arriveCity.split(',')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {flight.arriveDateFormatted}
                      </div>
                      {flight.arriveTerminal && (
                        <div className="text-[10px] text-sky-400/90 font-medium truncate mt-0.5">
                          {flight.arriveTerminal}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Booking Code & Baggage details */}
                  <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* Airline Reference */}
                    <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[11px]">Airline Reference:</span>
                      <button
                        onClick={(e) => handleCopy(flight.bookingRef, `pnr-${flight.id}`, e)}
                        className="font-mono font-bold text-sky-300 hover:text-white flex items-center gap-1.5 transition"
                        title="Copy Airline Reference"
                      >
                        <span>{flight.bookingRef}</span>
                        {copiedKey === `pnr-${flight.id}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-500" />
                        )}
                      </button>
                    </div>

                    {/* Baggage summary */}
                    <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-slate-400" />
                        <span>Baggage:</span>
                      </span>
                      <span className={`text-[11px] font-medium ${isAerolineas ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                        {flight.baggage.checked}
                      </span>
                    </div>
                  </div>

                  {/* Passengers & E-Tickets Accordion */}
                  <div className="mt-2.5 bg-slate-900/80 rounded-xl p-2.5 border border-slate-800/90">
                    <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>E-Ticket Numbers (Tap to copy for airport check-in)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {flight.passengers.map((p) => (
                        <div
                          key={p.name}
                          onClick={(e) => handleCopy(p.ticketNumber, `ticket-${flight.id}-${p.name}`, e)}
                          className="flex items-center justify-between bg-slate-800/80 hover:bg-slate-850 p-2 rounded-lg border border-slate-700/50 cursor-pointer transition text-xs"
                          title="Click to copy E-Ticket Number"
                        >
                          <span className="text-slate-300 font-medium text-[11px]">{p.name}:</span>
                          <span className="font-mono text-sky-300 font-bold flex items-center gap-1 text-[11px]">
                            {p.ticketNumber}
                            {copiedKey === `ticket-${flight.id}-${p.name}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {flight.baggage.extraNote && (
                    <div className="mt-2 text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{flight.baggage.extraNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
