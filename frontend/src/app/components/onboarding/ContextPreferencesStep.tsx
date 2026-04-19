import { Cloud, Star, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface ContextPreferencesStepProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}

export default function ContextPreferencesStep({ onNext, onSkip }: ContextPreferencesStepProps) {
  const [weatherSensitivity, setWeatherSensitivity] = useState('medium');
  const [preferredBrands, setPreferredBrands] = useState<string[]>([]);
  const [priceSensitivity, setPriceSensitivity] = useState('medium');

  const handleNext = () => {
    onNext({
      contextPreferences: {
        weatherSensitivity,
        preferredBrands,
        priceSensitivity,
      },
    });
  };

  const weatherLevels = [
    { id: 'low', label: 'Low', description: 'Weather rarely affects my decisions' },
    { id: 'medium', label: 'Medium', description: 'Prefer covered stations in bad weather' },
    { id: 'high', label: 'High', description: 'Avoid detours in poor conditions' },
  ];

  const brands = ['Shell', 'Chevron', '76', 'Mobil', 'Arco', 'BP'];

  const priceSensitivities = [
    { id: 'low', label: 'Low', description: 'Convenience over savings' },
    { id: 'medium', label: 'Medium', description: 'Balanced approach' },
    { id: 'high', label: 'High', description: 'Maximum cost optimization' },
  ];

  const toggleBrand = (brand: string) => {
    if (preferredBrands.includes(brand)) {
      setPreferredBrands(preferredBrands.filter(b => b !== brand));
    } else {
      setPreferredBrands([...preferredBrands, brand]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <Cloud size={32} className="text-[#3E5C9A]" />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">Context Preferences</h1>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Optional settings to refine recommendations
            </p>
          </div>
        </div>

        {/* Weather Sensitivity */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Cloud size={18} className="text-[#5F6C7B]" />
            <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Weather Sensitivity</label>
          </div>
          <div className="space-y-2">
            {weatherLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setWeatherSensitivity(level.id)}
                className={`w-full border-2 rounded-xl p-3 text-left transition-all ${
                  weatherSensitivity === level.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">{level.label}</div>
                <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Brands */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star size={18} className="text-[#5F6C7B]" />
            <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Preferred Brands (Optional)</label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`border-2 rounded-lg py-2 px-3 text-center text-[12px] font-medium transition-all ${
                  preferredBrands.includes(brand)
                    ? 'border-[#10B981] bg-[#D1FAE5] text-[#0B132B]'
                    : 'border-[#E9EDF5] bg-white text-[#5F6C7B] hover:border-[#6A7FDB]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
            We'll prioritize these brands when prices are competitive
          </p>
        </div>

        {/* Price Sensitivity */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#5F6C7B]" />
            <label className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">Price Sensitivity</label>
          </div>
          <div className="space-y-2">
            {priceSensitivities.map((level) => (
              <button
                key={level.id}
                onClick={() => setPriceSensitivity(level.id)}
                className={`w-full border-2 rounded-xl p-3 text-left transition-all ${
                  priceSensitivity === level.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">{level.label}</div>
                <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 border border-[#E9EDF5] rounded-lg p-4 bg-[#F7F8FA]">
          <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
            <span className="font-medium text-[#0B132B]">Why this matters:</span> These preferences help us adapt recommendations to real-world conditions and your personal preferences.
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
