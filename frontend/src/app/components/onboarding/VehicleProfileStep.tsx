import { Car, Zap } from 'lucide-react';
import { useState } from 'react';

interface VehicleProfileStepProps {
  onNext: (data: any) => void;
}

export default function VehicleProfileStep({ onNext }: VehicleProfileStepProps) {
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [mpg, setMpg] = useState('');
  const [mpgUnknown, setMpgUnknown] = useState(false);

  const handleNext = () => {
    if (vehicleType && fuelType) {
      onNext({
        vehicleType,
        fuelType,
        mpg: mpgUnknown ? 0 : parseFloat(mpg) || 0,
        mpgUnknown,
      });
    }
  };

  const canContinue = vehicleType && fuelType && (mpgUnknown || mpg);

  const vehicleTypes = [
    { id: 'compact', label: 'Compact', mpgEstimate: 30 },
    { id: 'sedan', label: 'Sedan', mpgEstimate: 28 },
    { id: 'suv', label: 'SUV', mpgEstimate: 24 },
    { id: 'truck', label: 'Truck', mpgEstimate: 20 },
  ];

  const fuelTypes = [
    { id: 'gas', label: 'Gas' },
    { id: 'diesel', label: 'Diesel' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'electric', label: 'Electric' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <Car size={32} className="text-[#3E5C9A]" />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">Vehicle Profile</h1>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Help us estimate your baseline fuel consumption and trip costs
            </p>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
            Vehicle Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {vehicleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setVehicleType(type.id)}
                className={`border-2 rounded-xl p-4 text-left transition-all ${
                  vehicleType === type.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="text-[14px] font-medium text-[#0B132B] leading-[1.4]">{type.label}</div>
                <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">~{type.mpgEstimate} mpg</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="mb-6">
          <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
            Fuel Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fuelTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFuelType(type.id)}
                className={`border-2 rounded-xl p-4 text-center transition-all ${
                  fuelType === type.id
                    ? 'border-[#3E5C9A] bg-[#E0E7FF]'
                    : 'border-[#E9EDF5] bg-white hover:border-[#6A7FDB]'
                }`}
              >
                <div className="text-[14px] font-medium text-[#0B132B] leading-[1.4]">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Efficiency */}
        {fuelType && fuelType !== 'electric' && (
          <div>
            <label className="text-[14px] text-[#0B132B] font-medium mb-3 block leading-[1.4]">
              Fuel Efficiency (MPG)
            </label>
            {!mpgUnknown ? (
              <div className="space-y-2">
                <input
                  type="number"
                  value={mpg}
                  onChange={(e) => setMpg(e.target.value)}
                  placeholder="25"
                  className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] leading-[1.4] focus:outline-none focus:border-[#6A7FDB]"
                />
                <button
                  onClick={() => setMpgUnknown(true)}
                  className="text-[14px] text-[#3E5C9A] font-medium hover:underline leading-[1.4]"
                >
                  I don't know my MPG
                </button>
              </div>
            ) : (
              <div className="border border-[#6A7FDB] bg-[#E0E7FF] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-[#3E5C9A]" />
                  <span className="text-[14px] font-medium text-[#0B132B] leading-[1.4]">We'll estimate for you</span>
                </div>
                <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                  Based on your {vehicleType}, we'll use typical fuel efficiency data
                </p>
                <button
                  onClick={() => {
                    setMpgUnknown(false);
                    setMpg('');
                  }}
                  className="text-[12px] text-[#3E5C9A] font-medium hover:underline mt-2 leading-[1.4]"
                >
                  Enter manually instead
                </button>
              </div>
            )}
          </div>
        )}

        {fuelType === 'electric' && (
          <div className="border border-[#10B981] bg-[#D1FAE5] rounded-lg p-4">
            <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">Electric Vehicle</div>
            <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
              We'll help you find charging stations and optimize electricity costs
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleNext}
        disabled={!canContinue}
        className={`w-full rounded-xl py-4 px-4 text-[14px] font-medium leading-[1.4] transition-colors ${
          canContinue
            ? 'bg-[#3E5C9A] text-white hover:bg-[#2f4775]'
            : 'bg-[#E9EDF5] text-[#A3ADC0] cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}
