import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

interface SignupScreenProps {
  onSignup: () => void;
  onLoginClick: () => void;
}

export default function SignupScreen({ onSignup, onLoginClick }: SignupScreenProps) {
  const { joinFleet } = useAppContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fleetCode, setFleetCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && password) {
      // If fleet code provided, assign DRIVER role
      if (fleetCode.trim()) {
        joinFleet(fleetCode.trim());
      }
      // Otherwise user remains UNASSIGNED
      onSignup();
    }
  };

  return (
    <div className="size-full flex flex-col bg-white max-w-md mx-auto">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-[#E9EDF5] flex items-center justify-center">
        <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">9:41</div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        {/* Branding */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-bold text-[#0B132B] leading-[1.1] mb-2">
            Nova
          </h1>
          <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="text-[13px] text-[#0B132B] font-medium block mb-2 leading-[1.4]">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Smith"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] placeholder-[#A3ADC0] leading-[1.4] focus:outline-none focus:border-[#3E5C9A]"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="text-[13px] text-[#0B132B] font-medium block mb-2 leading-[1.4]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] placeholder-[#A3ADC0] leading-[1.4] focus:outline-none focus:border-[#3E5C9A]"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-[13px] text-[#0B132B] font-medium block mb-2 leading-[1.4]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] placeholder-[#A3ADC0] leading-[1.4] focus:outline-none focus:border-[#3E5C9A]"
              required
            />
          </div>

          {/* Fleet Code Input (Optional) */}
          <div>
            <label className="text-[13px] text-[#0B132B] font-medium block mb-2 leading-[1.4]">
              Join a company fleet (optional)
            </label>
            <input
              type="text"
              value={fleetCode}
              onChange={(e) => setFleetCode(e.target.value)}
              placeholder="Enter Fleet Code"
              className="w-full border border-[#E9EDF5] rounded-lg px-4 py-3 text-[14px] text-[#0B132B] placeholder-[#A3ADC0] leading-[1.4] focus:outline-none focus:border-[#3E5C9A]"
            />
            <p className="text-[12px] text-[#5F6C7B] mt-2 leading-[1.4]">
              If your employer provided a code, enter it to connect your account.
            </p>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-[#0B132B] text-white rounded-lg py-4 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#1a2240] transition-colors mt-6"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-[13px] text-[#5F6C7B] leading-[1.4]">
            Already have an account?{' '}
            <button
              onClick={onLoginClick}
              className="text-[#3E5C9A] font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
