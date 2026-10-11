import React from 'react';
import { Calendar, Plane, Hotel, Compass, Briefcase } from 'lucide-react';

export type TabType = 'timeline' | 'flights' | 'lodging' | 'activities' | 'hub';

interface BottomTabBarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  flightsCount: number;
  hotelsCount: number;
  activitiesCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onChangeTab,
  flightsCount,
  hotelsCount,
  activitiesCount,
}) => {
  const tabs = [
    {
      id: 'timeline' as TabType,
      label: 'Itinerary',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'flights' as TabType,
      label: 'Flights',
      icon: Plane,
      badge: flightsCount,
    },
    {
      id: 'lodging' as TabType,
      label: 'Stays',
      icon: Hotel,
      badge: hotelsCount,
    },
    {
      id: 'activities' as TabType,
      label: 'Tours',
      icon: Compass,
      badge: activitiesCount,
    },
    {
      id: 'hub' as TabType,
      label: 'Travel Hub',
      icon: Briefcase,
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))]">
      <div className="max-w-md mx-auto grid grid-cols-5 px-2 pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 font-normal'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-sky-400' : 'text-slate-400'
                  }`}
                />
                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-2.5 px-1 min-w-[15px] h-[15px] rounded-full text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 bg-sky-400 rounded-full mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
