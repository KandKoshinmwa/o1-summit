import {
  Navigation,
  Star,
  MapPin,
  X,
  TrendingDown,
  Filter,
  Clock,
} from 'lucide-react';
import * as React from "react";
import { useState } from "react";
import { useAppContext, type Station } from '../context/AppContext';
import Button from './shared/Button';
import Card from './shared/Card';

interface StationWithMeta extends Station {
  priceLevel?: 'cheap' | 'moderate' | 'expensive';
  isOptimal?: boolean;
}

export default function MapScreen() {
  const {
    stations: contextStations,
    getPriceLevel,
    getEffectivePrice,
    getOptimalRecommendation,
    isFleetManager,
  } = useAppContext();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedStation, setSelectedStation] =
    useState<StationWithMeta | null>(null);

  if (isFleetManager()) {
    return (
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <Card>
          <div className="text-center py-8">
            <MapPin size={48} className="text-[#A3ADC0] mx-auto mb-4" />
            <h2 className="text-[18px] font-semibold text-[#0B132B] mb-2">
              Access Restricted
            </h2>
            <p className="text-[14px] text-[#5F6C7B]">
              Fleet Managers do not have access to station-level views.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const optimalRec = getOptimalRecommendation();

  const stations: StationWithMeta[] = contextStations.map((station) => ({
    ...station,
    priceLevel: getPriceLevel(getEffectivePrice(station)),
    isOptimal: optimalRec.station.id === station.id,
  }));

  const getPriceColor = (
    level?: 'cheap' | 'moderate' | 'expensive'
  ) => {
    switch (level) {
      case 'cheap':
        return 'bg-[#10B981]';
      case 'moderate':
        return 'bg-[#F59E0B]';
      case 'expensive':
        return 'bg-[#B3261E]';
      default:
        return 'bg-[#A3ADC0]';
    }
  };

  return (
    <div className="flex flex-col h-full relative">

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="flex-1 bg-white border border-[#E9EDF5] rounded-xl px-4 py-3 shadow-md">
          <div className="flex items-center gap-2">
            <TrendingDown size={18} className="text-[#3E5C9A]" />
            <span className="text-[14px] font-semibold text-[#0B132B]">
              Fuel Stations Near You
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white border border-[#E9EDF5] rounded-xl px-4 py-3 shadow-md"
        >
          <Filter size={18} className="text-[#5F6C7B]" />
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative bg-[#E9EDF5]">

        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#A3ADC0]">
          [Map View]
        </div>

        {/* Route */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 80 Q 60 60, 70 40"
            stroke="#3E5C9A"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* User */}
        <div className="absolute w-4 h-4 bg-[#6A7FDB] border-2 border-white rounded-full shadow-lg"
          style={{ left: '50%', top: '80%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Destination */}
        <div
          className="absolute w-8 h-8 bg-[#0B132B] rounded-full flex items-center justify-center"
          style={{ left: '70%', top: '40%', transform: 'translate(-50%, -50%)' }}
        >
          <MapPin size={16} className="text-white" />
        </div>

        {/* Stations */}
        {stations.map((station) => (
          <button
            key={station.id}
            onClick={() => setSelectedStation(station)}
            className="absolute group"
            style={{
              left: `${station.position.x}%`,
              top: `${station.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >

            {/* Marker */}
            <div
              className={`w-10 h-10 border-2 border-white shadow-lg rounded-full flex items-center justify-center text-white text-xs font-medium ${getPriceColor(
                station.priceLevel
              )}`}
            >
              ${getEffectivePrice(station).toFixed(2)}

              {station.hasRewards && (
                <Star
                  size={10}
                  className="absolute -top-1 -right-1 text-[#F59E0B] fill-[#F59E0B]"
                />
              )}
            </div>

            {/* Label */}
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white px-2 py-1 rounded-lg text-[12px] shadow-md border border-[#E9EDF5]">
                {station.name}
              </div>
            </div>

          </button>
        ))}
      </div>

      {/* Bottom Sheet */}
      {selectedStation && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-[#E9EDF5] p-6">

          <button
            onClick={() => setSelectedStation(null)}
            className="absolute top-4 right-4 text-[#A3ADC0]"
          >
            <X size={20} />
          </button>

          <h3 className="text-[24px] font-semibold text-[#0B132B] mb-1">
            {selectedStation.name}
          </h3>

          <div className="text-[13px] text-[#5F6C7B] mb-3">
            {selectedStation.distance} • {selectedStation.detourMinutes} min detour
          </div>

          <div className="text-[32px] font-semibold text-[#0B132B] mb-4">
            ${getEffectivePrice(selectedStation).toFixed(2)}
          </div>

          <Button fullWidth size="lg">
            <Navigation size={18} />
            Navigate
          </Button>

        </div>
      )}
    </div>
  );
}