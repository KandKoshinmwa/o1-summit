import { useState } from 'react';
import { Building2, Copy, Check } from 'lucide-react';

interface CreateFleetScreenProps {
  onBack: () => void;
  onFleetCreated?: (fleetName: string, fleetCode: string) => void;
}

export default function CreateFleetScreen({ onBack, onFleetCreated }: CreateFleetScreenProps) {
  const [fleetName, setFleetName] = useState('');
  const [fleetCode, setFleetCode] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateFleetCode = () => {
    // Generate a simple 6-character alphanumeric code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateFleet = (e: React.FormEvent) => {
    e.preventDefault();
    if (fleetName.trim()) {
      const code = generateFleetCode();
      setFleetCode(code);
      setIsCreated(true);
    }
  };

  const handleCopyCode = () => {
    // Fallback copy mechanism for environments where Clipboard API is blocked
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fleetCode).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          // If Clipboard API fails, use fallback
          fallbackCopyTextToClipboard(fleetCode);
        });
      } else {
        // Use fallback if Clipboard API not available
        fallbackCopyTextToClipboard(fleetCode);
      }
    } catch (err) {
      fallbackCopyTextToClipboard(fleetCode);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }

    document.body.removeChild(textArea);
  };

  if (isCreated) {
    return (
      <div className="size-full flex flex-col bg-white max-w-md mx-auto">
        {/* Status Bar */}
        <div className="h-12 bg-white border-b border-[#E9EDF5] flex items-center justify-center">
          <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">9:41</div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-20">
          {/* Success Icon */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#D1FAE5] flex items-center justify-center">
              <Building2 size={40} className="text-[#10B981]" />
            </div>
            <div className="text-center">
              <h1 className="text-[28px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">Fleet Created!</h1>
              <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
                Your fleet has been created.<br />Share this code with your drivers to connect them.
              </p>
            </div>
          </div>

          {/* Fleet Details */}
          <div className="border border-[#E9EDF5] rounded-xl p-6 mb-6 bg-white">
            <div className="mb-4">
              <div className="text-[12px] text-[#5F6C7B] font-medium mb-1 leading-[1.4]">Fleet Name</div>
              <div className="text-[18px] text-[#0B132B] font-semibold leading-[1.3]">{fleetName}</div>
            </div>

            <div className="mb-4">
              <div className="text-[12px] text-[#5F6C7B] font-medium mb-2 leading-[1.4]">Fleet Code</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#F7F8FA] border border-[#E9EDF5] rounded-lg px-4 py-3">
                  <div className="text-[24px] font-bold text-[#0B132B] tracking-wider leading-[1.2] text-center">
                    {fleetCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="w-12 h-12 flex items-center justify-center border border-[#E9EDF5] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                  {copied ? (
                    <Check size={20} className="text-[#10B981]" />
                  ) : (
                    <Copy size={20} className="text-[#5F6C7B]" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9EDF5]">
              <div className="text-[12px] text-[#5F6C7B] font-medium mb-1 leading-[1.4]">Fleet Status</div>
              <div className="text-[14px] text-[#0B132B] leading-[1.4]">0 drivers connected</div>
            </div>
          </div>

          {/* Done Button */}
          <button
            onClick={() => onFleetCreated ? onFleetCreated(fleetName, fleetCode) : onBack()}
            className="w-full bg-[#0B132B] text-white rounded-lg py-4 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#1a2240] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-white max-w-md mx-auto">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-[#E9EDF5] flex items-center justify-center">
        <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">9:41</div>
      </div>

      {/* Header */}
      <div className="border-b border-[#E9EDF5] px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#3E5C9A] text-[14px] font-medium leading-[1.4] hover:underline"
          >
            Cancel
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-[18px] font-semibold text-[#0B132B] leading-[1.3]">Create Fleet</h1>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-8 pt-8 pb-20">
        {/* Icon */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <Building2 size={32} className="text-[#3E5C9A]" />
          </div>
          <p className="text-[14px] text-[#5F6C7B] text-center leading-[1.5]">
            Create a fleet to connect your company drivers and track aggregated savings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateFleet} className="flex-1 flex flex-col">
          <div className="mb-6">
            <label className="text-[13px] text-[#0B132B] font-medium block mb-2 leading-[1.4]">
              Company / Fleet Name
            </label>
            <input
              type="text"
              value={fleetName}
              onChange={(e) => setFleetName(e.target.value)}
              placeholder="e.g., Acme Logistics"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] placeholder-[#A3ADC0] leading-[1.4] focus:outline-none focus:border-[#3E5C9A]"
              required
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Create Button */}
          <button
            type="submit"
            className="w-full bg-[#0B132B] text-white rounded-lg py-4 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#1a2240] transition-colors"
          >
            Create Fleet
          </button>
        </form>
      </div>
    </div>
  );
}
