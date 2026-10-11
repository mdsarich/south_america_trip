import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Utensils, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Ticket,
  Users
} from 'lucide-react';
import { TourActivity, TRIP_DATA } from '../data/tripData';

interface ActivitiesViewProps {
  searchQuery?: string;
  onSelectActivity?: (activity: TourActivity) => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ searchQuery = '', onSelectActivity }) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const cities = ['all', 'Buenos Aires', 'Puerto Iguazú / Foz do Iguaçu', 'Rio de Janeiro', 'Cusco / Sacred Valley', 'Lima'];

  // Only activities that are Tours, Activities, or Dining
  const allTours = TRIP_DATA.activities.filter(a => a.type !== 'Transfer');

  const filteredActivities = allTours.filter((act) => {
    // City filter
    let cityMatch = true;
    if (selectedCity === 'Buenos Aires') cityMatch = act.city.includes('Buenos Aires');
    else if (selectedCity === 'Puerto Iguazú / Foz do Iguaçu') cityMatch = act.city.includes('Iguaz') || act.city.includes('Foz');
    else if (selectedCity === 'Rio de Janeiro') cityMatch = act.city.includes('Rio');
    else if (selectedCity === 'Cusco / Sacred Valley') cityMatch = act.city.includes('Cusco') || act.city.includes('Sacred') || act.city.includes('Machu');
    else if (selectedCity === 'Lima') cityMatch = act.city.includes('Lima');

    // Type filter
    let typeMatch = true;
    if (selectedType === 'tour') typeMatch = act.type === 'Tour';
    else if (selectedType === 'dining') typeMatch = act.type === 'Dining';
    else if (selectedType === 'free') typeMatch = act.type === 'Free Day';

    if (!searchQuery) return cityMatch && typeMatch;

    const q = searchQuery.toLowerCase();
    const searchMatch =
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.city.toLowerCase().includes(q) ||
      act.highlights?.some(h => h.toLowerCase().includes(q));

    return cityMatch && typeMatch && searchMatch;
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-800/40 rounded-2xl p-4 text-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Excursions & Experiences
              </span>
              <span className="text-xs text-slate-400">14 Tailormade Tours & Shows</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Guided Tours & Highlights</h2>
            <p className="text-xs text-slate-400">
              Private local guides, Machu Picchu Circuit 2A, Iguazu Falls, Tango, and Gastronomy
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <Ticket className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300">All Admissions Included</span>
          </div>
        </div>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition active:scale-95 ${
              selectedCity === city
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {city === 'all' ? 'All Destinations' : city}
          </button>
        ))}
      </div>

      {/* Type sub-filter */}
      <div className="flex items-center gap-2 text-xs">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'tour', label: 'Guided Tours' },
          { id: 'dining', label: 'Dining & Food Tours' },
          { id: 'free', label: 'Leisure / Free Days' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              selectedType === t.id
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Activities Feed */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 p-6">
            <Compass className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm font-medium">No activities match your filter criteria.</p>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const isDining = act.type === 'Dining';
            const isFree = act.type === 'Free Day';
            const isPrivate = act.serviceType === 'Private';

            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity?.(act)}
                className="bg-slate-800/90 hover:bg-slate-800/95 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden transition group cursor-pointer"
              >
                {/* Header Strip */}
                <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-sky-300 border border-slate-700">
                      Day {act.dayNumber}
                    </span>
                    <span className="text-slate-400 font-medium">{act.date}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-300 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {act.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {act.serviceType && (
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
                          isPrivate
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : isFree
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {act.serviceType}
                      </span>
                    )}

                    {act.type && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                        {act.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition leading-snug">
                      {act.title}
                    </h3>
                  </div>

                  {/* Timing & Duration strip */}
                  {(act.timeSlot || act.duration) && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      {act.timeSlot && (
                        <div className="flex items-center gap-1.5 text-sky-300 font-medium">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span>{act.timeSlot}</span>
                        </div>
                      )}
                      {act.duration && (
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <span>Duration: <strong>{act.duration}</strong></span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {act.highlights && act.highlights.length > 0 && (
                    <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Experience Highlights</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {act.highlights.map((item, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inclusions Pill */}
                  {act.inclusions && (
                    <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2">
                      <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Included:</strong> {act.inclusions}
                      </div>
                    </div>
                  )}

                  {/* Important Notes */}
                  {act.importantNotes && (
                    <div className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-200">Note:</strong> {act.importantNotes}
                      </div>
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
