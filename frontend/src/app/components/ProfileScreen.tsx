import { MapPin, DollarSign, Bell, Shield, ChevronRight, TrendingDown, Star, Car, Gauge, LogOut, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './shared/Card';

interface ProfileScreenProps {
  onLogout?: () => void;
  onCreateFleet?: () => void;
}

export default function ProfileScreen({ onLogout, onCreateFleet }: ProfileScreenProps = {}) {
  const { state, updateBudget, updatePreferredStation, updateUserProfile, isFleetManager } = useAppContext();

  // FLEET MANAGER: Minimal utility profile
  if (isFleetManager()) {
    return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">Profile</h1>
          <p className="text-[14px] text-[#5F6C7B] leading-[1.4]">Fleet Manager account</p>
        </div>

        {/* Fleet Information */}
        {state.fleetCode && (
          <Card className="bg-[#E0E7FF] border-[#6A7FDB]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3E5C9A] flex items-center justify-center">
                <Building2 size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-[#3E5C9A] font-semibold uppercase mb-0.5 leading-[1.4]">
                  Fleet Manager
                </div>
                <div className="text-[16px] text-[#0B132B] font-semibold leading-[1.3] mb-1">
                  {state.fleetName || `Fleet ${state.fleetCode}`}
                </div>
                <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                  Code: <span className="font-mono font-medium">{state.fleetCode}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Logout */}
        {onLogout && (
          <div className="flex flex-col gap-2 mt-12 pb-8">
            <button
              onClick={onLogout}
              className="w-full border border-[#E9EDF5] bg-white rounded-lg p-4 hover:bg-[#F7F8FA] flex items-center justify-center gap-2 text-left transition-colors"
            >
              <LogOut size={20} className="text-[#B3261E]" />
              <span className="text-[14px] text-[#B3261E] font-medium leading-[1.4]">Log Out</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // DRIVER: Full profile with all settings (COMPLETELY LOCKED - DO NOT MODIFY)
  const [editingBudget, setEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(state.weeklyBudget);

  // Optimization Preferences
  const [costSavings, setCostSavings] = useState(state.optimizationPriorities.costSavings);
  const [timeEfficiency, setTimeEfficiency] = useState(state.optimizationPriorities.timeEfficiency);
  const [stationQuality, setStationQuality] = useState(state.optimizationPriorities.stationQuality);
  const [detourTolerance, setDetourTolerance] = useState(state.detourTolerance);

  // Update context when optimization preferences change
  useEffect(() => {
    updateUserProfile({
      optimizationPriorities: { costSavings, timeEfficiency, stationQuality },
      detourTolerance,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costSavings, timeEfficiency, stationQuality, detourTolerance]);

  const getVehicleTypeLabel = () => {
    const types: Record<string, string> = {
      compact: 'Compact',
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Truck',
    };
    return types[state.vehicleProfile?.vehicleType || ''] || 'Not set';
  };

  const getFuelTypeLabel = () => {
    const types: Record<string, string> = {
      gas: 'Gas',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      electric: 'Electric',
    };
    return types[state.vehicleProfile?.fuelType || ''] || 'Not set';
  };

  const handleSaveBudget = () => {
    if (!isNaN(tempBudget) && tempBudget > 0) {
      updateBudget(tempBudget);
    }
    setEditingBudget(false);
  };

  const handleBudgetChange = (value: string) => {
    const parsed = parseFloat(value);
    setTempBudget(isNaN(parsed) ? 0 : parsed);
  };

  // Auto-balancing slider handlers
  const handleCostChange = (value: number) => {
    const remaining = 100 - value;
    const ratio = remaining / (timeEfficiency + stationQuality || 1);
    setCostSavings(value);
    setTimeEfficiency(Math.round(timeEfficiency * ratio));
    setStationQuality(Math.round(stationQuality * ratio));
  };

  const handleTimeChange = (value: number) => {
    const remaining = 100 - value;
    const ratio = remaining / (costSavings + stationQuality || 1);
    setTimeEfficiency(value);
    setCostSavings(Math.round(costSavings * ratio));
    setStationQuality(Math.round(stationQuality * ratio));
  };

  const handleQualityChange = (value: number) => {
    const remaining = 100 - value;
    const ratio = remaining / (costSavings + timeEfficiency || 1);
    setStationQuality(value);
    setCostSavings(Math.round(costSavings * ratio));
    setTimeEfficiency(Math.round(timeEfficiency * ratio));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">Settings</h1>
        <p className="text-[14px] text-[#5F6C7B] leading-[1.4]">Configure your Fuel Decision Engine</p>
      </div>

      {/* Savings Summary */}
      <Card variant="success">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={20} className="text-[#10B981]" />
          <h3 className="text-[14px] font-semibold text-[#0B132B] leading-[1.4]">Savings This Month</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">${(state.savedThisWeek * 4.3).toFixed(0)}</div>
            <div className="text-[12px] text-[#5F6C7B] font-medium leading-[1.4]">Total saved</div>
          </div>
          <div>
            <div className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">${state.savedThisWeek.toFixed(0)}</div>
            <div className="text-[12px] text-[#5F6C7B] font-medium leading-[1.4]">This week</div>
          </div>
        </div>
      </Card>

      {/* Optimization Preferences */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] text-[#5F6C7B] font-medium leading-[1.4]">Recommendation Priorities</h3>
        <div className="border border-[#E9EDF5] rounded-lg p-4 bg-white">
          {/* Cost vs Time vs Quality */}
          <div className="mb-6">
            <div className="text-[12px] text-[#5F6C7B] mb-4 leading-[1.4]">Weights how the engine calculates your optimal decision</div>

            {/* Cost Savings */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Cost Savings</span>
                <span className="text-[14px] text-[#3E5C9A] font-semibold leading-[1.4]">{costSavings}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={costSavings}
                onChange={(e) => handleCostChange(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10B981 0%, #10B981 ${costSavings}%, #E9EDF5 ${costSavings}%, #E9EDF5 100%)`,
                }}
              />
            </div>

            {/* Time Efficiency */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Time Efficiency</span>
                <span className="text-[14px] text-[#3E5C9A] font-semibold leading-[1.4]">{timeEfficiency}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={timeEfficiency}
                onChange={(e) => handleTimeChange(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6A7FDB 0%, #6A7FDB ${timeEfficiency}%, #E9EDF5 ${timeEfficiency}%, #E9EDF5 100%)`,
                }}
              />
            </div>

            {/* Station Quality */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Station Quality</span>
                <span className="text-[14px] text-[#3E5C9A] font-semibold leading-[1.4]">{stationQuality}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={stationQuality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${stationQuality}%, #E9EDF5 ${stationQuality}%, #E9EDF5 100%)`,
                }}
              />
            </div>
          </div>

          {/* Detour Tolerance */}
          <div className="pt-4 border-t border-[#E9EDF5]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Detour Tolerance</span>
              <span className="text-[14px] text-[#3E5C9A] font-semibold leading-[1.4]">{detourTolerance} min</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={detourTolerance}
              onChange={(e) => setDetourTolerance(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3E5C9A 0%, #3E5C9A ${(detourTolerance / 15) * 100}%, #E9EDF5 ${(detourTolerance / 15) * 100}%, #E9EDF5 100%)`,
              }}
            />
            <div className="text-[12px] text-[#5F6C7B] mt-1 leading-[1.4]">Maximum extra drive time for better prices</div>
          </div>
        </div>
      </div>

      {/* Weekly Budget */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] text-[#5F6C7B] font-medium leading-[1.4]">Budget</h3>
        <div className="border border-[#E9EDF5] rounded-lg p-4 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Weekly Commute Budget</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">Track your spending goal</div>
            </div>
          </div>
          {editingBudget ? (
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6C7B]">$</div>
                <input
                  type="number"
                  value={tempBudget || ''}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  min="0"
                  step="1"
                  className="w-full border border-[#E9EDF5] rounded-lg pl-7 pr-3 py-2 text-[14px] text-[#0B132B] leading-[1.4] focus:outline-none focus:border-[#6A7FDB]"
                />
              </div>
              <button
                onClick={handleSaveBudget}
                className="bg-[#6A7FDB] text-white rounded-lg px-4 text-[14px] font-medium leading-[1.4]"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setTempBudget(state.weeklyBudget);
                setEditingBudget(true);
              }}
              className="w-full bg-[#F7F8FA] border border-[#E9EDF5] rounded-lg p-3 text-left flex items-center justify-between mt-2"
            >
              <span className="text-[16px] text-[#0B132B] leading-[1.5]">${state.weeklyBudget.toFixed(2)}</span>
              <ChevronRight size={16} className="text-[#A3ADC0]" />
            </button>
          )}
        </div>
      </div>

      {/* Context Settings */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] text-[#5F6C7B] font-medium leading-[1.4]">Context Settings</h3>
        <div className="border border-[#E9EDF5] rounded-lg divide-y divide-[#E9EDF5] bg-white">
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <Bell size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Weather Sensitivity</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">Medium</div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <Star size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Preferred Brands</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{state.preferredStation}</div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <DollarSign size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Price Sensitivity</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">Medium</div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
        </div>
      </div>

      {/* Vehicle Profile */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] text-[#5F6C7B] font-medium leading-[1.4]">Vehicle Profile</h3>
        <div className="border border-[#E9EDF5] rounded-lg divide-y divide-[#E9EDF5] bg-white">
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <Car size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Vehicle Type</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{getVehicleTypeLabel()}</div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <Gauge size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Fuel Type</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{getFuelTypeLabel()}</div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
          <button className="p-4 hover:bg-[#F7F8FA] flex items-center gap-3 text-left w-full">
            <Gauge size={20} className="text-[#5F6C7B]" />
            <div className="flex-1">
              <div className="text-[14px] text-[#0B132B] font-medium mb-0.5 leading-[1.4]">Fuel Efficiency</div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                {state.vehicleProfile?.mpgUnknown ? 'Using estimated MPG' : `${state.vehicleProfile?.mpg || 0} MPG`}
              </div>
            </div>
            <ChevronRight size={16} className="text-[#A3ADC0]" />
          </button>
        </div>
      </div>

      {/* Create Fleet */}
      {onCreateFleet && (
        <div className="flex flex-col gap-2 mt-8">
          <button
            onClick={onCreateFleet}
            className="w-full border-2 border-[#3E5C9A] bg-[#E0E7FF] rounded-lg p-4 hover:bg-[#C7D2FE] flex items-center justify-center gap-2 transition-colors"
          >
            <Building2 size={20} className="text-[#3E5C9A]" />
            <span className="text-[14px] text-[#3E5C9A] font-medium leading-[1.4]">Create Fleet</span>
          </button>
        </div>
      )}

      {/* Logout */}
      {onLogout && (
        <div className="flex flex-col gap-2 mt-8 pb-8">
          <button
            onClick={onLogout}
            className="w-full border border-[#E9EDF5] bg-white rounded-lg p-4 hover:bg-[#F7F8FA] flex items-center justify-center gap-2 text-left transition-colors"
          >
            <LogOut size={20} className="text-[#B3261E]" />
            <span className="text-[14px] text-[#B3261E] font-medium leading-[1.4]">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
