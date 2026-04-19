# Data Separation & Privacy Model

## Overview
Nova enforces strict data separation between individual driver optimization data and fleet-level aggregated insights to maintain privacy and system integrity.

---

## User Roles & Access Matrix

### 1. UNASSIGNED USER
**Status:** Default state after signup (no fleet association)

**Access:**
- No fuel recommendations
- No fleet data
- Only sees options to:
  - Join Fleet (enter fleet code)
  - Create Fleet

**Screens:**
- DashboardScreen: Shows welcome message + fleet joining options only

---

### 2. DRIVER
**Status:** Assigned when user enters a valid fleet code

**Access:**
- ✅ Own individual fuel recommendations
- ✅ Own budget tracking
- ✅ Own savings metrics
- ✅ Own route optimization
- ❌ Fleet aggregated data
- ❌ Other drivers' data

**Screens:**
- DashboardScreen: Full individual optimization dashboard
- MapScreen: Personal station recommendations
- ProfileScreen: Personal settings

**Data Contribution:**
- Driver's fuel purchases, routes, and savings contribute to fleet-level aggregates
- Individual data remains private

---

### 3. FLEET_MANAGER
**Status:** Assigned when user creates a fleet

**Pure Analytics Dashboard:**
Fleet Managers see a dedicated enterprise analytics dashboard with NO operational decision-making tools:

#### Fleet Analytics Dashboard Structure
**1. Fleet Overview:**
- ✅ Total fleet fuel spend (weekly/monthly)
- ✅ Total fleet savings vs baseline
- ✅ Average cost per vehicle
- ✅ Fuel efficiency trend (fleet-wide)

**2. Prediction Insights:**
- ✅ Forecasted fuel price changes (regional/fleet-wide)
- ✅ Estimated financial impact on fleet operations
- ✅ Alerts for potential cost spikes

**3. Optimization Insights:**
- ✅ Aggregated fleet-level savings patterns
- ✅ High-level performance insights (no individual routes)
- ✅ Most efficient behaviors across fleet (aggregated trends)

**4. Fleet Members List:**
- ✅ Driver names or IDs only
- ✅ Status (active/inactive)
- ✅ No behavioral or financial drill-down per driver

**STRICT RESTRICTIONS - NO ACCESS TO:**
- ❌ Fuel Decision Engine UI (station comparisons, navigation suggestions)
- ❌ Individual driver recommendations (including their own)
- ❌ Station-level comparisons (e.g., Chevron vs Shell)
- ❌ Individual route recommendations
- ❌ Per-user cost breakdowns
- ❌ Individual driver fuel purchase history
- ❌ Individual driver savings breakdowns
- ❌ Individual driver route analytics
- ❌ Real-time navigation suggestions
- ❌ Personal budget tracking
- ❌ Personal optimization priorities

---

## Data Flow Architecture

### Individual Driver Data (Private - DRIVER access only)
```
Driver Input → Fuel Decision Engine → Individual Recommendations
                                    ↓
                            Personal Dashboard
                            Station Comparisons
                            Route Optimization
                            Navigation Suggestions
                            (visible to driver only)
```

### Fleet Aggregated Data (FLEET_MANAGER access only)
```
All Drivers' Data → Aggregation Layer → Fleet-Level Metrics
                                      ↓
                              Fleet Insights Dashboard
                              Strategic Analytics
                              Regional Trends
                              (visible to fleet manager only)
```

**Aggregation Rules:**
- Sum totals only (e.g., total weekly spend, total savings)
- Averages only (e.g., average cost per vehicle)
- Counts only (e.g., "12 drivers in Northern region")
- Regional/zone-level predictions (NO station names, NO routes)
- NO individual driver identification in recommendations
- NO station-level comparisons (e.g., NO "Chevron vs Shell")
- NO operational decision-making tools (Navigation, Route Planning)

---

## Implementation Details

### AppContext (Global State)
- `userRole`: 'UNASSIGNED' | 'DRIVER' | 'FLEET_MANAGER'
- `fleetId`: Fleet association identifier
- `fleetCode`: Fleet joining code
- `fleetName`: Fleet display name

