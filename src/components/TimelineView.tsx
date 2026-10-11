import React, { useState } from 'react';
import { 
  Plane, 
  Hotel, 
  Compass, 
  Car, 
  Utensils, 
  Coffee, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Phone,
  Moon
} from 'lucide-react';
import { TRIP_DATA, FlightSegment, HotelStay, TourActivity } from '../data/tripData';

interface TimelineViewProps {
  searchQuery?: string;
  onSelectFlight: (flight: FlightSegment) => void;
  onSelectHotel: (hotel: HotelStay) => void;
  onSelectActivity: (activity: TourActivity) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  searchQuery = '',
  onSelectFlight,
  onSelectHotel,
  onSelectActivity,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [collapsedDays, setCollapsedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (day: number) => {
    setCollapsedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Build the complete day-by-day structure
  const days = [
    {
      dayNumber: 0,
      date: 'Fri, 25 Jun 2027',
      city: 'Perth, Australia',
      country: 'Australia',
      title: 'Departure from Australia',
      destinationGroup: 'australia',
    },
    {
      dayNumber: 1,
      date: 'Sat, 26 Jun 2027',
      city: 'Buenos Aires, Argentina',
      country: 'Argentina',
      title: 'Transpacific Arrival in Buenos Aires',
      destinationGroup: 'buenosaires',
    },
    {
      dayNumber: 2,
      date: 'Sun, 27 Jun 2027',
      city: 'Buenos Aires, Argentina',
      country: 'Argentina',
      title: 'Centro, San Telmo & La Boca Tour',
      destinationGroup: 'buenosaires',
    },
    {
      dayNumber: 3,
      date: 'Mon, 28 Jun 2027',
      city: 'Buenos Aires, Argentina',
      country: 'Argentina',
      title: 'Recoleta, Palermo & La Ventana Tango',
      destinationGroup: 'buenosaires',
    },
    {
      dayNumber: 4,
      date: 'Tue, 29 Jun 2027',
      city: 'Buenos Aires, Argentina',
      country: 'Argentina',
      title: 'Buenos Aires Free Day (Palermo / Delta)',
      destinationGroup: 'buenosaires',
    },
    {
      dayNumber: 5,
      date: 'Wed, 30 Jun 2027',
      city: 'Puerto Iguazú & Foz do Iguaçu',
      country: 'Argentina & Brazil',
      title: 'Fly to Iguazu & Argentine Falls Tour',
      destinationGroup: 'iguazu',
    },
    {
      dayNumber: 6,
      date: 'Thu, 01 Jul 2027',
      city: 'Foz do Iguaçu, Brazil',
      country: 'Brazil',
      title: 'Iguazu Free Day - Belmond Falls Access',
      destinationGroup: 'iguazu',
    },
    {
      dayNumber: 7,
      date: 'Fri, 02 Jul 2027',
      city: 'Rio de Janeiro, Brazil',
      country: 'Brazil',
      title: 'Flight to Rio & Copacabana Beach',
      destinationGroup: 'rio',
    },
    {
      dayNumber: 8,
      date: 'Sat, 03 Jul 2027',
      city: 'Rio de Janeiro, Brazil',
      country: 'Brazil',
      title: 'Christ the Redeemer & Santa Teresa',
      destinationGroup: 'rio',
    },
    {
      dayNumber: 9,
      date: 'Sun, 04 Jul 2027',
      city: 'Rio de Janeiro, Brazil',
      country: 'Brazil',
      title: 'Tijuca Rainforest Jeep & Botanic Garden',
      destinationGroup: 'rio',
    },
    {
      dayNumber: 10,
      date: 'Mon, 05 Jul 2027',
      city: 'Rio de Janeiro, Brazil',
      country: 'Brazil',
      title: 'Rio Free Day - Carioca Beach Life',
      destinationGroup: 'rio',
    },
    {
      dayNumber: 11,
      date: 'Tue, 06 Jul 2027',
      city: 'Cusco, Peru',
      country: 'Peru',
      title: 'Flights to Cusco via Lima (Arrival & Rest)',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 12,
      date: 'Wed, 07 Jul 2027',
      city: 'Cusco, Peru',
      country: 'Peru',
      title: 'Cusco Acclimatization & Leisure',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 13,
      date: 'Thu, 08 Jul 2027',
      city: 'Cusco, Peru',
      country: 'Peru',
      title: 'Cusco Free Day - San Pedro & San Blas',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 14,
      date: 'Fri, 09 Jul 2027',
      city: 'Cusco, Peru',
      country: 'Peru',
      title: 'Cusco City & Imperial Ruins Tour',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 15,
      date: 'Sat, 10 Jul 2027',
      city: 'Sacred Valley, Peru',
      country: 'Peru',
      title: 'Sacred Valley Tour & Hacienda Sarapampa',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 16,
      date: 'Sun, 11 Jul 2027',
      city: 'Machu Picchu, Peru',
      country: 'Peru',
      title: 'Machu Picchu Citadel Excursion (Circuit 2A)',
      destinationGroup: 'cusco',
    },
    {
      dayNumber: 17,
      date: 'Mon, 12 Jul 2027',
      city: 'Lima, Peru',
      country: 'Peru',
      title: 'Ñaupa Church & Flight to Lima',
      destinationGroup: 'lima',
    },
    {
      dayNumber: 18,
      date: 'Tue, 13 Jul 2027',
      city: 'Lima, Peru',
      country: 'Peru',
      title: 'Exclusive Lima City Tour & Larco Museum',
      destinationGroup: 'lima',
    },
    {
      dayNumber: 19,
      date: 'Wed, 14 Jul 2027',
      city: 'Lima, Peru',
      country: 'Peru',
      title: 'Handpicked Gastronomic & Barranco Tour',
      destinationGroup: 'lima',
    },
    {
      dayNumber: 20,
      date: 'Thu, 15 Jul 2027',
      city: 'Lima, Peru',
      country: 'Peru',
      title: 'Pachacamac & Hacienda Los Ficus Paso Horses',
      destinationGroup: 'lima',
    },
    {
      dayNumber: 21,
      date: 'Fri, 16 Jul 2027',
      city: 'Lima & Santiago',
      country: 'Peru & Chile',
      title: 'Miraflores & Departure Flights Begin',
      destinationGroup: 'return',
    },
    {
      dayNumber: 22,
      date: 'Sat, 17 Jul 2027',
      city: 'Transpacific Flight',
      country: 'In Flight',
      title: 'Santiago to Melbourne (LA805 Business)',
      destinationGroup: 'return',
    },
    {
      dayNumber: 23,
      date: 'Sun, 18 Jul 2027',
      city: 'Perth, Australia',
      country: 'Australia',
      title: 'Arrival Home in Perth (QF765)',
      destinationGroup: 'return',
    },
  ];

  // Destination filter pills
  const destinations = [
    { id: 'all', label: 'All 24 Days' },
    { id: 'buenosaires', label: 'Buenos Aires' },
    { id: 'iguazu', label: 'Iguazu Falls' },
    { id: 'rio', label: 'Rio de Janeiro' },
    { id: 'cusco', label: 'Cusco & Sacred Valley' },
    { id: 'lima', label: 'Lima' },
    { id: 'return', label: 'Return Journey' },
  ];

  // Helper to fetch day flights
  const getFlightsForDay = (dayNum: number): FlightSegment[] => {
    if (dayNum === 0) return [TRIP_DATA.flights[0]]; // QF776
    if (dayNum === 1) return [TRIP_DATA.flights[1], TRIP_DATA.flights[2]]; // LA804, LA455
    if (dayNum === 5) return [TRIP_DATA.flights[3]]; // AR1780
    if (dayNum === 7) return [TRIP_DATA.flights[4]]; // LA3685
    if (dayNum === 11) return [TRIP_DATA.flights[5], TRIP_DATA.flights[6]]; // LA2405, LA2120
    if (dayNum === 21) return [TRIP_DATA.flights[7]]; // LA521
    if (dayNum === 22) return [TRIP_DATA.flights[8]]; // LA805
    if (dayNum === 23) return [TRIP_DATA.flights[9]]; // QF765
    return [];
  };

  // Helper to fetch hotel check-in/out for day
  const getHotelEventsForDay = (dayNum: number) => {
    const events: { hotel: HotelStay; type: 'checkin' | 'checkout' | 'staying' }[] = [];
    
    // Palo Santo Palermo (26 Jun - 30 Jun, Days 1-5)
    if (dayNum === 1) events.push({ hotel: TRIP_DATA.hotels[0], type: 'checkin' });
    else if (dayNum === 5) events.push({ hotel: TRIP_DATA.hotels[0], type: 'checkout' });

    // Belmond Das Cataratas (30 Jun - 02 Jul, Days 5-7)
    if (dayNum === 5) events.push({ hotel: TRIP_DATA.hotels[1], type: 'checkin' });
    else if (dayNum === 7) events.push({ hotel: TRIP_DATA.hotels[1], type: 'checkout' });

    // Miramar Hotel by Windsor (02 Jul - 06 Jul, Days 7-11)
    if (dayNum === 7) events.push({ hotel: TRIP_DATA.hotels[2], type: 'checkin' });
    else if (dayNum === 11) events.push({ hotel: TRIP_DATA.hotels[2], type: 'checkout' });

    // JW Marriott Hotel Cusco (06 Jul - 10 Jul, Days 11-15)
    if (dayNum === 11) events.push({ hotel: TRIP_DATA.hotels[3], type: 'checkin' });
    else if (dayNum === 15) events.push({ hotel: TRIP_DATA.hotels[3], type: 'checkout' });

    // El Albergue Ollantaytambo (10 Jul - 12 Jul, Days 15-17)
    if (dayNum === 15) events.push({ hotel: TRIP_DATA.hotels[4], type: 'checkin' });
    else if (dayNum === 17) events.push({ hotel: TRIP_DATA.hotels[4], type: 'checkout' });

    // Humano, Lima (12 Jul - 16 Jul, Days 17-21)
    if (dayNum === 17) events.push({ hotel: TRIP_DATA.hotels[5], type: 'checkin' });
    else if (dayNum === 21) events.push({ hotel: TRIP_DATA.hotels[5], type: 'checkout' });

    return events;
  };

  // Helper to fetch day activities
  const getActivitiesForDay = (dayNum: number): TourActivity[] => {
    return TRIP_DATA.activities.filter(a => a.dayNumber === dayNum);
  };

  const filteredDays = days.filter((d) => {
    const matchesDest = selectedDestination === 'all' || d.destinationGroup === selectedDestination;
    if (!searchQuery) return matchesDest;

    const q = searchQuery.toLowerCase();
    const dayFlights = getFlightsForDay(d.dayNumber);
    const dayHotels = getHotelEventsForDay(d.dayNumber);
    const dayActs = getActivitiesForDay(d.dayNumber);

    const matchesDay =
      d.city.toLowerCase().includes(q) ||
      d.title.toLowerCase().includes(q) ||
      dayFlights.some(f => f.flightNumber.toLowerCase().includes(q) || f.departCode.toLowerCase().includes(q) || f.arriveCode.toLowerCase().includes(q)) ||
      dayHotels.some(h => h.hotel.name.toLowerCase().includes(q)) ||
      dayActs.some(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));

    return matchesDest && matchesDay;
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Trip Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-slate-700/80 p-5 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase tracking-wider">
                Confirmed Proposal #18046
              </span>
              <span className="text-xs text-slate-400 font-mono">PNR: {TRIP_DATA.flightReservationCode}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {TRIP_DATA.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Fri, 25 Jun – Sun, 18 Jul 2027 (24 Days)</span>
              <span className="text-slate-600">•</span>
              <span>2 Travelers</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/80 border border-slate-700/80 p-2.5 rounded-xl text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Travelers</div>
              <div className="font-bold text-white text-xs">
                {TRIP_DATA.travelers[1].name} & {TRIP_DATA.travelers[0].name}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Business & Deluxe</div>
            </div>
          </div>
        </div>

        {/* Quick route breadcrumbs */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-300 overflow-x-auto no-scrollbar py-1">
          <span className="text-slate-400 shrink-0 font-medium">Route:</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Perth</span>
          <span className="text-slate-600">→</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Melbourne</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Buenos Aires</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Iguazu Falls</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Rio de Janeiro</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Cusco</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Machu Picchu</span>
          <span className="text-slate-600">→</span>
          <span className="bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded text-[11px] shrink-0 font-medium">Lima</span>
        </div>
      </div>

      {/* Destination Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => setSelectedDestination(dest.id)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition active:scale-95 ${
              selectedDestination === dest.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {dest.label}
          </button>
        ))}
      </div>

      {/* Days Timeline Feed */}
      <div className="space-y-4">
        {filteredDays.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 p-6">
            <Calendar className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm font-medium">No days match your search query.</p>
          </div>
        ) : (
          filteredDays.map((day) => {
            const isCollapsed = collapsedDays[day.dayNumber] ?? false;
            const dayFlights = getFlightsForDay(day.dayNumber);
            const dayHotels = getHotelEventsForDay(day.dayNumber);
            const dayActivities = getActivitiesForDay(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                className="bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden transition"
              >
                {/* Day Header Accordion Toggle */}
                <div
                  onClick={() => toggleDay(day.dayNumber)}
                  className="bg-slate-800/95 hover:bg-slate-750 px-4 py-3 border-b border-slate-700/60 flex items-center justify-between cursor-pointer transition select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Day</span>
                      <span className="text-base font-black text-white leading-tight">{day.dayNumber}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-sky-400 font-semibold">{day.date}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-300 font-medium truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400 inline shrink-0" />
                          {day.city}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm sm:text-base tracking-tight truncate mt-0.5">
                        {day.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Item count tag */}
                    <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-700/60 hidden xs:inline-block">
                      {dayFlights.length + dayHotels.length + dayActivities.length} items
                    </span>
                    <button className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Day Content */}
                {!isCollapsed && (
                  <div className="p-4 space-y-3">
                    {/* 1. Flights for the day */}
                    {dayFlights.map((flight) => (
                      <div
                        key={flight.id}
                        onClick={() => onSelectFlight(flight)}
                        className="bg-slate-900/90 hover:bg-slate-900 border border-sky-500/30 hover:border-sky-500/60 rounded-xl p-3.5 transition cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                              <Plane className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-white">{flight.airline}</span>
                            <span className="font-mono text-sky-400 font-semibold bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                              {flight.flightNumber}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {flight.cabin}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs py-1">
                          <div>
                            <span className="font-mono font-bold text-white text-base">{flight.departCode}</span>
                            <span className="text-slate-300 ml-1.5 font-medium">{flight.departTime}</span>
                            <span className="text-[11px] text-slate-400 block">{flight.departAirport}</span>
                          </div>

                          <div className="flex flex-col items-center px-2">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {flight.duration}
                            </span>
                            <ArrowRight className="w-4 h-4 text-sky-400 my-0.5" />
                            <span className="text-[10px] text-slate-500 font-mono">{flight.aircraft}</span>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-bold text-white text-base">{flight.arriveCode}</span>
                            <span className="text-slate-300 ml-1.5 font-medium">{flight.arriveTime}</span>
                            <span className="text-[11px] text-slate-400 block">{flight.arriveAirport}</span>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Ref: <strong className="font-mono text-slate-200">{flight.bookingRef}</strong></span>
                          <span className="text-sky-400 font-medium group-hover:underline">View Boarding Pass & Tickets →</span>
                        </div>
                      </div>
                    ))}

                    {/* 2. Hotel Check-In / Check-Out */}
                    {dayHotels.map(({ hotel, type }) => (
                      <div
                        key={`${hotel.id}-${type}`}
                        onClick={() => onSelectHotel(hotel)}
                        className={`border rounded-xl p-3.5 transition cursor-pointer group ${
                          type === 'checkin'
                            ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-500/70'
                            : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${type === 'checkin' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                              <Hotel className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-white">{hotel.name}</span>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                              type === 'checkin'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {type === 'checkin' ? 'Check-In' : 'Check-Out'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          {hotel.roomType} • {hotel.nights} Nights • Breakfast Included
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                          {hotel.address}
                        </p>
                      </div>
                    ))}

                    {/* 3. Tours & Excursions */}
                    {dayActivities.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => onSelectActivity(act)}
                        className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                              {act.type === 'Dining' ? (
                                <Utensils className="w-3.5 h-3.5" />
                              ) : act.type === 'Transfer' ? (
                                <Car className="w-3.5 h-3.5" />
                              ) : (
                                <Compass className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-xs sm:text-sm group-hover:text-sky-300 transition leading-snug">
                                {act.title}
                              </h4>
                              {act.timeSlot && (
                                <div className="text-[11px] text-sky-400 font-medium flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-sky-400" />
                                  <span>{act.timeSlot}</span>
                                  {act.duration && <span className="text-slate-400">({act.duration})</span>}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 gap-1">
                            {act.serviceType && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {act.serviceType}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                          {act.description}
                        </p>

                        {act.inclusions && (
                          <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            <span>{act.inclusions}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
