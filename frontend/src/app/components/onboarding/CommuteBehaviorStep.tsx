import { MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface CommuteBehaviorStepProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}

export default function CommuteBehaviorStep({ onNext, onSkip }: CommuteBehaviorStepProps) {
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');
  const [frequency, setFrequency] = useState('');
  const [flexibility, setFlexibility] = useState('');

  const handleNext = () => {
    onNext({
      commuteRoute: { from: routeFrom, to: routeTo },
      commuteFrequency: frequency,
      routeFlexibility: flexibility,
    });
  };

  const frequencies = [
    { id: 'daily', label: 'Daily', description: '5+ days/week' },
    { id: 'weekly', label: 'Weekly', description: '2-4 days/week' },
    { id: 'variable', label: 'Variable', description: 'Irregular schedule' },
  ];

  const flexibilities = [
    { id: 'fixed', label: 'Fixed Route', description: 'Same path every time' },
    { id: 'slightly', label: 'Slightly Flexible', description: '1-3 min detour OK' },
    { id: 'highly', label: 'Highly Flexible', description: '5+ min detour OK' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <MapPin size={32} className="text-[#3E5C9A]" />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">Commute Behavior</h1>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Understanding your route helps us find optimal fuel stops
            </p>
          </div>
        </div>

        {/* Route */}
        <div className="mb-6">
          <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
            Typical Route
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={routeFrom}
              onChange={(e) => setRouteFrom(e.target.value)}
              placeholder="From (e.g., Home)"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] leading-[1.4] focus:outline-none focus:border-[#6A7FDB]"
            />
            <input
              type="text"
              value={routeTo}
              onChange={(e) => setRouteTo(e.target.value)}
              placeholder="To (e.g., Work)"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] leading-[1.4] focus:outline-none focus:border-[#6A7FDB]"
            />
          </div>
        </div>

        {/* Frequency */}
        <div className="mb-6">
          <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
            Commute Frequency
          </label>
          <div className="space-y-2">
            {frequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                  frequency === freq.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={18} className={frequency === freq.id ? 'text-[#3E5C9A]' : 'text-[#5F6C7B]'} />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#0B132B] leading-[1.4]">{freq.label}</div>
                    <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{freq.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Route Flexibility */}
        <div>
          <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
            Route Flexibility
          </label>
          <div className="space-y-2">
            {flexibilities.map((flex) => (
              <button
                key={flex.id}
                onClick={() => setFlexibility(flex.id)}
                className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
                  flexibility === flex.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">{flex.label}</div>
                <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{flex.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 border border-[#E9EDF5] rounded-lg p-4 bg-[#F7F8FA]">
          <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
            <span className="font-medium text-[#0B132B]">Why this matters:</span> We use your flexibility to determine acceptable detour distances for cost-saving fuel stops.
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