### Role Assignment Logic
- User enters fleet code → `joinFleet()` → Role = DRIVER
- User creates fleet → `createFleet()` → Role = FLEET_MANAGER

### Access Control Enforcement
- DashboardScreen: Checks `isUnassigned()`, `isDriver()`, `isFleetManager()`
- FleetDashboardScreen: Only accessible when `isFleetManager() === true`
- All individual recommendations use personal AppContext state only

---

## Privacy Guarantees

1. **Data Isolation:**
   - All fleet data is strictly isolated per fleet
   - No cross-fleet visibility
   - Users only see data from their assigned fleet

2. **Individual Privacy:**
   - Driver recommendations remain private to each driver
   - Fleet Managers cannot view individual driver analytics
   - Aggregation prevents reverse-engineering individual behavior

3. **Transparency:**
   - Privacy notice displayed on Fleet Insights dashboard
   - Clear labeling: "Aggregated data only"
   - System documentation enforces data separation rules

---

## Screen-Level Access Summary

| Screen | UNASSIGNED | DRIVER | FLEET_MANAGER |
|--------|------------|--------|---------------|
| DashboardScreen | Welcome + Fleet Options | Full Fuel Decision Engine | ❌ Shows FleetDashboardScreen Instead |
| FleetDashboardScreen (Analytics) | ❌ | ❌ | ✅ Pure Analytics Dashboard (Main View) |
| MapScreen (Stations) | ❌ | ✅ Own Stations | ❌ No Access |
| ProfileScreen (Settings) | ❌ | ✅ Own Settings | ✅ Basic Settings Only |

**Key Distinction:**
- **DRIVER**: Full access to Fuel Decision Engine (station comparisons, route optimization, navigation)
- **FLEET_MANAGER**: Pure analytics dashboard only - NO operational tools, NO individual recommendations

---

## Key Files

- `/src/app/context/AppContext.tsx` - Role management & data separation logic
- `/src/app/components/DashboardScreen.tsx` - Individual driver optimization (private)
- `/src/app/components/fleet/FleetDashboardScreen.tsx` - Fleet aggregated data (manager only)
- `/src/app/App.tsx` - Navigation & role-based screen rendering

---

## Role Scope Summary

### DRIVER (Operational Decision-Making)
**Purpose:** Optimize individual fuel costs through real-time recommendations

**Tools Available:**
- Fuel Decision Engine UI
- Station-level price comparisons (Chevron, Shell, 76, etc.)
- Route optimization and detour analysis
- Real-time navigation suggestions
- Personal budget tracking
- Individual savings metrics

**View:** Tactical, operational, real-time

---

### FLEET_MANAGER (Strategic Analytics Only)
**Purpose:** Monitor fleet-wide performance through pure analytics dashboard

**Dashboard Sections:**
1. **Fleet Overview:** Total spend, savings, average cost, efficiency trends
2. **Prediction Insights:** Regional price forecasts, cost impact alerts
3. **Optimization Insights:** Aggregated savings patterns, fleet-level performance
4. **Fleet Members:** Driver roster (names/IDs, status only)

**What Fleet Managers SEE:**
- Pure enterprise analytics dashboard
- Strategic metrics and aggregated trends
- Fleet-level financial summaries
- Regional predictions (no station specifics)

**What Fleet Managers DO NOT SEE:**
- ❌ Fuel Decision Engine UI
- ❌ Station comparisons (Chevron vs Shell, etc.)
- ❌ Individual route recommendations
- ❌ Real-time navigation suggestions
- ❌ Individual driver fuel purchase history
- ❌ Per-driver cost breakdowns
- ❌ Personal optimization settings
- ❌ Any operational decision-making tools

**View:** Strategic analytics only - NO operational access

**Experience:** Dedicated analytics dashboard (FleetDashboardScreen replaces DashboardScreen)

---

## Compliance Notes

This data separation model ensures:
- ✅ Individual driver privacy (no manager access to personal recommendations)
- ✅ Clear separation of concerns (operational vs strategic)
- ✅ Scalable B2B fleet management (aggregation supports growth)
- ✅ No unauthorized data access (strict role-based permissions)
- ✅ Transparent aggregation practices (clearly documented rules)
- ✅ Operational autonomy for drivers (no micromanagement capabilities)
