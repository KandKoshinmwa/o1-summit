# Fleet Manager Experience

## Overview
Fleet Managers have a **pure analytics dashboard** with NO access to operational decision-making tools. This ensures strict separation between strategic oversight (Fleet Manager) and operational execution (Driver).

---

## Dashboard Structure

### 1. Fleet Overview (Primary Section)
**Financial Metrics:**
- Total fleet fuel spend (weekly)
- Total fleet fuel spend (monthly)
- Total savings generated vs baseline
- Average cost per vehicle (weekly)

**Performance Indicators:**
- Fuel efficiency trend (fleet-wide improvement percentage)

**Visual Presentation:**
- Clean card-based layout with icons
- Color-coded metrics (green for savings, neutral for spend)
- Clear hierarchy emphasizing key numbers

---

### 2. Prediction Insights
**Forecasted Data:**
- Regional fuel price changes (NO station-specific names)
- Estimated fleet-wide financial impact
- Confidence levels (high/medium/low)

**Alert System:**
- Potential cost spikes highlighted
- Fleet impact shown in dollars per week
- Regional/zone-level predictions only

**Visual Presentation:**
- Warning-style cards for attention
- Confidence badges for data reliability
- Clear impact quantification

---

### 3. Optimization Insights
**Aggregated Analysis:**
- Fleet-level savings patterns (trends over time)
- High-level performance insights (NO individual routes)
- Aggregated potential savings opportunities

**Strategic Guidance:**
- Regional optimization recommendations (counts only)
- Example: "12 drivers in Northern region can optimize timing"
- NO driver names, NO specific stations, NO route details

**Visual Presentation:**
- Success-themed cards for positive trends
- Compact insight cards for recommendations
- Focus on fleet-wide patterns

---

### 4. Fleet Members List
**Information Displayed:**
- Driver names or IDs
- Active/Inactive status
- Total member count

**Information NOT Displayed:**
- ❌ Individual fuel purchase history
- ❌ Personal savings breakdowns
- ❌ Route analytics
- ❌ Behavioral data
- ❌ Financial drill-downs per driver

**Visual Presentation:**
- Clean roster with avatars (initials)
- Status badges (active/inactive)
- Minimal, professional design

---

## What Fleet Managers Do NOT See

### Removed Features:
1. **Fuel Decision Engine UI**
   - No station-level price comparisons
   - No "Chevron vs Shell" analysis
   - No individual route recommendations
   
2. **Operational Tools**
   - No real-time navigation suggestions
   - No personal budget tracking
   - No individual optimization priorities

3. **Driver-Level Data**
   - No individual driver recommendations
   - No personal fuel purchase history
   - No per-driver cost breakdowns
   - No route-level analytics

4. **Consumer-Style UI**
   - No onboarding preferences
   - No vehicle profile settings
   - No personal profile customization

---

## Navigation & Access

### Dashboard Tab (Main View)
- Fleet Managers see `FleetDashboardScreen` directly
- NO separate "View Fleet Insights" button needed
- Pure analytics dashboard replaces individual dashboard

### Map/Stations Tab
- **HIDDEN** for Fleet Managers
- Only visible to Drivers
- Access restriction message shown if attempted

### Profile Tab
- Basic settings only
- No fuel optimization preferences
- No vehicle profile editing

---

## Design Principles

### Enterprise Analytics Focus
1. **Clean & Professional:** Card-based layout, clear typography
2. **Data-Dense:** Multiple metrics visible without scrolling
3. **Strategic View:** Aggregated trends, not operational details
4. **Privacy-Conscious:** Clear notices about data separation

### Visual Hierarchy
1. **Fleet Overview:** Largest section with primary metrics
2. **Prediction Insights:** Medium priority, warning-style
3. **Optimization Insights:** Actionable insights section
4. **Fleet Members:** Reference roster at bottom

### Color Coding
- **Green (#10B981):** Savings, positive trends, efficiency gains
- **Orange (#F59E0B):** Predictions, alerts, warnings
- **Blue (#3E5C9A):** Fleet branding, informational elements
- **Neutral (#0B132B/#5F6C7B):** Spend metrics, general text

---

## Privacy & Data Separation

### Privacy Notice
Displayed at bottom of dashboard:
> "Enterprise Analytics Dashboard: This view provides strategic fleet oversight through aggregated metrics only. Individual driver operational data (fuel recommendations, station comparisons, route navigation) is not accessible to preserve driver privacy and operational autonomy."

### Enforcement
- Strict role-based access in `AppContext`
- Fleet Managers cannot access `DashboardScreen` (driver view)
- Fleet Managers cannot access `MapScreen` (station view)
- All individual data aggregated before display

---

## Technical Implementation

### Component Structure
```
FleetDashboardScreen
├── Dashboard Header (Fleet name, code, driver count)
├── Section 1: Fleet Overview
│   ├── Weekly Spend Card
│   ├── Monthly Spend Card
│   ├── Total Savings Card
│   ├── Avg Per Vehicle Card
│   └── Fuel Efficiency Trend Card
├── Section 2: Prediction Insights
│   └── Alert Cards (regional forecasts)
├── Section 3: Optimization Insights
│   ├── Savings Pattern Card
│   └── Insight Cards (aggregated recommendations)
├── Section 4: Fleet Members
│   └── Member List Card (names/IDs, status)
└── Privacy Notice Card
```

### Data Flow
```
Driver Actions → Aggregation Layer → Fleet Metrics
                                   ↓
                        FleetDashboardScreen
                        (strategic view only)
```

### Role Checking
- `isFleetManager()` → Renders `FleetDashboardScreen`
- `isDriver()` → Renders `DashboardScreen` (Fuel Decision Engine)
- Navigation tabs dynamically filtered based on role

---

## Key Files

- `/src/app/components/fleet/FleetDashboardScreen.tsx` - Main analytics dashboard
- `/src/app/components/DashboardScreen.tsx` - Checks role, renders FleetDashboardScreen for managers
- `/src/app/context/AppContext.tsx` - Role management and data separation
- `/src/app/components/BottomNav.tsx` - Role-based tab filtering
- `/src/app/components/MapScreen.tsx` - Access restriction for Fleet Managers

---

## Summary

Fleet Managers experience Nova as a **pure analytics dashboard** with:
- ✅ Strategic oversight through aggregated metrics
- ✅ Regional price predictions and fleet-wide trends
- ✅ Performance insights for decision-making
- ✅ Clean, enterprise-grade visual design
- ❌ NO operational tools (Fuel Decision Engine)
- ❌ NO individual driver data exposure
- ❌ NO station-level comparisons or route planning

This ensures proper separation between:
- **Strategic oversight** (Fleet Manager role)
- **Operational decision-making** (Driver role)
