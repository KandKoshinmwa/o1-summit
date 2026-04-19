interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="px-6 py-4 border-b border-[#E9EDF5]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-[#5F6C7B] font-medium leading-[1.4]">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-[12px] text-[#3E5C9A] font-semibold leading-[1.4]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-[#E9EDF5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3E5C9A] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
