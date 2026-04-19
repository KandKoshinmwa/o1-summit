import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import ProgressIndicator from './ProgressIndicator';
import VehicleProfileStep from './VehicleProfileStep';
import CommuteBehaviorStep from './CommuteBehaviorStep';
import OptimizationPrioritiesStep from './OptimizationPrioritiesStep';
import ContextPreferencesStep from './ContextPreferencesStep';
import SummaryProfileStep from './SummaryProfileStep';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { updateUserProfile } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    // Vehicle Profile (required)
    vehicleType: '',
    fuelType: '',
    mpg: 0,
    mpgUnknown: false,

    // Commute Behavior
    commuteRoute: { from: '', to: '' },
    commuteFrequency: '',
    routeFlexibility: '',

    // Optimization Priorities
    optimizationPriorities: {
      costSavings: 70,
      timeEfficiency: 20,
      stationQuality: 10,
    },
    detourTolerance: 5,

    // Context Preferences
    contextPreferences: {
      weatherSensitivity: 'medium',
      preferredBrands: [] as string[],
      priceSensitivity: 'medium',
    },
  });

  const totalSteps = 5;

  const handleNext = (stepData?: any) => {
    if (stepData) {
      setOnboardingData({ ...onboardingData, ...stepData });
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Save profile data to context
    updateUserProfile({
      vehicleProfile: {
        vehicleType: onboardingData.vehicleType,
        fuelType: onboardingData.fuelType,
        mpg: onboardingData.mpg,
        mpgUnknown: onboardingData.mpgUnknown,
      },
      commuteProfile: {
        route: onboardingData.commuteRoute,
        frequency: onboardingData.commuteFrequency,
        flexibility: onboardingData.routeFlexibility,
      },
      optimizationPriorities: onboardingData.optimizationPriorities,
      detourTolerance: onboardingData.detourTolerance,
    });
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <VehicleProfileStep onNext={handleNext} />;
      case 1:
        return <CommuteBehaviorStep onNext={handleNext} onSkip={handleSkip} />;
      case 2:
        return <OptimizationPrioritiesStep onNext={handleNext} onSkip={handleSkip} />;
      case 3:
        return <ContextPreferencesStep onNext={handleNext} onSkip={handleSkip} />;
      case 4:
        return <SummaryProfileStep onComplete={handleComplete} profileData={onboardingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="size-full flex flex-col bg-white max-w-md mx-auto">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-[#E9EDF5] flex items-center justify-center">
        <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">9:41</div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-3 border-b border-[#E9EDF5]">
        <h1 className="text-[20px] font-semibold text-[#0B132B] mb-1 leading-[1.3]">Fuel Decision Engine</h1>
        <p className="text-[13px] text-[#5F6C7B] leading-[1.5]">
          Configure your financial optimization system
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        {renderStep()}
      </div>
    </div>
  );
}
