export interface Passenger {
  name: string;
  ticketNumbers: {
    qantasPerthMel?: string;
    latamTranspacific?: string;
    aerolineasIguazu?: string;
    latamDomesticAndRegional?: string;
  };
}

export interface FlightSegment {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  bookingRef: string;
  departCity: string;
  departAirport: string;
  departCode: string;
  departTerminal?: string;
  departTime: string; // ISO or readable
  departDateFormatted: string;
  arriveCity: string;
  arriveAirport: string;
  arriveCode: string;
  arriveTerminal?: string;
  arriveTime: string;
  arriveDateFormatted: string;
  duration: string;
  cabin: 'Business' | 'Premium Economy' | 'Economy';
  aircraft: string;
  status: string;
  baggage: {
    checked: string;
    carryOn: string;
    extraNote?: string;
  };
  passengers: {
    name: string;
    ticketNumber: string;
  }[];
}

export interface HotelStay {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  roomType: string;
  includes: string;
  description: string;
  amenities: string[];
  tips?: string;
  mapQuery: string;
}

export interface TourActivity {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  city: string;
  country: string;
  type: 'Tour' | 'Transfer' | 'Activity' | 'Dining' | 'Free Day';
  serviceType: 'Private' | 'Shared' | 'Self-guided';
  inclusions?: string;
  duration?: string;
  description: string;
  highlights?: string[];
  importantNotes?: string;
  timeSlot?: string;
}

export interface TripConsultant {
  name: string;
  role: string;
  agency: string;
  phoneAU: string;
  phoneNZ: string;
  phoneUS: string;
  email: string;
  agencyPhone1300: string;
  agencyAddress: string;
}

export interface TripInfo {
  title: string;
  bookingReference: string;
  flightReservationCode: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  leadCustomer: string;
  travelers: Passenger[];
  pricing: {
    perPerson: string;
    total: string;
    currency: string;
    inclusions: string;
    exclusions: string;
  };
  consultant: TripConsultant;
  flights: FlightSegment[];
  hotels: HotelStay[];
  activities: TourActivity[];
}

