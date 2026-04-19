import { TrendingDown, Clock, Shield } from 'lucide-react';
import { useState } from 'react';

interface OptimizationPrioritiesStepProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}

export default function OptimizationPrioritiesStep({ onNext, onSkip }: OptimizationPrioritiesStepProps) {
  const [costSavings, setCostSavings] = useState(70);
  const [timeEfficiency, setTimeEfficiency] = useState(20);
  const [stationQuality, setStationQuality] = useState(10);
  const [detourTolerance, setDetourTolerance] = useState(5);

  const handleNext = () => {
    onNext({
      optimizationPriorities: {
        costSavings,
        timeEfficiency,
        stationQuality,
      },
      detourTolerance,
    });
  };

  // Auto-balance sliders to total 100
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
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <TrendingDown size={32} className="text-[#3E5C9A]" />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">Optimization Priorities</h1>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Define what matters most in your fuel recommendations
            </p>
          </div>
        </div>

        {/* Priority Sliders */}
        <div className="space-y-6 mb-6">
          {/* Cost Savings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingDown size={18} className="text-[#10B981]" />
                <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Cost Savings</label>
              </div>
              <span className="text-[16px] font-semibold text-[#0B132B] leading-[1.5]">{costSavings}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={costSavings}
              onChange={(e) => handleCostChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#E9EDF5] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${costSavings}%, #E9EDF5 ${costSavings}%, #E9EDF5 100%)`
              }}
            />
            <p className="text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
              Prioritize lowest fuel prices
            </p>
          </div>

          {/* Time Efficiency */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#F59E0B]" />
                <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Time Efficiency</label>
              </div>
              <span className="text-[16px] font-semibold text-[#0B132B] leading-[1.5]">{timeEfficiency}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={timeEfficiency}
              onChange={(e) => handleTimeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#E9EDF5] rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              style={{
                background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${timeEfficiency}%, #E9EDF5 ${timeEfficiency}%, #E9EDF5 100%)`
              }}
            />
            <p className="text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
              Minimize detours and wait times
            </p>
          </div>

          {/* Station Quality */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-[#6A7FDB]" />
                <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Station Quality</label>
              </div>
              <span className="text-[16px] font-semibold text-[#0B132B] leading-[1.5]">{stationQuality}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={stationQuality}
              onChange={(e) => handleQualityChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#E9EDF5] rounded-lg appearance-none cursor-pointer accent-[#6A7FDB]"
              style={{
                background: `linear-gradient(to right, #6A7FDB 0%, #6A7FDB ${stationQuality}%, #E9EDF5 ${stationQuality}%, #E9EDF5 100%)`
              }}
            />
            <p className="text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
              Prefer well-rated, safe stations
            </p>
          </div>
        </div>

        {/* Detour Tolerance */}
        <div className="border border-[#E9EDF5] rounded-xl p-4 bg-[#F7F8FA]">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Maximum Detour</label>
            <span className="text-[16px] font-semibold text-[#0B132B] leading-[1.5]">{detourTolerance} min</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={detourTolerance}
            onChange={(e) => setDetourTolerance(parseInt(e.target.value))}
            className="w-full h-2 bg-[#E9EDF5] rounded-lg appearance-none cursor-pointer accent-[#3E5C9A]"
            style={{
              background: `linear-gradient(to right, #3E5C9A 0%, #3E5C9A ${detourTolerance * 10}%, #E9EDF5 ${detourTolerance * 10}%, #E9EDF5 100%)`
            }}
          />
          <div className="flex justify-between text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
            <span>No detour</span>
            <span>10 minutes</span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 border border-[#E9EDF5] rounded-lg p-4 bg-white">
          <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
            <span className="font-medium text-[#0B132B]">Why this matters:</span> These weights determine how we rank fuel stops in real-time recommendations.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="flex-1 border border-[#E9EDF5] rounded-xl py-4 px-4 text-[14px] text-[#0B132B] font-medium leading-[1.4] hover:bg-[#F7F8FA]"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-[#3E5C9A] text-white rounded-xl py-4 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#2f4775]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
