import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'UNASSIGNED' | 'DRIVER' | 'FLEET_MANAGER';

export interface Station {
  id: number;
  name: string;
  price: number;
  distance: string;
  distanceMiles: number;
  detourMinutes: number;
  hasRewards: boolean;
  rewardsAmount?: number;
  position: { x: number; y: number };
  isOpen: boolean;
  trafficDelay?: number;
}

interface PricePrediction {
  weeklyImpact: number;
  confidence: 'low' | 'medium' | 'high';
  reason: 'market_trend' | 'local_volatility' | 'historical_pattern';
  expectedChange: number;
}

interface Recommendation {
  station: Station;
  type: 'optimal' | 'cheapest' | 'fastest';
  totalCost: number;
  breakdown: {
    fuelCost: number;
    timeCost: number;
    detourCost: number;
  };
  reasoning: string;
  tradeoffs: string[];
}

interface VehicleProfile {
  vehicleType: string;
  fuelType: string;
  mpg: number;
  mpgUnknown: boolean;
}

interface CommuteProfile {
  route: { from: string; to: string };
  frequency: string;
  flexibility: string;
}

interface OptimizationPriorities {
  costSavings: number;
  timeEfficiency: number;
  stationQuality: number;
}

interface AppState {
  // User Role & Fleet Association
  userRole: UserRole;
  fleetId: string | null;
  fleetCode: string | null;
  fleetName: string | null;

  // User Settings
  weeklyBudget: number;
  predictionThreshold: number;
  spentSoFar: number;
  preferredStation: string;

  // Vehicle & Commute Profile
  vehicleProfile: VehicleProfile | null;
  commuteProfile: CommuteProfile | null;
  optimizationPriorities: OptimizationPriorities;
  detourTolerance: number;

  // Gas Data
  currentGasPrice: number;
  predictedGasPrice: number;
  priceChangeExpected: boolean;

  // Savings
  savedThisWeek: number;
  savingsGoal: number;
}

interface AppContextType {
  state: AppState;
  stations: Station[];
  updateBudget: (budget: number) => void;
  updatePredictionThreshold: (threshold: number) => void;
  updateSpending: (amount: number) => void;
  updatePreferredStation: (station: string) => void;
  updateUserProfile: (profile: Partial<AppState>) => void;
  getPriceLevel: (price: number) => 'cheap' | 'moderate' | 'expensive';
  getEffectivePrice: (station: Station) => number;
  getBudgetStatus: () => 'good' | 'warning' | 'over';
  getRecommendedStation: () => Station | null;
  // Three-Layer Decision Engine
  getPricePrediction: () => PricePrediction;
  getOptimalRecommendation: () => Recommendation;
  getAlternativeRecommendation: () => Recommendation | null;
  // Fleet Management
  joinFleet: (fleetCode: string) => void;
  createFleet: (fleetName: string, fleetCode: string) => void;
  isFleetManager: () => boolean;
  isDriver: () => boolean;
  isUnassigned: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    // User Role & Fleet Association - Default: UNASSIGNED
    userRole: 'UNASSIGNED',
    fleetId: null,
    fleetCode: null,
    fleetName: null,