export const TRIP_DATA: TripInfo = {
  title: "Best of South America",
  bookingReference: "18046",
  flightReservationCode: "WRAHAW",
  startDate: "2027-06-25",
  endDate: "2027-07-18",
  durationDays: 24,
  leadCustomer: "Elissa Sarich",
  travelers: [
    {
      name: "Michael Sarich",
      ticketNumbers: {
        qantasPerthMel: "0453947240458/59",
        latamTranspacific: "0453947240458/59",
        aerolineasIguazu: "0443947546731",
        latamDomesticAndRegional: "0453947578479"
      }
    },
    {
      name: "Elissa Sarich",
      ticketNumbers: {
        qantasPerthMel: "0453947240460/61",
        latamTranspacific: "0453947240460/61",
        aerolineasIguazu: "0443947546732",
        latamDomesticAndRegional: "0453947578480"
      }
    }
  ],
  pricing: {
    perPerson: "AUD $10,994",
    total: "AUD $21,988",
    currency: "AUD",
    inclusions: "All internal airfares, accommodation, tours with entrance fees, specified transfers, and listed meals. Aerolineas Argentinas Buenos Aires - 15kg checked baggage; all other LATAM/Qantas flights 23kg checked baggage.",
    exclusions: "Arrival/departure taxes or reciprocity fees, visa fees, local and city taxes where applicable, travel insurance, tips."
  },
  consultant: {
    name: "Daniel Tilyard",
    role: "Senior Latin America Travel Consultant",
    agency: "Eclipse Travel Pty Ltd",
    phoneAU: "+61 2 4297 1756",
    phoneNZ: "+64 4 803 9336",
    phoneUS: "+1 301 450 4331",
    email: "daniel@eclipsetravel.com.au",
    agencyPhone1300: "1300 575 752",
    agencyAddress: "Level 5, 115 Pitt Street, Sydney NSW 2000, Australia"
  },
  flights: [
    {
      id: "fl-1",
      flightNumber: "QF776",
      airline: "QANTAS AIRWAYS",
      airlineCode: "QF",
      bookingRef: "FXO7RG",
      departCity: "Perth, Australia",
      departAirport: "Perth International",
      departCode: "PER",
      departTerminal: "Terminal T4 QANTAS DOMESTIC",
      departTime: "23:45",
      departDateFormatted: "Fri, 25 Jun 2027",
      arriveCity: "Melbourne, Australia",
      arriveAirport: "Tullamarine",
      arriveCode: "MEL",
      arriveTerminal: "Terminal 1",
      arriveTime: "05:15 (+1)",
      arriveDateFormatted: "Sat, 26 Jun 2027",
      duration: "3 hours, 30 minutes",
      cabin: "Business",
      aircraft: "AIRBUS A321NEO",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    },
    {
      id: "fl-2",
      flightNumber: "LA804",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Melbourne, Australia",
      departAirport: "Tullamarine",
      departCode: "MEL",
      departTerminal: "Terminal 2",
      departTime: "12:00",
      departDateFormatted: "Sat, 26 Jun 2027",
      arriveCity: "Santiago, Chile",
      arriveAirport: "Arturo Merino Benitez",
      arriveCode: "SCL",
      arriveTerminal: "Terminal 2 INTL",
      arriveTime: "10:35 (Same day)",
      arriveDateFormatted: "Sat, 26 Jun 2027",
      duration: "12 hours, 35 minutes",
      cabin: "Business",
      aircraft: "BOEING 787-9",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    },
    {
      id: "fl-3",
      flightNumber: "LA455",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Santiago, Chile",
      departAirport: "Arturo Merino Benitez",
      departCode: "SCL",
      departTerminal: "Terminal 2 INTL",
      departTime: "12:28",
      departDateFormatted: "Sat, 26 Jun 2027",
      arriveCity: "Buenos Aires, Argentina",
      arriveAirport: "Arpt. Jorge Newbery",
      arriveCode: "AEP",
      arriveTerminal: "Domestic/Regional",
      arriveTime: "15:40",
      arriveDateFormatted: "Sat, 26 Jun 2027",
      duration: "2 hours, 12 minutes",
      cabin: "Premium Economy",
      aircraft: "AIRBUS A320",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    },
    {
      id: "fl-4",
      flightNumber: "AR1780",
      airline: "AEROLINEAS ARGENTINAS",
      airlineCode: "AR",
      bookingRef: "MOZAUY",
      departCity: "Buenos Aires, Argentina",
      departAirport: "Arpt. Jorge Newbery",
      departCode: "AEP",
      departTerminal: "Domestic",
      departTime: "12:00",
      departDateFormatted: "Wed, 30 Jun 2027",
      arriveCity: "Iguazu, Argentina",
      arriveAirport: "Cataratas",
      arriveCode: "IGR",
      arriveTerminal: "Main",
      arriveTime: "13:55",
      arriveDateFormatted: "Wed, 30 Jun 2027",
      duration: "1 hour, 55 minutes",
      cabin: "Economy",
      aircraft: "BOEING 737-800",
      status: "Confirmed",
      baggage: {
        checked: "1 x 15kg per passenger",
        carryOn: "1 x 8kg per passenger",
        extraNote: "Luggage allowance can be increased to 23kg per person at check-in only for approx AUD 60.00 each."
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0443947546731" },
        { name: "Elissa Sarich", ticketNumber: "0443947546732" }
      ]
    },
    {
      id: "fl-5",
      flightNumber: "LA3685",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Iguassu Falls, Brazil",
      departAirport: "Cataratas",
      departCode: "IGU",
      departTerminal: "Main",
      departTime: "18:25",
      departDateFormatted: "Fri, 02 Jul 2027",
      arriveCity: "Rio De Janeiro, Brazil",
      arriveAirport: "Galeão–Antonio Carlos Jobim",
      arriveCode: "GIG",
      arriveTerminal: "Terminal 2",
      arriveTime: "20:20",
      arriveDateFormatted: "Fri, 02 Jul 2027",
      duration: "1 hour, 55 minutes",
      cabin: "Premium Economy",
      aircraft: "AIRBUS A320",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947578479" },
        { name: "Elissa Sarich", ticketNumber: "0453947578480" }
      ]
    },
    {
      id: "fl-6",
      flightNumber: "LA2405",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Rio De Janeiro, Brazil",
      departAirport: "Galeão–Antonio Carlos Jobim",
      departCode: "GIG",
      departTerminal: "Terminal 2",
      departTime: "07:10",
      departDateFormatted: "Tue, 06 Jul 2027",
      arriveCity: "Lima, Peru",
      arriveAirport: "Jorge Chavez International",
      arriveCode: "LIM",
      arriveTerminal: "International",
      arriveTime: "10:45",
      arriveDateFormatted: "Tue, 06 Jul 2027",
      duration: "5 hours, 35 minutes",
      cabin: "Premium Economy",
      aircraft: "AIRBUS A320",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947578479" },
        { name: "Elissa Sarich", ticketNumber: "0453947578480" }
      ]
    },
    {
      id: "fl-7",
      flightNumber: "LA2120",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Lima, Peru",
      departAirport: "Jorge Chavez International",
      departCode: "LIM",
      departTerminal: "Domestic",
      departTime: "12:45",
      departDateFormatted: "Tue, 06 Jul 2027",
      arriveCity: "Cuzco, Peru",
      arriveAirport: "Velazco Astete",
      arriveCode: "CUZ",
      arriveTerminal: "Main",
      arriveTime: "14:10",
      arriveDateFormatted: "Tue, 06 Jul 2027",
      duration: "1 hour, 25 minutes",
      cabin: "Premium Economy",
      aircraft: "AIRBUS A320",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947578479" },
        { name: "Elissa Sarich", ticketNumber: "0453947578480" }
      ]
    },
    {
      id: "fl-8",
      flightNumber: "LA521",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Lima, Peru",
      departAirport: "Jorge Chavez International",
      departCode: "LIM",
      departTerminal: "International",
      departTime: "17:20",
      departDateFormatted: "Fri, 16 Jul 2027",
      arriveCity: "Santiago, Chile",
      arriveAirport: "Arturo Merino Benitez",
      arriveCode: "SCL",
      arriveTerminal: "Terminal 2 INTL",
      arriveTime: "21:50",
      arriveDateFormatted: "Fri, 16 Jul 2027",
      duration: "3 hours, 30 minutes",
      cabin: "Premium Economy",
      aircraft: "AIRBUS A320",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    },
    {
      id: "fl-9",
      flightNumber: "LA805",
      airline: "LATAM AIRLINES GROUP",
      airlineCode: "LA",
      bookingRef: "OSKMKZ",
      departCity: "Santiago, Chile",
      departAirport: "Arturo Merino Benitez",
      arriveTerminal: "Terminal 2 INTL",
      departCode: "SCL",
      departTime: "01:05",
      departDateFormatted: "Sat, 17 Jul 2027",
      arriveCity: "Melbourne, Australia",
      arriveAirport: "Tullamarine",
      arriveCode: "MEL",
      arriveTime: "05:40 (+1 day)",
      arriveDateFormatted: "Sun, 18 Jul 2027",
      duration: "14 hours, 35 minutes",
      cabin: "Business",
      aircraft: "BOEING 787-9",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    },
    {
      id: "fl-10",
      flightNumber: "QF765",
      airline: "QANTAS AIRWAYS",
      airlineCode: "QF",
      bookingRef: "FXO7RG",
      departCity: "Melbourne, Australia",
      departAirport: "Tullamarine",
      departCode: "MEL",
      departTerminal: "Terminal 1",
      departTime: "10:20",
      departDateFormatted: "Sun, 18 Jul 2027",
      arriveCity: "Perth, Australia",
      arriveAirport: "Perth International",
      arriveCode: "PER",
      arriveTerminal: "Terminal T4 QANTAS DOMESTIC",
      arriveTime: "12:30",
      arriveDateFormatted: "Sun, 18 Jul 2027",
      duration: "4 hours, 10 minutes",
      cabin: "Business",
      aircraft: "BOEING 737 800",
      status: "Confirmed",
      baggage: {
        checked: "1 x 23kg per passenger",
        carryOn: "1 x 16kg per passenger"
      },
      passengers: [
        { name: "Michael Sarich", ticketNumber: "0453947240458/59" },
        { name: "Elissa Sarich", ticketNumber: "0453947240460/61" }
      ]
    }
  ],
  hotels: [
    {
      id: "ht-1",
      name: "Palo Santo Hotel Palermo",
      city: "Buenos Aires",
      country: "Argentina",
      address: "Bonpland 2275, C1425FWC Buenos Aires, Argentina",
      phone: "+54 11 5280 6100",
      checkInDate: "26 Jun 2027",
      checkOutDate: "30 Jun 2027",
      nights: 4,
      roomType: "Premium Room",
      includes: "Breakfast included daily",
      description: "Palo Santo is a luxury eco-boutique design hotel in Palermo, Buenos Aires. Its architecture celebrates modern Argentine design with vertical gardens. Features a rooftop terrace with sundeck and hot tub, lovely courtyard restaurant, and complimentary hotel bicycles to cruise leafy Palermo.",
      amenities: [
        "35 m² room size",
        "Private balcony with vertical garden view",
        "Complimentary high-speed Wi-Fi",
        "Rooftop hot tub & sundeck",
        "Free bicycle hire",
        "Individual climate control",
        "Minibar & safety deposit box",
        "LED television"
      ],
      tips: "Enjoy the leafy streets of Palermo Hollywood and Soho. The rooftop hot tub is lovely at sunset.",
      mapQuery: "Palo Santo Hotel Palermo Bonpland 2275 Buenos Aires"
    },
    {
      id: "ht-2",
      name: "Das Cataratas, A Belmond Hotel",
      city: "Foz do Iguaçu",
      country: "Brazil",
      address: "Rodovia Br 469 Km 32, Parque Nacional do Iguaçu, Foz do Iguaçu, Brazil",
      phone: "+55 45 2102-7000",
      checkInDate: "30 Jun 2027",
      checkOutDate: "02 Jul 2027",
      nights: 2,
      roomType: "Deluxe Room",
      includes: "Breakfast included daily",
      description: "A classic Portuguese-colonial residence and the ONLY hotel situated inside Iguassu National Park. Stroll to the sensational waterfalls in the morning or at dusk when the park is closed to all other visitors.",
      amenities: [
        "Exclusive dawn & dusk waterfall access",
        "Spacious luxury bathroom",
        "Fully-stocked minibar",
        "Luxury Brazilian toiletries",
        "Tropical garden swimming pool",
        "Complimentary Wi-Fi",
        "On-site fine dining restaurant"
      ],
      tips: "National park shuttle operates every 30-40 min between the entrance gate and the hotel (~20 min transfer). Take full advantage of dawn walks before public gates open!",
      mapQuery: "Hotel das Cataratas Belmond Foz do Iguacu"
    },
    {
      id: "ht-3",
      name: "Miramar Hotel by Windsor",
      city: "Rio de Janeiro",
      country: "Brazil",
      address: "Avenida Atlântica, 3668, Copacabana, Rio de Janeiro, CEP 22070-001, Brazil",
      phone: "+55 21 2195-6200",
      checkInDate: "02 Jul 2027",
      checkOutDate: "06 Jul 2027",
      nights: 4,
      roomType: "Superior Room Partial Ocean View",
      includes: "Breakfast included daily",
      description: "Located right on the Avenida Atlântica across Copacabana Beach. Features a striking green granite infinity rooftop pool with panoramic beach views, a rooftop cocktail bar, Italian fine dining restaurant, modern fitness center, and dedicated butler service.",
      amenities: [
        "Partial ocean view of Copacabana",
        "Green granite rooftop swimming pool",
        "Rooftop cocktail bar & terrace",
        "Butler service",
        "Beach service (sun loungers & towels)",
        "Complimentary high-speed Wi-Fi",
        "Modern fitness center",
        "iPod dock & workstation"
      ],
      tips: "Have a sunset caipirinha at the rooftop infinity bar overlooking the full arc of Copacabana.",
      mapQuery: "Miramar Hotel by Windsor Avenida Atlantica Copacabana Rio de Janeiro"
    },
    {
      id: "ht-4",
      name: "JW Marriott Hotel Cusco",
      city: "Cusco",
      country: "Peru",
      address: "Calle Ruinas 432 y San Agustín, Cusco Historic Center, Cusco, Peru",
      phone: "+51 84 582200",
      checkInDate: "06 Jul 2027",
      checkOutDate: "10 Jul 2027",
      nights: 4,
      roomType: "Deluxe Room (Oxygen Enriched)",
      includes: "Breakfast included daily",
      description: "A luxury hotel built within a meticulously restored 16th-century colonial convent with exposed Inca stone walls in Cusco's Historic Center. Features custom oxygen-enriched rooms specifically designed to prevent and relieve altitude fatigue, 2 gourmet Peruvian restaurants, and an indoor relaxation pool.",
      amenities: [
        "Oxygen-enriched room system (altitude relief)",
        "1 King bed & luxury linens",
        "30 m² / 323 sq ft living area",
        "Historic convent courtyard",
        "Indoor pool & wellness spa",
        "2 Peruvian specialty restaurants",
        "Mini fridge & coffee/tea maker"
      ],
      tips: "The oxygen enrichment system significantly aids acclimation to Cusco's 3,400m altitude. Drink plenty of coca tea on your arrival day.",
      mapQuery: "JW Marriott Hotel Cusco Calle Ruinas 432"
    },
    {
      id: "ht-5",
      name: "El Albergue Ollantaytambo",
      city: "Sacred Valley",
      country: "Peru",
      address: "Estación de tren s/n Ollantaytambo, 084 Ollantaytambo, Sacred Valley, Peru",
      phone: "+51 84 204014",
      checkInDate: "10 Jul 2027",
      checkOutDate: "12 Jul 2027",
      nights: 2,
      roomType: "Superior Garden Room",
      includes: "Breakfast included daily",
      description: "Charming historic inn established in 1925, set right at the picturesque Ollantaytambo train station. Known for its rustic elegance, flowering gardens, organic farm, artisanal coffee roastery, wood-fired sauna, and famous farm-to-table restaurant Cafe Mayou.",
      amenities: [
        "Located steps from the Machu Picchu train platform",
        "Private bathroom & garden vistas",
        "Organic farm & on-site distillery",
        "Wood-fired eucalyptus sauna",
        "Bicycle rental to Ollantaytambo ruins (800m)",
        "Complimentary Wi-Fi",
        "Handcrafted bathrobes & heating"
      ],
      tips: "Being located at the train station makes catching the morning train to Machu Picchu completely effortless without packing buses.",
      mapQuery: "El Albergue Ollantaytambo train station Sacred Valley"
    },
    {
      id: "ht-6",
      name: "Humano, Lima, a Tribute Portfolio Hotel",
      city: "Lima",
      country: "Peru",
      address: "Malecón Balta 710, Miraflores, Lima 15074, Peru",
      phone: "+51 1 904 1400",
      checkInDate: "12 Jul 2027",
      checkOutDate: "16 Jul 2027",
      nights: 4,
      roomType: "Superior Room",
      includes: "Breakfast included daily",
      description: "Chic design hotel in trendy Miraflores, moments from the Malecón cliffs, Larcomar Shopping Center, and bohemian Barranco. Offers an outstanding gastronomic program, Re:charge gym, outdoor pool, and vibrant social lounge.",
      amenities: [
        "King bed / 24 m² contemporary layout",
        "Walking distance to Larcomar & Pacific cliff walk",
        "Swimming pool & sun terrace",
        "Re:charge® modern gym",
        "Gourmet culinary bar & 24hr artisan pantry",
        "Complimentary high-speed Wi-Fi",
        "Mini fridge & specialty coffee maker"
      ],
      tips: "Walk along Malecón Balta at sunset to the Parque del Amor for iconic Pacific Ocean sunset vistas.",
      mapQuery: "Humano Lima a Tribute Portfolio Hotel Malecon Balta 710 Miraflores"
    }
  ],
  activities: [
    {
      id: "act-d0-1",
      dayNumber: 0,
      date: "Fri, 25 Jun 2027",
      title: "Departure from Perth to Melbourne",
      city: "Perth",
      country: "Australia",
      type: "Transfer",
      serviceType: "Self-guided",
      timeSlot: "23:45",
      description: "Board Qantas flight QF776 Business Class from Perth T4 Domestic to Melbourne T1.",
      highlights: ["Business class check-in", "Qantas Lounge access", "Overnight flight to Melbourne"]
    },
    {
      id: "act-d1-1",
      dayNumber: 1,
      date: "Sat, 26 Jun 2027",
      title: "Transpacific Crossing to Buenos Aires",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Transfer",
      serviceType: "Self-guided",
      timeSlot: "12:00 - 15:40",
      description: "Fly Melbourne to Santiago (LA804 Business, 12h 35m) crossing the International Date Line, then connect to Buenos Aires Jorge Newbery (LA455, 2h 12m), arriving at 15:40.",
      highlights: ["Boeing 787-9 Dreamliner Business Class", "Arrival into Aeroparque downtown airport"]
    },
    {
      id: "act-d1-2",
      dayNumber: 1,
      date: "Sat, 26 Jun 2027",
      title: "Private Airport to Hotel Transfer w/ Guide",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "16:00",
      description: "On arrival at Jorge Newbery Airport (AEP) you will be met by your Eclipse Travel representative and transferred privately to Palo Santo Hotel in Palermo.",
      highlights: ["Personal meet & greet", "Check-in Palo Santo Hotel Palermo", "Evening at leisure"]
    },
    {
      id: "act-d2-1",
      dayNumber: 2,
      date: "Sun, 27 Jun 2027",
      title: "Buenos Aires: Centro, San Telmo & La Boca Half-Day Tour",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Morning (09:00 - 13:00)",
      inclusions: "Private guide, private transport, hotel pick-up",
      duration: "4 hours",
      description: "Explore the magic of the Argentine capital. Start in San Telmo, Buenos Aires' oldest barrio famous for tango parlours, cobblestone streets, and antique markets. Continue past the Palace of Justice, Argentine National Congress, the historic Cabildo, and the presidential Casa Rosada. Then discover colourful La Boca and walk famous Caminito street with street tango performers.",
      highlights: [
        "San Telmo antique district & street art",
        "Casa Rosada & Plaza de Mayo",
        "Caminito cobblestones & street tango in La Boca",
        "Optional Puerto Madero waterfront drop-off for lunch"
      ]
    },
    {
      id: "act-d3-1",
      dayNumber: 3,
      date: "Mon, 28 Jun 2027",
      title: "Recoleta & Palermo Half-Day Tour",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Morning (09:00 - 13:00)",
      inclusions: "Private guide and vehicle",
      duration: "4 hours",
      description: "Discover sophisticated Recoleta and Palermo. Drive through leafy Recoleta admiring elegant French-style mansions, cafes, Pilar Church, and the Evita Monument, followed by a walk through world-renowned Recoleta Cemetery. Continue to fashionable Palermo with its lush parks, hip boutiques, and chic culinary scene.",
      highlights: [
        "Recoleta French architecture & Pilar Church",
        "Recoleta Cemetery & Eva Perón tomb",
        "Palermo trendy boutique district",
        "Restaurant recommendation for lunch"
      ],
      importantNotes: "Entry ticket to Recoleta Cemetery for foreign visitors is paid directly at the gate."
    },
    {
      id: "act-d3-2",
      dayNumber: 3,
      date: "Mon, 28 Jun 2027",
      title: "Dinner & World-Class Tango Show at La Ventana",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Dining",
      serviceType: "Shared",
      timeSlot: "Evening (19:30 Dinner / 21:30 Show)",
      inclusions: "Gourmet 3-course Argentine dinner, wines, tango show, shared hotel transfers",
      duration: "4 hours",
      description: "Immerse in Argentine passion at historic La Ventana in San Telmo. Enjoy succulent Argentine steak and Mendoza wines followed by a mesmerizing live tango orchestra and dancers in an intimate atmosphere.",
      highlights: [
        "Intimate historic San Telmo salon",
        "Live tango orchestra & world-class dancers",
        "Traditional Argentine steak dinner & wine",
        "Optional pre-show tango dance lesson or wine tasting available"
      ]
    },
    {
      id: "act-d4-1",
      dayNumber: 4,
      date: "Tue, 29 Jun 2027",
      title: "Buenos Aires Free Day",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Free Day",
      serviceType: "Self-guided",
      description: "Day at leisure to explore Buenos Aires. Stroll the tree-lined avenues of Palermo Soho, browse El Ateneo Grand Splendid bookstore (a converted theatre), or ask your consultant about optional boat day trips to the Tigre Delta or a high-speed ferry across the Rio de la Plata to Colonia del Sacramento in Uruguay.",
      highlights: ["El Ateneo Grand Splendid bookstore", "Palermo Soho cafes & shopping", "Optional Tigre Delta or Uruguay day excursion"]
    },
    {
      id: "act-d5-1",
      dayNumber: 5,
      date: "Wed, 30 Jun 2027",
      title: "Transfer Hotel to Airport (AEP)",
      city: "Buenos Aires",
      country: "Argentina",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "09:30",
      description: "Private transfer from Palo Santo Hotel to Aeroparque Jorge Newbery Airport for your flight to Iguazu.",
      highlights: ["Private vehicle transfer", "Domestic check-in for flight AR1780"]
    },
    {
      id: "act-d5-2",
      dayNumber: 5,
      date: "Wed, 30 Jun 2027",
      title: "Argentinian Falls Excursion & Transfer to Belmond Das Cataratas",
      city: "Puerto Iguazú",
      country: "Argentina & Brazil",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "14:15 - 18:00",
      inclusions: "Private guide, national park entry fee, border crossing assistance",
      duration: "4 hours",
      description: "Pick up directly from Iguazu Airport (IGR) and head into Iguazu National Park. Ride the ecological jungle train to the Upper Circuits with views of cascading waterfalls, wildlife, and orchids. Continue along the footbridges suspended over the thunderous Devil's Throat (Garganta del Diablo). Afterwards, cross the international border into Brazil and transfer directly to the iconic Belmond Hotel Das Cataratas inside the park.",
      highlights: [
        "Jungle train through sub-tropical rainforest",
        "Devil's Throat (Garganta del Diablo) catwalk view",
        "Cross border into Brazil",
        "Check-in at Belmond Das Cataratas inside the Brazilian National Park"
      ]
    },
    {
      id: "act-d6-1",
      dayNumber: 6,
      date: "Thu, 01 Jul 2027",
      title: "Iguazu Falls Free Day - Exclusive Park Access",
      city: "Foz do Iguaçu",
      country: "Brazil",
      type: "Free Day",
      serviceType: "Self-guided",
      description: "Enjoy an unforgettable day at the Belmond Das Cataratas. As the only hotel inside the park, you have privileged private access to the waterfall pathways at dawn and twilight before and after park operating hours, without crowds.",
      highlights: [
        "Sunrise walk along the Brazilian panoramic trail",
        "Private pool relaxation beneath tropical palm trees",
        "Sunset over the misty cataracts"
      ]
    },
    {
      id: "act-d7-1",
      dayNumber: 7,
      date: "Fri, 02 Jul 2027",
      title: "Transfer Hotel to Airport & Flight to Rio de Janeiro",
      city: "Foz do Iguaçu to Rio de Janeiro",
      country: "Brazil",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "16:00",
      description: "Private transfer from Belmond Das Cataratas to Foz do Iguaçu Airport (IGU). Board flight LA3685 at 18:25 to Rio de Janeiro Galeão (GIG, arr 20:20). On arrival, meet your representative for private transfer to Miramar Hotel by Windsor on Copacabana Beach.",
      highlights: [
        "Private transfer in Foz do Iguaçu",
        "Flight LA3685 to Rio Galeão",
        "Private transfer to Copacabana Beach",
        "Check-in Miramar Hotel by Windsor"
      ]
    },
    {
      id: "act-d8-1",
      dayNumber: 8,
      date: "Sat, 03 Jul 2027",
      title: "Corcovado (Christ the Redeemer) & Bohemian Santa Teresa Tour",
      city: "Rio de Janeiro",
      country: "Brazil",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "08:30 - 14:30",
      inclusions: "Private vehicle, private guide, cogwheel train tickets, admission fees",
      duration: "Approx. 6 hours",
      description: "Board the historic cogwheel train up through Tijuca forest to the summit of Corcovado (2,300ft) to stand before Christ the Redeemer, one of the New Seven Wonders of the World. Next, drive to the charming hilltop enclave of Santa Teresa, lined with 20th-century mansions, art galleries, and cobblestone lanes. Visit Ruins Park (Parque das Ruínas) for breathtaking bay views, Chácara do Céu Museum, Selarón's world-famous ceramic tiled staircase, and Largo do Guimarães.",
      highlights: [
        "Corcovado mountain cogwheel train",
        "Christ the Redeemer panoramic view of Rio & Guanabara Bay",
        "Santa Teresa bohemian artists' quarter",
        "Escadaria Selarón brightly tiled stairs",
        "Parque das Ruínas & Chácara do Céu Museum"
      ],
      importantNotes: "Ongoing accessibility enhancements may involve scaffolding around parts of Christ the Redeemer, though the site remains fully open."
    },
    {
      id: "act-d9-1",
      dayNumber: 9,
      date: "Sun, 04 Jul 2027",
      title: "Half-Day Open-Top Jeep Tour: Botanic Garden & Tijuca Rainforest",
      city: "Rio de Janeiro",
      country: "Brazil",
      type: "Tour",
      serviceType: "Shared",
      timeSlot: "Morning (08:30 - 12:30)",
      inclusions: "Shared open-top jeep, guide, entrance fees, hotel pickup/dropoff",
      duration: "4 hours",
      description: "Ride in an open-top Jeep into Rio's lush botanical gardens founded in 1817 by King John VI of Portugal, home to giant Victoria Amazonica water lilies, Imperial Palms, and 500 orchid species. Continue climbing into the Tijuca Atlantic Rainforest—the largest urban forest on earth. Stop at the Chinese View Belvedere (Vista Chinesa) for sweeping vistas of Ipanema, Copacabana, and Sugarloaf. Finish at Pepino Beach to watch colorful hang gliders glide down from Pedra Bonita.",
      highlights: [
        "Historic 1817 Botanical Garden & orchid house",
        "Open-top jeep ride through Tijuca Rainforest",
        "Chinese View Belvedere (Vista Chinesa) overlook",
        "Wildlife spotting (monkeys, sloths, toucans)",
        "Pepino Beach hang-glider landing zone"
      ]
    },
    {
      id: "act-d10-1",
      dayNumber: 10,
      date: "Mon, 05 Jul 2027",
      title: "Rio Free Day - Beach & Carioca Culture",
      city: "Rio de Janeiro",
      country: "Brazil",
      type: "Free Day",
      serviceType: "Self-guided",
      description: "Immerse yourself in Rio's beach lifestyle. Relax with beach loungers right in front of the hotel on Copacabana, stroll to Ipanema's Posto 9, savor an authentic rodizio dinner at a traditional Brazilian churrascaria, or take the cable car up Sugarloaf Mountain at dusk.",
      highlights: ["Copacabana & Ipanema beaches", "Miramar rooftop pool", "Brazilian churrasco BBQ dinner recommendation"]
    },
    {
      id: "act-d11-1",
      dayNumber: 11,
      date: "Tue, 06 Jul 2027",
      title: "Flight from Rio to Cusco via Lima",
      city: "Rio de Janeiro to Cusco",
      country: "Brazil & Peru",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "04:30 departure for 07:10 flight",
      description: "Private transfer to Rio Galeão Airport (GIG). Fly LATAM LA2405 to Lima (07:10 - 10:45), connect to LA2120 to Cusco (12:45 - 14:10). Meet your Eclipse Travel representative at Cusco Airport for private transfer to JW Marriott Hotel Cusco.",
      highlights: [
        "Flight LA2405 GIG -> LIM",
        "Flight LA2120 LIM -> CUZ",
        "Private transfer into Cusco Historic Center",
        "Check-in JW Marriott Hotel Cusco (oxygen enriched room)"
      ]
    },
    {
      id: "act-d12-1",
      dayNumber: 12,
      date: "Wed, 07 Jul 2027",
      title: "Cusco Acclimatization & Leisure",
      city: "Cusco",
      country: "Peru",
      type: "Free Day",
      serviceType: "Self-guided",
      description: "Take it easy today to adjust to Cusco's high altitude (3,400m / 11,150ft). Enjoy complimentary coca and muña herbal teas in the colonial cloister of the JW Marriott, take a slow stroll to Plaza de Armas, and savor exquisite Andean culinary specialties.",
      highlights: ["Acclimatization day", "Rest in oxygen-enriched room", "Plaza de Armas gentle walk"]
    },
    {
      id: "act-d13-1",
      dayNumber: 13,
      date: "Thu, 08 Jul 2027",
      title: "Cusco Free Day - San Pedro Market & San Blas",
      city: "Cusco",
      country: "Peru",
      type: "Free Day",
      serviceType: "Self-guided",
      description: "Enjoy Cusco at your leisure. Explore San Pedro Market with its vibrant stalls of Andean potatoes, fresh juices, and traditional herbal remedies. Wander the cobblestone alleys of San Blas artisan quarter and see the Twelve-Angled Stone on Hatunrumiyoc street.",
      highlights: ["San Pedro local market", "San Blas bohemian artisan quarter", "Inca masonry & Twelve-Angled Stone"]
    },
    {
      id: "act-d14-1",
      dayNumber: 14,
      date: "Fri, 09 Jul 2027",
      title: "Cusco City & Imperial Inca Ruins Tour",
      city: "Cusco",
      country: "Peru",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Afternoon (13:30 - 17:30)",
      inclusions: "Private guide, private transport, Cusco Tourist Ticket (Boleto Turístico) & entrance fees",
      duration: "4 hours",
      description: "A comprehensive afternoon tour of imperial Inca and Spanish colonial history. Visit the magnificent Koricancha (Inca Sun Temple topped by Santo Domingo Convent) and the grand Cathedral of Santo Domingo. Ascend to the megalithic fortress of Sacsayhuamán with stone blocks weighing up to 125 tons, explore the ceremonial amphitheater of Q'enqo, view the red fortress of Puka Pukara, and visit the ancient fountains of Tambomachay.",
      highlights: [
        "Koricancha (Temple of the Sun)",
        "Cusco Cathedral on Plaza de Armas",
        "Sacsayhuamán monumental Inca citadel",
        "Q'enqo subterranean carved rock labyrinth",
        "Tambomachay ceremonial water fountains"
      ]
    },
    {
      id: "act-d15-1",
      dayNumber: 15,
      date: "Sat, 10 Jul 2027",
      title: "Sacred Valley Tour with Gourmet Lunch at Hacienda Sarapampa",
      city: "Sacred Valley",
      country: "Peru",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Full Day (08:30 - 16:30)",
      inclusions: "Private guide, private vehicle, 3-course gourmet lunch at Hacienda Sarapampa, Marinera dance & Peruvian Paso horse exhibition, site entrance fees",
      duration: "8 hours",
      description: "Journey into the fertile Sacred Valley of the Incas. Visit the scenic colonial town of Pisac and its colorful artisan market. Continue to Hacienda Sarapampa—a heritage farm cultivating Giant White Corn. Learn about the ancient 6,700-year history of corn in Peru, savor a 3-course lunch made with heirloom ingredients, and enjoy an elegant performance of the traditional 'Marinera' dance and Peruvian Paso horse exhibition. Conclude at Ollantaytambo fortress before checking in to El Albergue.",
      highlights: [
        "Pisac colorful artisan market",
        "Hacienda Sarapampa Giant White Corn experience",
        "Gourmet 3-course lunch with wine/beverage",
        "Peruvian Paso Horse show & Marinera dance",
        "Ollantaytambo fortress & Sun Temple",
        "Check-in at El Albergue Ollantaytambo"
      ]
    },
    {
      id: "act-d16-1",
      dayNumber: 16,
      date: "Sun, 11 Jul 2027",
      title: "Machu Picchu Citadel Excursion (Circuit 2A Private Guide)",
      city: "Machu Picchu / Sacred Valley",
      country: "Peru",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Full Day (07:00 - 17:00)",
      inclusions: "Scenic expedition train tickets, shuttle bus to citadel, Machu Picchu entrance tickets, Private guide for Circuit 2A + choice of 2nd circuit",
      duration: "Full Day",
      description: "Board the morning scenic train along the rushing Urubamba River to Aguas Calientes, gateway to Machu Picchu. Ascend by bus through cloud forest to the Lost City of the Incas. Your private expert guide will lead you through Circuit 2A covering the iconic postcard viewpoints, the Main Plaza, Circular Tower (Torreón), Sacred Solar Clock (Intihuatana), Temple of the Three Windows, and Royal Quarters. Enjoy your secondary circuit exploration before returning by scenic train to Ollantaytambo.",
      highlights: [
        "Scenic train ride through Andean gorges",
        "Postcard classic viewpoint of Machu Picchu citadel",
        "Private guided tour of Circuit 2A (Intihuatana, Temple of Three Windows)",
        "Choice of 2nd circuit route included",
        "Return train to El Albergue Ollantaytambo"
      ]
    },
    {
      id: "act-d17-1",
      dayNumber: 17,
      date: "Mon, 12 Jul 2027",
      title: "Transfer to Cusco via Ñaupa Church & Flight to Lima",
      city: "Sacred Valley to Lima",
      country: "Peru",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "09:00 - 15:00",
      inclusions: "Private transport, guide, flight to Lima, airport transfer to hotel",
      description: "Transfer from Ollantaytambo towards Cusco, stopping to explore Ñaupa Iglesia (Ñaupa Church), a mysterious ancient Inca ceremonial site carved directly into volcanic rock formations featuring sacred trapezoidal portals. Proceed to Cusco Airport for your flight to Lima. On arrival in Lima, meet your driver for private transfer to Humano, a Tribute Portfolio Hotel in Miraflores.",
      highlights: [
        "En-route visit to enigmatic Ñaupa Iglesia rock shrine",
        "Flight from Cusco to Lima",
        "Private transfer to Miraflores hotel",
        "Check-in Humano, Lima (Tribute Portfolio)"
      ]
    },
    {
      id: "act-d18-1",
      dayNumber: 18,
      date: "Tue, 13 Jul 2027",
      title: "Exclusive Lima City Tour & Larco Herrera Museum",
      city: "Lima",
      country: "Peru",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Morning (09:00 - 14:00)",
      inclusions: "Private guide, private transport, museum entrance tickets",
      duration: "5 hours",
      description: "A comprehensive journey across Lima's modern, colonial, and pre-Columbian eras. Begin at Miraflores market to see exotic Amazonian fruits, Andean tubers, and coastal seafood. Drive past ancient Huaca Pucllana adobe pyramid to San Isidro's historic El Olivar olive park, with an optional stop at the Pisco Museum. Discover Lima's UNESCO World Heritage Downtown: Plaza Mayor, Presidential Palace, Cathedral, and 17th-century San Francisco Monastery and catacombs. Conclude with a guided tour of the Larco Herrera Museum, showcasing 5,000 years of gold and silver pre-Columbian art.",
      highlights: [
        "Miraflores fresh market tasting",
        "Huaca Pucllana 5th-century adobe pyramid",
        "San Isidro colonial olive grove park",
        "Lima Historic Center & San Francisco catacombs",
        "Larco Herrera Museum gold and silver collection"
      ]
    },
    {
      id: "act-d19-1",
      dayNumber: 19,
      date: "Wed, 14 Jul 2027",
      title: "Handpicked Gastronomic Food & Bohemian Barranco Tour",
      city: "Lima",
      country: "Peru",
      type: "Dining",
      serviceType: "Private",
      timeSlot: "Morning (09:30 - 14:00)",
      inclusions: "Private guide, transport, all market tastings, ceviche lunch, artisan fair-trade coffee, fruit gelato",
      duration: "4.5 hours",
      description: "Stimulate your senses with Lima's world-renowned culinary flavours. Discover local coastal fruits at a neighborhood market, pass the pre-Inca pyramid of Huaca Pucllana, and stroll into the romantic bohemian arts district of Barranco. Cross the iconic Bridge of Sighs (Puente de los Suspiros) and visit La Ermita chapel. Sample freshly prepared ceviche or causa acevichada, stop at Felicia & Domingo fair-trade specialty organic roastery, and treat yourself to artisanal ice cream crafted from native Amazonian and Andean fruits.",
      highlights: [
        "Local market fruit discoveries (cherimoya, lucuma, granadilla)",
        "Barranco bohemian streets & Bridge of Sighs",
        "Authentic Peruvian ceviche & causa acevichada tasting",
        "Single-origin organic coffee at Felicia & Domingo",
        "Handmade native fruit gelato"
      ]
    },
    {
      id: "act-d20-1",
      dayNumber: 20,
      date: "Thu, 15 Jul 2027",
      title: "Pachacamac Sanctuary & Lunch at Hacienda Los Ficus (Paso Horse Show)",
      city: "Lima / Lurín Valley",
      country: "Peru",
      type: "Tour",
      serviceType: "Private",
      timeSlot: "Full Day (09:00 - 15:30)",
      inclusions: "Private guide, private transport, Pachacamac site entrance & museum, Creole lunch, Peruvian Paso Horse demonstration",
      duration: "6.5 hours",
      description: "Travel 40 km southeast along the Pacific coastline to the archaeological sanctuary of Pachacamac—one of the Andes' most sacred oracle and pilgrimage centers dating back to 100 AD. Tour the adobe temple complex, Sun Temple, and on-site museum. Afterwards, continue to Hacienda Los Ficus in the Lurín Valley for a delicious Creole lunch and a private performance of Peruvian Paso Horses, famous worldwide for their ultra-smooth four-beat lateral gait.",
      highlights: [
        "Sacred Pachacamac oracle temple overlooking the ocean",
        "On-site archaeological museum artifacts",
        "Creole buffet lunch at Hacienda Los Ficus",
        "Exhibition of Peruvian Paso Horses & riders"
      ]
    },
    {
      id: "act-d21-1",
      dayNumber: 21,
      date: "Fri, 16 Jul 2027",
      title: "Hotel Check-Out & Transfer to Lima Airport",
      city: "Lima",
      country: "Peru",
      type: "Transfer",
      serviceType: "Private",
      timeSlot: "14:00",
      description: "Enjoy a final morning shopping or walking along the Miraflores boardwalk. Your representative will pick you up from Humano hotel for private transfer to Jorge Chavez International Airport (LIM).",
      highlights: ["Private airport transfer", "Depart on flight LA521 to Santiago at 17:20"]
    },
    {
      id: "act-d22-1",
      dayNumber: 22,
      date: "Sat, 17 Jul 2027",
      title: "Transpacific Flight: Santiago to Melbourne",
      city: "Santiago to Melbourne",
      country: "Chile & Australia",
      type: "Transfer",
      serviceType: "Self-guided",
      timeSlot: "01:05 (17 Jul) - 05:40 (+1 day, 18 Jul)",
      description: "Board LATAM flight LA805 Business Class (Boeing 787-9) from Santiago (SCL) Terminal 2 INTL to Melbourne (MEL). Crossing the international date line into 18 July.",
      highlights: ["Lie-flat Business Class cabin", "Transpacific crossing"]
    },
    {
      id: "act-d23-1",
      dayNumber: 23,
      date: "Sun, 18 Jul 2027",
      title: "Connecting Flight: Melbourne to Perth - Welcome Home!",
      city: "Melbourne to Perth",
      country: "Australia",
      type: "Transfer",
      serviceType: "Self-guided",
      timeSlot: "10:20 - 12:30",
      description: "Arrive Melbourne Tullamarine at 05:40. Connect to Qantas flight QF765 Business Class departing 10:20, landing home in Perth at 12:30 at Terminal T4.",
      highlights: ["Qantas Domestic Business Lounge", "Arrival home in Perth International (12:30)"]
    }
  ]
};

