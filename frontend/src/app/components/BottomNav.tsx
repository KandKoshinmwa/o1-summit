import { LayoutDashboard, MapPin, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { isFleetManager } = useAppContext();

  // Fleet Managers only see Dashboard and Profile
  // Drivers see Dashboard, Stations (Map), and Profile
  const allTabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['DRIVER', 'FLEET_MANAGER'] },
    { id: 'map', icon: MapPin, label: 'Stations', roles: ['DRIVER'] },
    { id: 'profile', icon: User, label: 'Profile', roles: ['DRIVER', 'FLEET_MANAGER'] },
  ];

  const tabs = isFleetManager()
    ? allTabs.filter(tab => tab.roles.includes('FLEET_MANAGER'))
    : allTabs.filter(tab => tab.roles.includes('DRIVER'));

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9EDF5] px-2 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-[#0B132B]' : 'text-[#A3ADC0]'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[12px] font-medium leading-[1.4]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
