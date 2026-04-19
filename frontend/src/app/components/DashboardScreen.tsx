import { AlertTriangle, TrendingDown, Star, PartyPopper, Clock, DollarSign, Building2, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Button from './shared/Button';
import Card from './shared/Card';
import FleetDashboardScreen from './fleet/FleetDashboardScreen';

interface DashboardScreenProps {
  onCreateFleet?: () => void;
}

export default function DashboardScreen({ onCreateFleet }: DashboardScreenProps) {
  // DRIVER-ONLY DASHBOARD
  // This screen shows INDIVIDUAL optimization data:
  // - Personal fuel recommendations (station-level comparisons)
  // - Personal budget tracking
  // - Personal savings metrics
  // - Route recommendations
  //
  // FLEET_MANAGER users do NOT have access to this screen
  // Fleet Managers ONLY see aggregated fleet analytics via Fleet Insights

  const {
    state,
    getBudgetStatus,
    getPricePrediction,
    getOptimalRecommendation,
    getAlternativeRecommendation,
    isUnassigned,
    isDriver,
    isFleetManager,
  } = useAppContext();

  // Financial tracking
  const weeklyBudget = state.weeklyBudget;
  const spentSoFar = state.spentSoFar;
  const remaining = weeklyBudget - spentSoFar;
  const percentSpent = (spentSoFar / weeklyBudget) * 100;
  const budgetStatus = getBudgetStatus();

  // LAYER 1: Prediction
  const prediction = getPricePrediction();
  const showPrediction = prediction.expectedChange > 0 && prediction.weeklyImpact > 2;

  // LAYER 2: Recommendations
  const optimalRec = getOptimalRecommendation();
  const alternativeRec = getAlternativeRecommendation();

  // Savings tracking
  const savingsGoal = state.savingsGoal;
  const savedThisWeek = state.savedThisWeek;
  const goalReached = savedThisWeek >= savingsGoal;

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-[#10B981] text-white',
      medium: 'bg-[#F59E0B] text-white',
      low: 'bg-[#E9EDF5] text-[#5F6C7B]',
    };
    return colors[confidence as keyof typeof colors] || colors.medium;
  };

  const getReasonLabel = (reason: string) => {
    const labels = {
      market_trend: 'Regional Market Trend',
      local_volatility: 'High Local Volatility',
      historical_pattern: 'Historical Pattern',
    };
    return labels[reason as keyof typeof labels] || 'Market Analysis';
  };

  // UNASSIGNED users only see fleet joining/creation options
  if (isUnassigned()) {
    return (
      <div className="flex flex-col gap-5 p-6">
        {/* Welcome Message */}
        <Card className="bg-[#F7F9FC]">
          <div className="text-center py-4">
            <h2 className="text-[20px] font-semibold text-[#0B132B] mb-2 leading-[1.3]">Welcome to Nova</h2>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              Get started by creating a fleet or joining an existing one.
            </p>
          </div>
        </Card>

        {/* Fleet Options */}
        <Card className="bg-[#F7F9FC]">
          <div className="text-[13px] text-[#5F6C7B] mb-3 leading-[1.5]">
            Managing a team or fleet?
          </div>
          <button
            onClick={onCreateFleet}
            className="w-full bg-[#3E5C9A] text-white rounded-lg py-3 px-4 text-[14px] font-medium leading-[1.4] hover:bg-[#2d4677] transition-colors flex items-center justify-center gap-2"
          >
            <Building2 size={18} />
            <span>Create Fleet</span>
          </button>
        </Card>

        {/* Info Card */}
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-[#3E5C9A]" />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#0B132B] mb-2 leading-[1.3]">Join Your Team</h3>
              <p className="text-[14px] text-[#5F6C7B] leading-[1.5] mb-3">
                If you have a fleet code from your employer, you can join during signup or contact your fleet manager.
              </p>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                Fleet members get personalized fuel recommendations and contribute to team-wide savings tracking.
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // FLEET_MANAGER users see pure analytics dashboard (no operational tools)
  if (isFleetManager()) {
    // Import and render FleetDashboardScreen directly as the main dashboard
    // No welcome screens, no navigation buttons - pure analytics only
    return <FleetDashboardScreen />;
  }

  // DRIVER users see the full individual optimization dashboard
  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Fleet Status Badge (DRIVER and FLEET_MANAGER only) */}
      {(isDriver() || isFleetManager()) && state.fleetCode && (
        <Card className="bg-[#E0E7FF] border border-[#6A7FDB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3E5C9A] flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-[#3E5C9A] font-semibold uppercase mb-0.5 leading-[1.4]">
                {isFleetManager() ? 'Fleet Manager' : 'Fleet Member'}
              </div>
              <div className="text-[14px] text-[#0B132B] font-medium leading-[1.4]">
                {state.fleetName || `Fleet ${state.fleetCode}`}
              </div>
            </div>
            {state.fleetCode && (
              <div className="text-[11px] text-[#5F6C7B] font-mono bg-white px-2 py-1 rounded leading-[1.4]">
                {state.fleetCode}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Budget Tracker */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[14px] text-[#5F6C7B] font-medium leading-[1.4]">Weekly Fuel Budget</div>
          <div className="flex items-baseline gap-2">
            <span className={`text-[28px] font-semibold leading-[1.2] ${
              budgetStatus === 'over' ? 'text-[#B3261E]' :
              budgetStatus === 'warning' ? 'text-[#F59E0B]' : 'text-[#0B132B]'
            }`}>
              ${remaining > 0 ? remaining.toFixed(0) : '0'}
            </span>
            <span className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              {remaining > 0 ? 'remaining' : 'over'}
            </span>
          </div>
        </div>
        <div className="h-3 bg-[#E9EDF5] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              budgetStatus === 'over' ? 'bg-[#B3261E]' :
              budgetStatus === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
            }`}
            style={{ width: `${Math.min(percentSpent, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">${spentSoFar.toFixed(2)} spent</span>
          <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">${weeklyBudget.toFixed(2)} budget</span>
        </div>
      </Card>

      {/* FUEL DECISION ENGINE */}
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <TrendingDown size={20} className="text-[#3E5C9A]" />
          <h2 className="text-[20px] font-semibold text-[#0B132B] leading-[1.3]">Fuel Decision Engine</h2>
        </div>

        {/* LAYER 1: Price Prediction */}
        {showPrediction && (
          <Card variant="warning" className="animate-fadeIn">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle size={24} className="text-[#F59E0B] flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[16px] font-semibold text-[#0B132B] mb-1 leading-[1.4]">
                  Your weekly commute cost may increase by +${prediction.weeklyImpact.toFixed(2)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${getConfidenceBadge(prediction.confidence)}`}>
                    {prediction.confidence} confidence
                  </span>
                  <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                    {getReasonLabel(prediction.reason)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* LAYER 2: Optimal Recommendation */}
        <Card className="border-2 border-[#3E5C9A] shadow-lg">
          <div className="mb-4">
            <div className="inline-block bg-[#3E5C9A] text-white text-[11px] font-semibold px-2.5 py-1 rounded uppercase mb-2 leading-[1.4]">
              Best Overall Decision
            </div>
            <h3 className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">{optimalRec.station.name}</h3>
            <p className="text-[14px] text-[#5F6C7B] leading-[1.5]">
              {optimalRec.reasoning}
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-[#F7F8FA] rounded-lg p-3 mb-4">
            <div className="text-[12px] font-medium text-[#0B132B] mb-3 leading-[1.4]">Total Commute Cost</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-[18px] font-semibold text-[#0B132B] leading-[1.3]">
                  ${optimalRec.breakdown.fuelCost.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#5F6C7B] leading-[1.4]">Fuel cost</div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-[#0B132B] leading-[1.3]">
                  ${optimalRec.breakdown.timeCost.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#5F6C7B] leading-[1.4]">Time cost</div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-[#0B132B] leading-[1.3]">
                  ${optimalRec.breakdown.detourCost.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#5F6C7B] leading-[1.4]">Detour cost</div>
              </div>
            </div>
            <div className="border-t border-[#E9EDF5] mt-3 pt-3 flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#5F6C7B] leading-[1.4]">Optimized weekly cost</span>
              <span className="text-[20px] font-semibold text-[#0B132B] leading-[1.3]">
                ${optimalRec.totalCost.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Trade-offs */}
          {optimalRec.tradeoffs.length > 0 && (
            <div className="bg-[#E0E7FF] border border-[#6A7FDB] rounded-lg p-3 mb-4">
              <div className="text-[11px] font-semibold text-[#3E5C9A] mb-2 uppercase leading-[1.4]">Why this is optimal for you</div>
              {optimalRec.tradeoffs.map((tradeoff, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-1 last:mb-0">
                  <span className="text-[#3E5C9A] mt-0.5">•</span>
                  <span className="text-[12px] text-[#0B132B] leading-[1.4]">{tradeoff}</span>
                </div>
              ))}
            </div>
          )}

          {/* Station Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#5F6C7B]" />
              <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">{optimalRec.station.detourMinutes} min detour</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-[#5F6C7B]" />
              <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">${optimalRec.station.price.toFixed(2)}/gal</span>
            </div>
            {optimalRec.station.hasRewards && (
              <div className="flex items-center gap-1">
                <Star size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-[12px] text-[#F59E0B] font-medium leading-[1.4]">Rewards</span>
              </div>
            )}
          </div>

          <Button variant="primary" fullWidth size="lg">
            Navigate to {optimalRec.station.name}
          </Button>
        </Card>

        {/* Alternative Recommendation (if exists) */}
        {alternativeRec && (
          <Card className="border border-[#E9EDF5]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="inline-block bg-[#E9EDF5] text-[#5F6C7B] text-[11px] font-semibold px-2.5 py-1 rounded uppercase mb-2 leading-[1.4]">
                  {alternativeRec.type === 'cheapest' ? 'Cheapest Option' : 'Fastest Option'}
                </div>
                <h4 className="text-[18px] font-semibold text-[#0B132B] mb-1 leading-[1.3]">{alternativeRec.station.name}</h4>
                <p className="text-[13px] text-[#5F6C7B] leading-[1.5]">{alternativeRec.reasoning}</p>
              </div>
              <div className="text-right ml-3">
                <div className="text-[20px] font-semibold text-[#0B132B] leading-[1.3]">
                  ${alternativeRec.totalCost.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#5F6C7B] leading-[1.4]">total cost</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#5F6C7B] leading-[1.4]">
              <span>{alternativeRec.station.detourMinutes} min detour</span>
              <span>•</span>
              <span>${alternativeRec.station.price.toFixed(2)}/gal</span>
            </div>
          </Card>
        )}

        {/* Savings Tracker */}
        <Card variant={goalReached ? 'success' : 'default'}>
          <div className="text-[12px] text-[#5F6C7B] font-medium mb-2 leading-[1.4]">WEEKLY SAVINGS</div>
          {goalReached ? (
            <div className="flex items-center gap-3">
              <PartyPopper size={28} className="text-[#10B981] flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[24px] font-semibold text-[#0B132B] mb-1 leading-[1.2]">${savedThisWeek.toFixed(2)}</div>
                <div className="text-[14px] text-[#10B981] font-medium leading-[1.4]">Goal reached! You're on track.</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[24px] font-semibold text-[#0B132B] mb-2 leading-[1.2]">${savedThisWeek.toFixed(2)}</div>
              <div className="h-2 bg-[#E9EDF5] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#10B981] rounded-full transition-all"
                  style={{ width: `${Math.min((savedThisWeek / savingsGoal) * 100, 100)}%` }}
                />
              </div>
              <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">
                ${(savingsGoal - savedThisWeek).toFixed(2)} to reach ${savingsGoal.toFixed(2)} goal
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
