import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  Phone, 
  Calendar, 
  Moon, 
  Coffee, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Compass, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { HotelStay, TRIP_DATA } from '../data/tripData';

interface LodgingViewProps {
  searchQuery?: string;
  onSelectHotel?: (hotel: HotelStay) => void;
}

export const LodgingView: React.FC<LodgingViewProps> = ({ searchQuery = '', onSelectHotel }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredHotels = TRIP_DATA.hotels.filter((hotel) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(q) ||
      hotel.city.toLowerCase().includes(q) ||
      hotel.country.toLowerCase().includes(q) ||
      hotel.roomType.toLowerCase().includes(q) ||
      hotel.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Lodging Header Card */}
      <div className="bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 text-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Accommodations
              </span>
              <span className="text-xs text-slate-400">6 Luxury Properties • 20 Total Nights</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Confirmed Hotel Vouchers</h2>
            <p className="text-xs text-slate-400">
              Double Bedding Configuration Requested • Breakfast Included at All Properties
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Daily Breakfast Included</span>
          </div>
        </div>
      </div>

      {/* Hotel Cards List */}
      <div className="space-y-4">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 p-6">
            <Hotel className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm font-medium">No hotels match your search query.</p>
          </div>
        ) : (
          filteredHotels.map((hotel, index) => {
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel?.(hotel)}
                className="bg-slate-800/90 hover:bg-slate-800/95 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden transition group cursor-pointer"
              >
                {/* Header bar */}
                <div className="bg-slate-800 px-4 py-3 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center shrink-0 border border-sky-500/30">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base tracking-tight leading-tight">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-sky-400 font-medium">
                        {hotel.city}, {hotel.country}
                      </p>
                    </div>
                  </div>

                  {/* Night stay badge */}
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-700 text-xs text-slate-300 font-medium">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{hotel.nights} Nights</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  {/* Dates & Room Info Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Check-In / Check-Out</div>
                        <div className="text-white font-medium">
                          {hotel.checkInDate} → {hotel.checkOutDate}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
                      <Hotel className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Room Type</div>
                        <div className="text-white font-medium truncate max-w-[200px]">
                          {hotel.roomType}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/60 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>

                  {/* Travel Insider Tip */}
                  {hotel.tips && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs text-amber-300 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <strong className="text-amber-200">Traveler Tip:</strong> {hotel.tips}
                      </div>
                    </div>
                  )}

                  {/* Address & Direct Action Buttons */}
                  <div className="pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* One-tap Copy Address for Uber/Taxi */}
                      <button
                        onClick={(e) => handleCopy(hotel.address, `addr-${hotel.id}`, e)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition active:scale-95"
                        title="Copy address for taxi"
                      >
                        {copiedKey === `addr-${hotel.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>

                      {/* Call Hotel */}
                      <a
                        href={`tel:${hotel.phone.replace(/[^0-9+]/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1 transition active:scale-95"
                        title="Call Hotel Desk"
                      >
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>Call</span>
                      </a>

                      {/* Open Maps */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-1 transition active:scale-95"
                        title="Open in Maps"
                      >
                        <ExternalLink className="w-3 h-3 text-sky-400" />
                        <span>Map</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
