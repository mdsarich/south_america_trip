import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Hotel, 
  Compass, 
  Clock, 
  MapPin, 
  Calendar, 
  Copy, 
  Check, 
  Phone, 
  ExternalLink, 
  Luggage, 
  Utensils, 
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { FlightSegment, HotelStay, TourActivity } from '../data/tripData';

interface DetailModalProps {
  item: FlightSegment | HotelStay | TourActivity | null;
  type: 'flight' | 'hotel' | 'activity' | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, type, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!item || !type) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-6 text-slate-200 relative my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* FLIGHT DETAIL */}
        {type === 'flight' && (() => {
          const flight = item as FlightSegment;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {flight.airline} {flight.flightNumber}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-sky-400 font-mono font-bold">
                      Ref: {flight.bookingRef}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                      {flight.cabin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl font-mono font-black text-white">{flight.departCode}</span>
                    <p className="text-xs text-slate-300 font-medium">{flight.departCity}</p>
                    <p className="text-[11px] text-slate-400">{flight.departAirport} {flight.departTerminal && `(${flight.departTerminal})`}</p>
                    <p className="text-xs text-sky-300 font-semibold mt-1">{flight.departDateFormatted} at {flight.departTime}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-black text-white">{flight.arriveCode}</span>
                    <p className="text-xs text-slate-300 font-medium">{flight.arriveCity}</p>
                    <p className="text-[11px] text-slate-400">{flight.arriveAirport} {flight.arriveTerminal && `(${flight.arriveTerminal})`}</p>
                    <p className="text-xs text-sky-300 font-semibold mt-1">{flight.arriveDateFormatted} at {flight.arriveTime}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Duration: <strong>{flight.duration}</strong></span>
                  <span>Aircraft: <strong>{flight.aircraft}</strong></span>
                </div>
              </div>

              {/* E-Tickets */}
              <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-300">Passenger E-Tickets</h4>
                {flight.passengers.map((p) => (
                  <div
                    key={p.name}
                    onClick={() => handleCopy(p.ticketNumber, `modal-${p.name}`)}
                    className="flex items-center justify-between bg-slate-800 p-2 rounded-lg cursor-pointer hover:bg-slate-750 transition text-xs"
                  >
                    <span className="text-slate-200 font-medium">{p.name}</span>
                    <span className="font-mono text-sky-400 font-bold flex items-center gap-1">
                      {p.ticketNumber}
                      {copiedKey === `modal-${p.name}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500" />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Baggage */}
              <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <Luggage className="w-4 h-4 text-sky-400" />
                  <span>Checked: <strong>{flight.baggage.checked}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 pl-6">
                  <span>Carry-on: <strong>{flight.baggage.carryOn}</strong></span>
                </div>
                {flight.baggage.extraNote && (
                  <div className="mt-2 text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20 text-[11px]">
                    {flight.baggage.extraNote}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* HOTEL DETAIL */}
        {type === 'hotel' && (() => {
          const hotel = item as HotelStay;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">{hotel.name}</h3>
                  <p className="text-xs text-sky-400">{hotel.city}, {hotel.country}</p>
                </div>
              </div>

              <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dates:</span>
                  <span className="text-white font-medium">{hotel.checkInDate} → {hotel.checkOutDate} ({hotel.nights} Nights)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room:</span>
                  <span className="text-white font-medium">{hotel.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Board:</span>
                  <span className="text-emerald-400 font-semibold">{hotel.includes}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{hotel.description}</p>

              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-300">Room & Hotel Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                  {hotel.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {hotel.tips && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs text-amber-300">
                  <strong>Insider Tip:</strong> {hotel.tips}
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <a
                  href={`tel:${hotel.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hotel</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>
              </div>
            </div>
          );
        })()}

        {/* ACTIVITY DETAIL */}
        {type === 'activity' && (() => {
          const act = item as TourActivity;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">{act.title}</h3>
                  <p className="text-xs text-sky-400">Day {act.dayNumber} • {act.city}, {act.country}</p>
                </div>
              </div>

              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 text-xs flex flex-wrap gap-3">
                {act.timeSlot && <div>Timing: <strong className="text-white">{act.timeSlot}</strong></div>}
                {act.duration && <div>Duration: <strong className="text-white">{act.duration}</strong></div>}
                {act.serviceType && <div>Type: <strong className="text-white">{act.serviceType}</strong></div>}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{act.description}</p>

              {act.highlights && (
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-300">Tour Highlights</span>
                  {act.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {act.inclusions && (
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Included:</strong> {act.inclusions}
                  </div>
                </div>
              )}

              {act.importantNotes && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200">Notice:</strong> {act.importantNotes}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
