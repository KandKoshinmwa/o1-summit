import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import DashboardScreen from './components/DashboardScreen';
import ProfileScreen from './components/ProfileScreen';
import MapScreen from './components/MapScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HeroScreen from './components/auth/HeroScreen';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import CreateFleetScreen from './components/fleet/CreateFleetScreen';

type AppScreen = 'hero' | 'login' | 'signup' | 'onboarding' | 'main' | 'createFleet';

function AppContent() {
  const { isFleetManager, isUnassigned, createFleet } = useAppContext();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('hero');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleHeroContinue = () => {
    setCurrentScreen('login');
  };

  // RETURNING USER: Login → Dashboard (skip onboarding)
  const handleLogin = () => {
    setCurrentScreen('main');
  };

  // NEW USER: Signup → Onboarding → Dashboard
  const handleSignup = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('main');
  };

  // LOGOUT: Clear session and return to hero
  const handleLogout = () => {
    setCurrentScreen('hero');
    setActiveTab('dashboard'); // Reset to default tab
  };

  // FLEET: Navigate to create fleet screen
  const handleCreateFleet = () => {
    setCurrentScreen('createFleet');
  };

  // FLEET: Return from create fleet to profile
  const handleFleetBack = () => {
    setCurrentScreen('main');
    setActiveTab('profile'); // Return to profile tab
  };

  // FLEET: Mark fleet as created and return to dashboard
  const handleFleetCreated = (fleetName: string, fleetCode: string) => {
    createFleet(fleetName, fleetCode);
    setCurrentScreen('main');
    setActiveTab('dashboard'); // Return to dashboard to see Fleet Analytics
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen
          onCreateFleet={isUnassigned() ? handleCreateFleet : undefined}
        />;
      case 'map':
        return <MapScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} onCreateFleet={handleCreateFleet} />;
      default:
        return <DashboardScreen
          onCreateFleet={isUnassigned() ? handleCreateFleet : undefined}
        />;
    }
  };

  return (
    <>
      {currentScreen === 'hero' && (
        <HeroScreen onContinue={handleHeroContinue} />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onSignupClick={() => setCurrentScreen('signup')}
        />
      )}

      {currentScreen === 'signup' && (
        <SignupScreen
          onSignup={handleSignup}
          onLoginClick={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'createFleet' && (
        <CreateFleetScreen onBack={handleFleetBack} onFleetCreated={handleFleetCreated} />
      )}

      {currentScreen === 'main' && (
        <div className="size-full flex flex-col bg-white max-w-md mx-auto relative">
          {/* Status Bar Placeholder */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-center">
            <div className="text-xs text-gray-600">9:41</div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto pb-20">
            {renderScreen()}
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}