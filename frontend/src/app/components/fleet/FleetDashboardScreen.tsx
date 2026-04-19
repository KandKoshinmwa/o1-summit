import { Building2, TrendingDown, AlertTriangle, TrendingUp, Users, Activity, DollarSign, Fuel } from 'lucide-react';
import Card from '../shared/Card';
import { useAppContext } from '../../context/AppContext';

interface FleetDashboardScreenProps {
  onBack?: () => void;
}

export default function FleetDashboardScreen({ onBack }: FleetDashboardScreenProps) {
  const { state } = useAppContext();

  // PURE ANALYTICS DASHBOARD
  // Enterprise-grade fleet oversight with strategic insights only
  // NO operational decision-making tools
  // NO individual driver data exposure

  const fleetData = {
    fleetName: state.fleetName || 'Fleet Operations',
    fleetCode: state.fleetCode,
    driverCount: 24,
    weeklySpend: 1847.50, // Total across all drivers
    monthlySpend: 7924.00, // Total monthly
    weeklySavings: 312.40, // Total across all drivers
    savingsVsBaseline: 14.5, // Fleet-wide percentage
    avgCostPerVehicle: 76.98, // Total spend / driver count
    fuelEfficiencyTrend: '+3.2%', // Fleet-wide efficiency improvement
  };

  // Fleet Members List - Basic info only (names/IDs, NO behavioral or financial data)
  const fleetMembers = [
    { id: 1, name: 'Driver A', status: 'active' },
    { id: 2, name: 'Driver B', status: 'active' },
    { id: 3, name: 'Driver C', status: 'active' },
    { id: 4, name: 'Driver D', status: 'active' },
    { id: 5, name: 'Driver E', status: 'active' },
  ];

  // Aggregated alerts - Regional/zone level, NOT individual driver level
  const alerts = [
    {
      id: 1,
      message: 'Fuel prices rising in Northern routes',
      impact: 87.50, // FLEET-LEVEL impact only
      confidence: 'high' as const,
    },
    {
      id: 2,
      message: 'Price volatility detected in Zone C',
      impact: 42.30, // FLEET-LEVEL impact only
      confidence: 'medium' as const,
    },
  ];

  // Aggregated optimization recommendations - Strategic trends only
  // NO station names, NO individual driver identification, NO route specifics
  const recommendations = [
    {
      id: 1,
      action: '12 drivers in Northern region can optimize timing',
      reason: 'Regional price increase expected in next 24 hours',
      savings: 156.20, // AGGREGATED savings potential
    },
    {
      id: 2,
      action: 'Fleet-wide refueling delay recommended in Zone B',
      reason: 'Market analysis shows prices dropping within 24 hours',
      savings: 89.40, // AGGREGATED savings potential
    },
    {
      id: 3,
      action: 'Cost-saving opportunities identified for 5 drivers',
      reason: 'Route optimization available in Southern region',
      savings: 67.80, // AGGREGATED savings potential
    },
  ];

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-[#10B981] text-white',
      medium: 'bg-[#F59E0B] text-white',
      low: 'bg-[#E9EDF5] text-[#5F6C7B]',
    };
    return colors[confidence as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Dashboard Header */}
      <div className="border-b border-[#E9EDF5] pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#3E5C9A] flex items-center justify-center">
            <Building2 size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-[22px] font-semibold text-[#0B132B] leading-[1.2]">Fleet Analytics</h1>
            <div className="text-[13px] text-[#5F6C7B] leading-[1.4]">{fleetData.fleetName}</div>
          </div>
          {fleetData.fleetCode && (
            <div className="text-[11px] text-[#5F6C7B] font-mono bg-[#F7F9FC] px-3 py-1.5 rounded border border-[#E9EDF5] leading-[1.4]">
              {fleetData.fleetCode}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-[#5F6C7B]" />
            <span className="text-[12px] text-[#5F6C7B] leading-[1.4]">{fleetData.driverCount} Active Drivers</span>
          </div>
        </div>
      </div>

      {/* 1. FLEET OVERVIEW */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#0B132B] mb-3 leading-[1.3]">Fleet Overview</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-[#5F6C7B]" />
              <div className="text-[11px] text-[#5F6C7B] font-medium uppercase leading-[1.4]">Weekly Spend</div>
            </div>
            <div className="text-[26px] font-semibold text-[#0B132B] leading-[1.2]">
              ${fleetData.weeklySpend.toFixed(0)}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-[#5F6C7B]" />
              <div className="text-[11px] text-[#5F6C7B] font-medium uppercase leading-[1.4]">Monthly Spend</div>
            </div>
            <div className="text-[26px] font-semibold text-[#0B132B] leading-[1.2]">
              ${fleetData.monthlySpend.toFixed(0)}
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card variant="success">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#10B981]" />
              <div className="text-[11px] text-[#10B981] font-medium uppercase leading-[1.4]">Total Savings</div>
            </div>
            <div className="text-[26px] font-semibold text-[#0B132B] leading-[1.2]">
              ${fleetData.weeklySavings.toFixed(0)}
            </div>
            <div className="text-[11px] text-[#5F6C7B] mt-1 leading-[1.4]">
              {fleetData.savingsVsBaseline.toFixed(1)}% vs baseline
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-[#5F6C7B]" />
              <div className="text-[11px] text-[#5F6C7B] font-medium uppercase leading-[1.4]">Avg Per Vehicle</div>
            </div>
            <div className="text-[26px] font-semibold text-[#0B132B] leading-[1.2]">
              ${fleetData.avgCostPerVehicle.toFixed(2)}
            </div>
            <div className="text-[11px] text-[#5F6C7B] mt-1 leading-[1.4]">
              Per week
            </div>
          </Card>
        </div>
        <Card className="mt-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Fuel size={16} className="text-[#3E5C9A]" />
                <div className="text-[12px] text-[#5F6C7B] font-medium leading-[1.4]">Fuel Efficiency Trend</div>
              </div>
              <div className="text-[14px] text-[#0B132B] leading-[1.4]">
                Fleet-wide efficiency improving
              </div>
            </div>
            <div className="text-[24px] font-semibold text-[#10B981] leading-[1.2]">
              {fleetData.fuelEfficiencyTrend}
            </div>
          </div>
        </Card>
      </div>

      {/* 2. PREDICTION INSIGHTS */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#0B132B] mb-3 leading-[1.3]">Prediction Insights</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} variant="warning">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[11px] text-[#F59E0B] font-semibold uppercase leading-[1.4]">
                      Price Forecast
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${getConfidenceBadge(alert.confidence)}`}>
                      {alert.confidence}
                    </span>
                  </div>
                  <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">
                    {alert.message}
                  </div>
                  <div className="text-[13px] text-[#5F6C7B] leading-[1.4]">
                    Estimated fleet impact: <span className="font-semibold text-[#0B132B]">+${alert.impact.toFixed(2)}/week</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. OPTIMIZATION INSIGHTS */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#0B132B] mb-3 leading-[1.3]">Optimization Insights</h2>

        {/* Aggregated Savings Patterns */}
        <Card className="mb-3 bg-[#F0FDF4] border-[#86EFAC]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-[#10B981]" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-[#10B981] font-semibold uppercase mb-1 leading-[1.4]">
                Savings Pattern
              </div>
              <div className="text-[14px] font-medium text-[#0B132B] mb-1 leading-[1.4]">
                Fleet-wide fuel optimization trending upward
              </div>
              <div className="text-[13px] text-[#5F6C7B] leading-[1.4]">
                Total potential savings: <span className="font-semibold text-[#0B132B]">${(recommendations.reduce((sum, rec) => sum + rec.savings, 0)).toFixed(2)}/week</span>
              </div>
            </div>
          </div>
        </Card>

        {/* High-Level Performance Insights */}
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="border-l-4 border-l-[#3E5C9A]">
              <div className="text-[12px] text-[#3E5C9A] font-medium mb-1 leading-[1.4]">
                {rec.action}
              </div>
              <div className="text-[13px] text-[#5F6C7B] leading-[1.4]">
                {rec.reason}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. FLEET MEMBERS LIST */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#0B132B] mb-3 leading-[1.3]">Fleet Members</h2>
        <Card>
          <div className="space-y-0">
            {fleetMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-3 border-b border-[#E9EDF5] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                    <span className="text-[13px] font-semibold text-[#3E5C9A]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#0B132B] leading-[1.3]">{member.name}</div>
                    <div className="text-[11px] text-[#5F6C7B] leading-[1.4]">ID: {member.id}</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#10B981] font-semibold uppercase px-2.5 py-1 rounded bg-[#D1FAE5] leading-[1.4]">
                  {member.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#E9EDF5] text-center">
            <div className="text-[12px] text-[#5F6C7B] leading-[1.4]">
              <span className="font-semibold text-[#0B132B]">{fleetData.driverCount}</span> total active members
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Dashboard Notice */}
      <div className="bg-[#F7F9FC] border border-[#E9EDF5] rounded-lg p-4">
        <div className="text-[11px] text-[#5F6C7B] leading-[1.5]">
          <strong className="text-[#0B132B]">Enterprise Analytics Dashboard:</strong> This view provides strategic fleet oversight through aggregated metrics only. Individual driver operational data (fuel recommendations, station comparisons, route navigation) is not accessible to preserve driver privacy and operational autonomy.
        </div>
      </div>
    </div>
  );
}