export interface OfflineCurrencyRate {
  code: string;
  name: string;
  symbol: string;
  ratePerAUD: number; // 1 AUD = X currency
  country: string;
}

export const OFFLINE_CURRENCY_RATES: OfflineCurrencyRate[] = [
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', ratePerAUD: 670.0, country: 'Argentina' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', ratePerAUD: 3.75, country: 'Brazil' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', ratePerAUD: 2.45, country: 'Peru' },
  { code: 'USD', name: 'US Dollar', symbol: '$', ratePerAUD: 0.66, country: 'International' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', ratePerAUD: 620.0, country: 'Chile' }
];

export interface TravelPhrase {
  category: string;
  english: string;
  spanish: string;
  portuguese: string;
}

export const TRAVEL_PHRASES: TravelPhrase[] = [
  { category: 'Essentials', english: 'Hello / Good morning', spanish: 'Hola / Buenos días', portuguese: 'Olá / Bom dia' },
  { category: 'Essentials', english: 'Thank you very much', spanish: 'Muchas gracias', portuguese: 'Muito obrigado/a' },
  { category: 'Essentials', english: 'Where is the bathroom?', spanish: '¿Dónde está el baño?', portuguese: 'Onde fica o banheiro?' },
  { category: 'Dining', english: 'The bill, please', spanish: 'La cuenta, por favor', portuguese: 'A conta, por favor' },
  { category: 'Dining', english: 'Water without gas', spanish: 'Agua sin gas', portuguese: 'Água sem gás' },
  { category: 'Transit', english: 'Take me to this hotel', spanish: 'Lléveme a este hotel, por favor', portuguese: 'Leve-me a este hotel, por favor' },
  { category: 'Emergency', english: 'I need a doctor / help', spanish: 'Necesito un médico / ayuda', portuguese: 'Preciso de um médico / ajuda' },
  { category: 'Emergency', english: 'Call the police', spanish: 'Llame a la policía', portuguese: 'Chame a polícia' },
  { category: 'Shopping', english: 'How much does this cost?', spanish: '¿Cuánto cuesta esto?', portuguese: 'Quanto custa isso?' }
];

export interface AltitudeTip {
  title: string;
  tip: string;
}

export const ALTITUDE_TIPS: AltitudeTip[] = [
  { title: "Hydrate Constantly", tip: "Cusco is at 3,400m (11,150ft). Drink at least 3-4 litres of water daily. Avoid excess caffeine and alcohol during the first 48 hours." },
  { title: "Sip Traditional Coca & Muña Tea", tip: "Mate de coca and muña are natural Andean herbal teas that significantly relieve headaches and nausea from altitude." },
  { title: "Utilize Oxygen Enrichment", tip: "Your JW Marriott Cusco room features supplemental oxygenation. Keep the system turned on during sleep to wake up refreshed." },
  { title: "Light Meals on Arrival", tip: "Digestion slows down at altitude. Eat light soups or carbohydrates on Day 11 and Day 12 rather than heavy steaks." }
];

export const PACKING_CHECKLIST_DEFAULTS = [
  { id: 'p1', item: 'Passports with 6+ months validity', category: 'Documents', checked: false },
  { id: 'p2', item: 'Printed & offline copies of travel insurance', category: 'Documents', checked: false },
  { id: 'p3', item: 'Yellow fever vaccination card (Iguazu)', category: 'Health', checked: false },
  { id: 'p4', item: 'Altitude sickness meds (Diamox / Sorojchi)', category: 'Health', checked: false },
  { id: 'p5', item: 'Universal power adapters (Type C, I, N)', category: 'Electronics', checked: false },
  { id: 'p6', item: 'Waterproof rain jacket (Iguazu & Andes)', category: 'Clothing', checked: false },
  { id: 'p7', item: 'Sturdy walking shoes / trail sneakers', category: 'Footwear', checked: false },
  { id: 'p8', item: 'Light layers & thermal fleece (Cusco nights)', category: 'Clothing', checked: false },
  { id: 'p9', item: 'Swimwear (Copacabana & hotel pools)', category: 'Clothing', checked: false },
  { id: 'p10', item: 'Sunscreen SPF 50 & insect repellent', category: 'Health', checked: false }
];
