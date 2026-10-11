import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Volume2, 
  CheckSquare, 
  Square, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  AlertTriangle, 
  HeartHandshake, 
  Sparkles, 
  Plus, 
  Trash2,
  ShieldAlert,
  Globe,
  Share2
} from 'lucide-react';
import { 
  TRIP_DATA, 
  OFFLINE_CURRENCY_RATES, 
  TRAVEL_PHRASES, 
  ALTITUDE_TIPS,
  PACKING_CHECKLIST_DEFAULTS,
  OfflineCurrencyRate 
} from '../data/tripData';

export const TravelHubView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'currency' | 'phrases' | 'checklist' | 'emergency' | 'notes' | 'export'>('currency');

  // Currency Converter State
  const [amountAUD, setAmountAUD] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ARS');
  const [customRates, setCustomRates] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('tripit_currency_rates');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return OFFLINE_CURRENCY_RATES.reduce((acc, curr) => ({ ...acc, [curr.code]: curr.ratePerAUD }), {});
  });

  // Checklist State
  const [checklist, setChecklist] = useState<Array<{ id: string; item: string; category: string; checked: boolean }>>(() => {
    const saved = localStorage.getItem('tripit_packing_list');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return PACKING_CHECKLIST_DEFAULTS;
  });
  const [newItemText, setNewItemText] = useState('');

  // Traveler Notes State
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('tripit_traveler_notes') || 
`• Seat Preferences: Michael & Elissa business class seats confirmed.
• Health: Remember to start Diamox 24h prior to Cusco arrival.
• Shopping: Alpaca sweater in Pisac / San Pedro market.
• Restaurant Wishlist: Central / Maido in Lima (book well in advance).`;
  });
  const [savedNotesNotice, setSavedNotesNotice] = useState(false);

  // Copy feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tripit_packing_list', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('tripit_currency_rates', JSON.stringify(customRates));
  }, [customRates]);

  const toggleCheckItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const addCheckItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setChecklist(prev => [...prev, {
      id: `custom-${Date.now()}`,
      item: newItemText.trim(),
      category: 'Custom',
      checked: false
    }]);
    setNewItemText('');
  };

  const removeCheckItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveNotes = () => {
    localStorage.setItem('tripit_traveler_notes', notes);
    setSavedNotesNotice(true);
    setTimeout(() => setSavedNotesNotice(false), 2000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Web Speech API for offline phrase pronunciation
  const speakPhrase = (text: string, lang: 'es-ES' | 'pt-BR') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentRateObj = OFFLINE_CURRENCY_RATES.find(c => c.code === selectedCurrency) || OFFLINE_CURRENCY_RATES[0];
  const rateValue = customRates[selectedCurrency] || currentRateObj.ratePerAUD;
  const convertedAmount = (amountAUD * rateValue).toLocaleString(undefined, { maximumFractionDigits: 2 });

  const completedChecklistCount = checklist.filter(c => c.checked).length;

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Sub-tabs header */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'currency', label: 'Currency Tool', icon: Calculator },
          { id: 'phrases', label: 'Offline Phrases', icon: Volume2 },
          { id: 'checklist', label: `Packing (${completedChecklistCount}/${checklist.length})`, icon: CheckSquare },
          { id: 'emergency', label: 'Emergency & Health', icon: ShieldAlert },
          { id: 'notes', label: 'Traveler Notes', icon: FileText },
          { id: 'export', label: 'Export & Backup', icon: Download },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. CURRENCY CONVERTER */}
      {activeSubTab === 'currency' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-sky-400" />
                  <span>Offline South America Currency Converter</span>
                </h3>
                <p className="text-xs text-slate-400">Works 100% offline without mobile roaming</p>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                Offline Mode
              </span>
            </div>

            {/* Input AUD */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Australian Dollars (AUD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={amountAUD}
                    onChange={(e) => setAmountAUD(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono text-lg font-bold focus:outline-none focus:border-sky-500"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Currency Target Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Convert to Local Currency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OFFLINE_CURRENCY_RATES.map((curr) => {
                    const isSelected = selectedCurrency === curr.code;
                    return (
                      <button
                        key={curr.code}
                        onClick={() => setSelectedCurrency(curr.code)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-400 text-white shadow-sm'
                            : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-sm text-white">{curr.code}</div>
                        <div className="text-[10px] text-slate-400 truncate">{curr.country}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Converted Output Display */}
              <div className="mt-4 bg-gradient-to-r from-sky-950/70 to-slate-900 border border-sky-800/40 rounded-xl p-4 text-center">
                <div className="text-xs text-sky-300 font-medium mb-1">
                  {amountAUD} AUD =
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {currentRateObj.symbol} {convertedAmount}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {currentRateObj.name} ({currentRateObj.code})
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  1 AUD = {rateValue} {currentRateObj.code}
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 text-[11px]">Quick Amount:</span>
                {[20, 50, 100, 200, 500].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmountAUD(val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs"
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. OFFLINE TRAVEL PHRASES */}
      {activeSubTab === 'phrases' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span>Spanish & Portuguese Audio Phrasebook</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tap the speaker to have your iPhone speak the phrase aloud offline.
              </p>
            </div>

            <div className="space-y-3">
              {TRAVEL_PHRASES.map((phrase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{phrase.english}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {phrase.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* Spanish (Argentina & Peru) */}
                    <div className="flex items-center justify-between bg-slate-800/60 p-2 rounded-lg border border-slate-750">
                      <div>
                        <span className="text-[10px] text-sky-400 block font-semibold">Spanish (AR / PE)</span>
                        <span className="text-slate-200 font-medium">{phrase.spanish}</span>
                      </div>
                      <button
                        onClick={() => speakPhrase(phrase.spanish, 'es-ES')}
                        className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition shrink-0 ml-2"
                        title="Listen to Spanish pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Portuguese (Brazil / Rio & Iguazu) */}
                    <div className="flex items-center justify-between bg-slate-800/60 p-2 rounded-lg border border-slate-750">
                      <div>
                        <span className="text-[10px] text-emerald-400 block font-semibold">Portuguese (Brazil)</span>
                        <span className="text-slate-200 font-medium">{phrase.portuguese}</span>
                      </div>
                      <button
                        onClick={() => speakPhrase(phrase.portuguese, 'pt-BR')}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition shrink-0 ml-2"
                        title="Listen to Portuguese pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PACKING CHECKLIST */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <span>South America Travel Packing Checklist</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved automatically to your device for offline reference
                </p>
              </div>
              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700">
                {completedChecklistCount} / {checklist.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-4 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(completedChecklistCount / checklist.length) * 100}%` }}
              />
            </div>

            {/* List */}
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer select-none ${
                    item.checked
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm truncate font-medium">{item.item}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {item.category}
                    </span>
                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCheckItem(item.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Item Form */}
            <form onSubmit={addCheckItem} className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
              <input
                type="text"
                placeholder="Add custom packing item..."
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. EMERGENCY & ALTITUDE */}
      {activeSubTab === 'emergency' && (
        <div className="space-y-4 animate-fade-in">
          {/* Emergency contacts card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>24/7 Emergency Contacts & Assistance</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Keep these numbers accessible when traveling in South America
              </p>
            </div>

            {/* Eclipse Consultant */}
            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{TRIP_DATA.consultant.name}</h4>
                  <p className="text-xs text-sky-400">{TRIP_DATA.consultant.role} • Eclipse Travel</p>
                </div>
                <span className="font-mono text-xs bg-sky-950 px-2 py-0.5 rounded text-sky-300 border border-sky-800">
                  Ref: {TRIP_DATA.bookingReference}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <a
                  href={`tel:${TRIP_DATA.consultant.phoneAU.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white"
                >
                  <span>Australia Hotline</span>
                  <span className="font-mono text-emerald-400 font-bold">{TRIP_DATA.consultant.phoneAU}</span>
                </a>
                <a
                  href="tel:1300575752"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white"
                >
                  <span>Agency 1300 Line</span>
                  <span className="font-mono text-emerald-400 font-bold">1300 575 752</span>
                </a>
              </div>
            </div>

            {/* Local Emergency Police & Medical */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Argentina</span>
                <span className="text-lg font-mono font-bold text-rose-400 block mt-1">911</span>
                <span className="text-[10px] text-slate-500">Police & Medical</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Brazil</span>
                <span className="text-lg font-mono font-bold text-rose-400 block mt-1">190 / 192</span>
                <span className="text-[10px] text-slate-500">Police / Ambulance</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Peru</span>
                <span className="text-lg font-mono font-bold text-rose-400 block mt-1">105 / 117</span>
                <span className="text-[10px] text-slate-500">Police / Medical</span>
              </div>
            </div>

            {/* Smartraveller Australian Consular Assistance */}
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-3 text-xs text-sky-300">
              <strong>Australian Consular Emergency Centre:</strong> +61 2 6261 3305 (24/7 Canberra emergency hotline for Australian citizens).
            </div>
          </div>

          {/* Altitude Acclimatization Advice */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>High Altitude Acclimatization Guide (Cusco & Andes)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Cusco sits at 3,400m (11,150ft). Following these guidelines ensures an enjoyable acclimatization:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALTITUDE_TIPS.map((tip, i) => (
                <div key={i} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-white mb-1">{tip.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TRAVELER NOTES */}
      {activeSubTab === 'notes' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Personal Travel Notes</span>
                </h3>
                <p className="text-xs text-slate-400">Saved offline in your iPhone browser storage</p>
              </div>

              {savedNotesNotice && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium animate-fade-in">
                  Saved!
                </span>
              )}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={9}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-sky-500"
              placeholder="Jot down confirmation numbers, passport info, packing ideas, restaurant recommendations..."
            />

            <button
              onClick={handleSaveNotes}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
            >
              Save Notes to Device
            </button>
          </div>
        </div>
      )}

      {/* 6. EXPORT & BACKUP */}
      {activeSubTab === 'export' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Download className="w-4 h-4 text-sky-400" />
                <span>Export & Offline Backup</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Download all raw extracted itinerary data or copy the full summary text.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Download JSON file */}
              <a
                href="/itinerary.json"
                download="Eclipse_Travel_Itinerary_18046.json"
                className="p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-left transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-sky-300">Download Raw JSON</span>
                    <Download className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Standalone file containing all 10 flights, 6 hotels, and 24 days of activities.
                  </p>
                </div>
                <span className="mt-3 text-xs font-mono text-sky-400 group-hover:underline">itinerary.json (Offline)</span>
              </a>

              {/* Copy Full Text Summary */}
              <button
                onClick={() => {
                  const summary = `TRIP: ${TRIP_DATA.title}\nBOOKING REF: ${TRIP_DATA.bookingReference}\nFLIGHT PNR: ${TRIP_DATA.flightReservationCode}\nTRAVELERS: Michael & Elissa Sarich\nDATES: 25 Jun - 18 Jul 2027\n\nFLIGHTS:\n${TRIP_DATA.flights.map(f => `${f.departDateFormatted}: ${f.airline} ${f.flightNumber} ${f.departCode}->${f.arriveCode} (${f.bookingRef})`).join('\n')}\n\nHOTELS:\n${TRIP_DATA.hotels.map(h => `${h.name} (${h.city}): ${h.checkInDate} to ${h.checkOutDate} (${h.nights} nights) - ${h.phone}`).join('\n')}`;
                  handleCopy(summary, 'full-summary');
                }}
                className="p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-left transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-sky-300">Copy Text Itinerary</span>
                    {copiedKey === 'full-summary' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-sky-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Copy condensed itinerary text to paste into Apple Notes, WhatsApp, or email.
                  </p>
                </div>
                <span className="mt-3 text-xs font-medium text-sky-400 group-hover:underline">
                  {copiedKey === 'full-summary' ? 'Copied to Clipboard!' : 'Copy Summary'}
                </span>
              </button>
            </div>

            {/* Print Friendly Trigger */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Need a paper printout or iOS PDF print?</span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
