/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomTabBar, TabType } from './components/BottomTabBar';
import { TimelineView } from './components/TimelineView';
import { FlightsView } from './components/FlightsView';
import { LodgingView } from './components/LodgingView';
import { ActivitiesView } from './components/ActivitiesView';
import { TravelHubView } from './components/TravelHubView';
import { ConsultantModal } from './components/ConsultantModal';
import { DetailModal } from './components/DetailModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TRIP_DATA, FlightSegment, HotelStay, TourActivity } from './data/tripData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<{
    item: FlightSegment | HotelStay | TourActivity | null;
    type: 'flight' | 'hotel' | 'activity' | null;
  }>({ item: null, type: null });

  const handleSelectFlight = (flight: FlightSegment) => {
    setSelectedDetail({ item: flight, type: 'flight' });
  };

  const handleSelectHotel = (hotel: HotelStay) => {
    setSelectedDetail({ item: hotel, type: 'hotel' });
  };

  const handleSelectActivity = (activity: TourActivity) => {
    setSelectedDetail({ item: activity, type: 'activity' });
  };

  const handleCloseDetail = () => {
    setSelectedDetail({ item: null, type: null });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Offline Status Top Banner */}
      <OfflineIndicator />

      {/* Main Top Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenConsultant={() => setIsConsultantOpen(true)}
      />

      {/* Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-3 pb-24">
        {activeTab === 'timeline' && (
          <TimelineView
            searchQuery={searchQuery}
            onSelectFlight={handleSelectFlight}
            onSelectHotel={handleSelectHotel}
            onSelectActivity={handleSelectActivity}
          />
        )}

        {activeTab === 'flights' && (
          <FlightsView
            searchQuery={searchQuery}
            onSelectFlight={handleSelectFlight}
          />
        )}

        {activeTab === 'lodging' && (
          <LodgingView
            searchQuery={searchQuery}
            onSelectHotel={handleSelectHotel}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesView
            searchQuery={searchQuery}
            onSelectActivity={handleSelectActivity}
          />
        )}

        {activeTab === 'hub' && (
          <TravelHubView />
        )}
      </main>

      {/* iOS Bottom Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        flightsCount={TRIP_DATA.flights.length}
        hotelsCount={TRIP_DATA.hotels.length}
        activitiesCount={TRIP_DATA.activities.filter(a => a.type !== 'Transfer').length}
      />

      {/* Detail Inspector Modal */}
      <DetailModal
        item={selectedDetail.item}
        type={selectedDetail.type}
        onClose={handleCloseDetail}
      />

      {/* Travel Consultant Emergency Modal */}
      <ConsultantModal
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
      />
    </div>
  );
}
