import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed in standalone PWA mode, don't show prompt
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Installed PWA</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-sm transition active:scale-95 ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        }`}
        title="Install TripIt PWA to Home Screen"
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>
    );
  }

  // iPhone / iPad Safari flow
  return (
    <>
      <button
        onClick={() => setShowIOSModal(true)}
        className={`flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-medium transition active:scale-95 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'
        }`}
        title="Add TripIt to iPhone Home Screen"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Install on iPhone</span>
      </button>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center shadow-md">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Install on iPhone</h3>
                <p className="text-xs text-slate-400">Works 100% offline without roaming</p>
              </div>
            </div>

            <div className="space-y-3.5 my-4 text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <p className="font-medium text-white flex items-center gap-1.5">
                    Tap the Safari <Share2 className="w-4 h-4 text-sky-400 inline" /> Share button
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Located at the bottom of your Safari browser bar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <p className="font-medium text-white flex items-center gap-1.5">
                    Scroll down and select <PlusSquare className="w-4 h-4 text-sky-400 inline" /> "Add to Home Screen"
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">TripIt will appear as a full standalone iPhone app.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>All flight tickets, hotel vouchers, and tour details are cached instantly for offline use in South America!</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-3 w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition shadow-md"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
