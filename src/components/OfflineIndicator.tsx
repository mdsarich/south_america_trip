import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="bg-amber-600/95 text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg backdrop-blur-sm sticky top-0 z-50 animate-fade-in border-b border-amber-500">
      <div className="flex items-center gap-2 max-w-xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
          <span>
            <strong>Offline Mode Active:</strong> All flights, hotel vouchers & tours are saved offline on your device.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] bg-amber-700/80 uppercase tracking-wider font-semibold">
          Travel Safe
        </span>
      </div>
    </div>
  );
};

export const OfflineStatusBadge: React.FC = () => {
  const { isOnline } = useOnlineStatus();

  return (
    <div
      title={isOnline ? "Connected - Offline Cache Ready" : "Offline - Running from device cache"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isOnline
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
      }`}
    >
      {isOnline ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="hidden xs:inline">Offline Ready</span>
          <Wifi className="w-3 h-3 text-emerald-400" />
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Offline Mode</span>
          <WifiOff className="w-3 h-3 text-amber-300" />
        </>
      )}
    </div>
  );
};
