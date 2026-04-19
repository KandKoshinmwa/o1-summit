import { CheckCircle, Car, MapPin, TrendingDown, Sparkles } from 'lucide-react';

interface SummaryProfileStepProps {
  onComplete: () => void;
  profileData: any;
}

export default function SummaryProfileStep({ onComplete, profileData }: SummaryProfileStepProps) {
  // Calculate estimated weekly cost based on vehicle profile
  const estimateWeeklyCost = () => {
    const mpg = profileData.mpg || 25;
    const avgPrice = 3.89; // Default gas price
    const weeklyMiles = 100; // Assumed average
    const gallonsNeeded = weeklyMiles / mpg;
    const baseCost = gallonsNeeded * avgPrice;
    const lowEstimate = (baseCost * 0.9).toFixed(0);
    const highEstimate = (baseCost * 1.1).toFixed(0);
    return { low: lowEstimate, high: highEstimate };
  };

  const costEstimate = estimateWeeklyCost();

  const getVehicleTypeLabel = () => {
    const types: Record<string, string> = {
      compact: 'Compact',
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Truck',
    };
    return types[profileData.vehicleType] || 'Vehicle';
  };

  const getFuelTypeLabel = () => {
    const types: Record<string, string> = {
      gas: 'Gas',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      electric: 'Electric',
    };
    return types[profileData.fuelType] || 'Fuel';
  };

  const getFlexibilityLabel = () => {
    const flex: Record<string, string> = {
      fixed: 'Fixed Route',
      slightly: 'Slightly Flexible',
      highly: 'Highly Flexible',
    };
    return flex[profileData.routeFlexibility] || 'Not set';
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center">
            <CheckCircle size={32} className="text-[#10B981]" />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">You're All Set!</h1>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Your personalized fuel optimization profile is ready
            </p>
          </div>
        </div>

        {/* Estimated Costs */}
        <div className="border-2 border-[#10B981] bg-[#D1FAE5] rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#10B981]" />
            <h3 className="text-[16px] font-semibold text-[#0B132B] leading-[1.5]">Estimated Weekly Fuel Cost</h3>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[36px] font-semibold text-[#0B132B] leading-[1.1]">${costEstimate.low}</span>
            <span className="text-[20px] text-[#5F6C7B] leading-[1.3]">– ${costEstimate.high}</span>
          </div>
          <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
            Based on your {getVehicleTypeLabel()} averaging {profileData.mpg || 25} MPG
          </p>
        </div>

        {/* Profile Summary */}
        <div className="space-y-4 mb-6">
          {/* Vehicle Profile */}
          <div className="border border-[#E9EDF5] rounded-xl p-4 bg-white">
            <div className="flex items-center gap-3 mb-3">
              <Car size={20} className="text-[#3E5C9A]" />
              <h3 className="text-[14px] font-semibold text-[#0B132B] leading-[1.4]">Vehicle Profile</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">Type</span>
                <span className="text-[12px] font-medium text-[#0B132B] leading-[1.4]">{getVehicleTypeLabel()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">Fuel</span>
                <span className="text-[12px] font-medium text-[#0B132B] leading-[1.4]">{getFuelTypeLabel()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">Efficiency</span>
                <span className="text-[12px] font-medium text-[#0B132B] leading-[1.4]">
                  {profileData.mpgUnknown ? 'Estimated' : `${profileData.mpg} MPG`}
                </span>
              </div>
            </div>
          </div>

          {/* Commute Info */}
          {profileData.commuteRoute && (
            <div className="border border-[#E9EDF5] rounded-xl p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-[#3E5C9A]" />
                <h3 className="text-[14px] font-semibold text-[#0B132B] leading-[1.4]">Commute Behavior</h3>
              </div>
              <div className="space-y-2">
                {profileData.commuteRoute.from && (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">Route</span>
                    <span className="text-[12px] font-medium text-[#0B132B] leading-[1.4]">
                      {profileData.commuteRoute.from} → {profileData.commuteRoute.to}
                    </span>
                  </div>
                )}
                {profileData.routeFlexibility && (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">Flexibility</span>
                    <span className="text-[12px] font-medium text-[#0B132B] leading-[1.4]">{getFlexibilityLabel()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Optimization Priorities */}
          {profileData.optimizationPriorities && (
            <div className="border border-[#E9EDF5] rounded-xl p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown size={20} className="text-[#3E5C9A]" />
                <h3 className="text-[14px] font-semibold text-[#0B132B] leading-[1.4]">Optimization Focus</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#E9EDF5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${profileData.optimizationPriorities.costSavings}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-medium text-[#0B132B] w-12 text-right leading-[1.4]">
                    {profileData.optimizationPriorities.costSavings}%
                  </span>
                  <span className="text-[12px] text-[#5F6C7B] w-20 leading-[1.4]">Cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#E9EDF5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F59E0B] rounded-full"
                      style={{ width: `${profileData.optimizationPriorities.timeEfficiency}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-medium text-[#0B132B] w-12 text-right leading-[1.4]">
                    {profileData.optimizationPriorities.timeEfficiency}%
                  </span>
                  <span className="text-[12px] text-[#5F6C7B] w-20 leading-[1.4]">Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#E9EDF5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6A7FDB] rounded-full"
                      style={{ width: `${profileData.optimizationPriorities.stationQuality}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-medium text-[#0B132B] w-12 text-right leading-[1.4]">
                    {profileData.optimizationPriorities.stationQuality}%
                  </span>
                  <span className="text-[12px] text-[#5F6C7B] w-20 leading-[1.4]">Quality</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Final Message */}
        <div className="border border-[#3E5C9A] bg-[#E0E7FF] rounded-xl p-4">
          <p className="text-[14px] text-[#0B132B] font-medium mb-2 leading-[1.4]">
            Your recommendations are now personalized
          </p>
          <p className="text-[12px] text-[#5F6C7B] leading-[1.4]">
            The Fuel Decision Engine will use this profile to help you make smarter, data-driven fuel decisions and maximize your savings.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onComplete}
        className="w-full bg-[#10B981] text-white rounded-xl py-4 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#059669]"
      >
        Start Saving
      </button>
    </div>
  );
}