    weeklyBudget: 60,
    predictionThreshold: 9,
    spentSoFar: 38.50,
    preferredStation: 'Chevron',
    vehicleProfile: {
      vehicleType: 'sedan',
      fuelType: 'gas',
      mpg: 28,
      mpgUnknown: false,
    },
    commuteProfile: {
      route: { from: 'Home', to: 'Work' },
      frequency: 'daily',
      flexibility: 'slightly',
    },
    optimizationPriorities: {
      costSavings: 70,
      timeEfficiency: 20,
      stationQuality: 10,
    },
    detourTolerance: 5,
    currentGasPrice: 3.89,
    predictedGasPrice: 4.04,
    priceChangeExpected: true,
    savedThisWeek: 12.50,
    savingsGoal: 10,
  });

  const stations: Station[] = [
    {
      id: 1,
      name: 'Chevron',
      price: 3.89,
      distance: '0.3 mi',
      distanceMiles: 0.3,
      detourMinutes: 2,
      hasRewards: true,
      rewardsAmount: 0.05,
      position: { x: 60, y: 35 },
      isOpen: true,
      trafficDelay: 1,
    },
    {
      id: 2,
      name: 'Shell',
      price: 3.82,
      distance: '1.1 mi',
      distanceMiles: 1.1,
      detourMinutes: 5,
      hasRewards: false,
      position: { x: 45, y: 55 },
      isOpen: true,
      trafficDelay: 3,
    },
    {
      id: 3,
      name: '76',
      price: 4.02,
      distance: '1.2 mi',
      distanceMiles: 1.2,
      detourMinutes: 6,
      hasRewards: false,
      position: { x: 75, y: 60 },
      isOpen: true,
      trafficDelay: 2,
    },
  ];

  const updateBudget = (budget: number) => {
    setState(prev => ({
      ...prev,
      weeklyBudget: budget,
      // Auto-adjust prediction threshold to 15% of budget
      predictionThreshold: Math.round(budget * 0.15 * 100) / 100,
    }));
  };

  const updatePredictionThreshold = (threshold: number) => {
    setState(prev => ({ ...prev, predictionThreshold: threshold }));
  };

  const updateSpending = (amount: number) => {
    setState(prev => ({ ...prev, spentSoFar: amount }));
  };

  const updatePreferredStation = (station: string) => {
    setState(prev => ({ ...prev, preferredStation: station }));
  };

  const updateUserProfile = (profile: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...profile }));
  };

  // Budget-based price level calculation
  const getPriceLevel = (price: number): 'cheap' | 'moderate' | 'expensive' => {
    const budgetPerGallon = state.weeklyBudget / 15; // Assume 15 gallons per week
    const threshold = budgetPerGallon * 0.95; // 95% of budget per gallon

    if (price < threshold) return 'cheap';
    if (price < threshold * 1.05) return 'moderate';
    return 'expensive';
  };

  const getEffectivePrice = (station: Station) => {
    if (station.hasRewards && station.rewardsAmount) {
      return station.price - station.rewardsAmount;
    }
    return station.price;
  };

  const getBudgetStatus = (): 'good' | 'warning' | 'over' => {
    const percentSpent = (state.spentSoFar / state.weeklyBudget) * 100;
    if (percentSpent >= 100) return 'over';
    if (percentSpent >= 80) return 'warning';
    return 'good';
  };

  const getRecommendedStation = (): Station | null => {
    // Prioritize preferred station if it has rewards
    const preferred = stations.find(s => s.name === state.preferredStation);
    if (preferred?.hasRewards) return preferred;

    // Otherwise find cheapest effective price
    const sorted = [...stations].sort((a, b) =>
      getEffectivePrice(a) - getEffectivePrice(b)
    );
    return sorted[0] || null;
  };

  // LAYER 1: PREDICTION
  const getPricePrediction = (): PricePrediction => {
    const priceChange = state.predictedGasPrice - state.currentGasPrice;
    const weeklyGallons = state.vehicleProfile ? (100 / state.vehicleProfile.mpg) : 15;
    const weeklyImpact = priceChange * weeklyGallons;

    return {
      weeklyImpact: Math.abs(weeklyImpact),
      confidence: Math.abs(priceChange) > 0.10 ? 'high' : Math.abs(priceChange) > 0.05 ? 'medium' : 'low',
      reason: Math.abs(priceChange) > 0.15 ? 'local_volatility' : 'market_trend',
      expectedChange: priceChange,
    };
  };

  // LAYER 2: CONTEXTUAL DECISION ENGINE
  const calculateTotalCost = (station: Station): { total: number; breakdown: Recommendation['breakdown'] } => {
    const mpg = state.vehicleProfile?.mpg || 28;
    const weeklyGallons = 100 / mpg;

    // Fuel cost (with rewards)
    const effectivePrice = getEffectivePrice(station);
    const fuelCost = effectivePrice * weeklyGallons;

    // Time cost ($0.25/minute based on user's time value)
    const totalTime = station.detourMinutes + (station.trafficDelay || 0);
    const timeCost = totalTime * 0.25;

    // Detour cost (extra fuel from detour)
    const detourFuelCost = (station.distanceMiles * 2 * effectivePrice) / mpg;

    const total = fuelCost + timeCost + detourFuelCost;

    return {
      total,
      breakdown: {
        fuelCost,
        timeCost,
        detourCost: detourFuelCost,
      },
    };
  };

  const getOptimalRecommendation = (): Recommendation => {
    const { costSavings, timeEfficiency, stationQuality } = state.optimizationPriorities;
    const openStations = stations.filter(s => s.isOpen);

    // Calculate weighted scores for each station
    const scoredStations = openStations.map(station => {
      const { total, breakdown } = calculateTotalCost(station);

      // Normalize factors (0-100 scale)
      const costScore = 100 - ((total / 50) * 100); // Lower cost = higher score
      const timeScore = 100 - ((station.detourMinutes / 10) * 100); // Less time = higher score
      const qualityScore = station.hasRewards ? 80 : 50; // Rewards = higher quality

      // Apply user weightings
      const weightedScore =
        (costScore * costSavings / 100) +
        (timeScore * timeEfficiency / 100) +
        (qualityScore * stationQuality / 100);

      return { station, total, breakdown, weightedScore };
    });

    // Find optimal based on weighted priorities
    const optimal = scoredStations.reduce((best, current) =>
      current.weightedScore > best.weightedScore ? current : best
    );

    // Generate reasoning
    const topPriority = costSavings >= timeEfficiency && costSavings >= stationQuality ? 'cost' :
                       timeEfficiency >= stationQuality ? 'time' : 'quality';

    let reasoning = '';
    const tradeoffs: string[] = [];

    if (topPriority === 'cost') {
      reasoning = `Best financial decision: Minimizes total commute cost at $${optimal.total.toFixed(2)}/week`;
      if (optimal.station.hasRewards) {
        tradeoffs.push(`Loyalty rewards save $${(optimal.station.rewardsAmount! * (100 / (state.vehicleProfile?.mpg || 28))).toFixed(2)}/week`);
      }
    } else if (topPriority === 'time') {
      reasoning = `Optimized for time efficiency: Only ${optimal.station.detourMinutes} min detour`;
      tradeoffs.push(`Total cost: $${optimal.total.toFixed(2)}/week`);
    } else {
      reasoning = `High-quality station with ${optimal.station.hasRewards ? 'rewards program' : 'reliable service'}`;
      tradeoffs.push(`Total cost: $${optimal.total.toFixed(2)}/week`);
    }

    if (optimal.breakdown.timeCost > 0) {
      tradeoffs.push(`${optimal.station.detourMinutes}min adds $${optimal.breakdown.timeCost.toFixed(2)} time cost`);
    }

    return {
      station: optimal.station,
      type: 'optimal',
      totalCost: optimal.total,
      breakdown: optimal.breakdown,
      reasoning,
      tradeoffs,
    };
  };

  const getAlternativeRecommendation = (): Recommendation | null => {
    const optimal = getOptimalRecommendation();
    const openStations = stations.filter(s => s.isOpen && s.id !== optimal.station.id);

    if (openStations.length === 0) return null;

    // Find cheapest total cost alternative
    const alternatives = openStations.map(station => {
      const { total, breakdown } = calculateTotalCost(station);
      return { station, total, breakdown };
    });

    const cheapest = alternatives.reduce((best, current) =>
      current.total < best.total ? current : best
    );

    // Only show if meaningfully different (>$1/week difference)
    if (Math.abs(cheapest.total - optimal.totalCost) < 1) return null;

    const savings = optimal.totalCost - cheapest.total;
    const reasoning = savings > 0
      ? `Cheapest option: Saves $${Math.abs(savings).toFixed(2)}/week vs optimal`
      : `Fastest option: Worth +$${Math.abs(savings).toFixed(2)}/week for convenience`;

    return {
      station: cheapest.station,
      type: savings > 0 ? 'cheapest' : 'fastest',
      totalCost: cheapest.total,
      breakdown: cheapest.breakdown,
      reasoning,
      tradeoffs: [
        `${Math.abs(cheapest.station.detourMinutes - optimal.station.detourMinutes)}min ${cheapest.station.detourMinutes > optimal.station.detourMinutes ? 'more' : 'less'} drive time`,
      ],
    };
  };

  // FLEET MANAGEMENT
  // DATA SEPARATION ENFORCEMENT:
  // - FLEET_MANAGER: Access to aggregated fleet data only (via FleetDashboardScreen)
  // - FLEET_MANAGER: NO access to individual driver recommendations, history, or analytics
  // - DRIVER: Access to own individual data only
  // - All individual optimization data (recommendations, savings, routes) remains private per driver

  const joinFleet = (fleetCode: string) => {
    // Assign DRIVER role when user joins a fleet
    // Driver sees their own individual recommendations + contributes to fleet aggregates
    setState(prev => ({
      ...prev,
      userRole: 'DRIVER',
      fleetCode,
      fleetId: `fleet_${fleetCode}`, // In production, this would be resolved from backend
    }));
  };

  const createFleet = (fleetName: string, fleetCode: string) => {
    // Assign FLEET_MANAGER role when user creates a fleet
    // Fleet Manager has STRATEGIC OVERSIGHT ONLY:
    //   - Fleet aggregated analytics (via Fleet Insights)
    //   - Total fleet spend and savings
    //   - Regional price predictions
    //   - Fleet member list (names/IDs only)
    //
    // Fleet Manager DOES NOT have access to:
    //   - Fuel Decision Engine UI (station comparisons, route recommendations)
    //   - Individual driver recommendations (including their own)
    //   - Personal fuel purchase history
    //   - Individual driver savings breakdowns
    //   - Individual driver route analytics
    //   - Real-time navigation suggestions
    setState(prev => ({
      ...prev,
      userRole: 'FLEET_MANAGER',
      fleetCode,
      fleetId: `fleet_${fleetCode}`, // In production, this would be resolved from backend
      fleetName,
    }));
  };

  const isFleetManager = () => state.userRole === 'FLEET_MANAGER';
  const isDriver = () => state.userRole === 'DRIVER';
  const isUnassigned = () => state.userRole === 'UNASSIGNED';

  return (
    <AppContext.Provider
      value={{
        state,
        stations,
        updateBudget,
        updatePredictionThreshold,
        updateSpending,
        updatePreferredStation,
        updateUserProfile,
        getPriceLevel,
        getEffectivePrice,
        getBudgetStatus,
        getRecommendedStation,
        // Three-Layer Decision Engine
        getPricePrediction,
        getOptimalRecommendation,
        getAlternativeRecommendation,
        // Fleet Management
        joinFleet,
        createFleet,
        isFleetManager,
        isDriver,
        isUnassigned,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
