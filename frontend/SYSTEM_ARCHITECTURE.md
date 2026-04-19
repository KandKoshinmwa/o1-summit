# Fuel Decision Engine - System Architecture

## Core Product Definition

**The application is a financial decision engine that minimizes total commuting cost by optimizing fuel stop choices in real time.**

---

## System Architecture

### Single Decision Model

```
User Input + Context Data
    ↓
Fuel Decision Engine (Commute Cost Optimization)
    ↓
Optimal Financial Decision
```

---

## Three-Layer System

### 1. PREDICTION LAYER
- Detects expected fuel price fluctuations
- Translates changes into user-specific financial impact
- Outputs: Weekly cost impact, confidence level, reason signal

### 2. RECOMMENDATION LAYER (Decision Engine)
- Generates optimal fuel stop recommendations
- Factors: route deviation cost, traffic, price, availability, vehicle efficiency, user preferences
- Outputs: Primary recommendation + optional alternative

### 3. SAVINGS LAYER
- Tracks weekly savings vs baseline behavior
- Visualizes cumulative savings
- Shows financial impact of decisions

---

## Consistent Terminology

**Use ONLY these terms:**
- Fuel Decision Engine (primary system)
- Prediction Layer
- Recommendation Layer  
- Savings Layer
- Baseline vs Optimized comparison
- Total Commute Cost (not just fuel cost)

**Do NOT use:**
- Commute Shield (deprecated)
- Alert system (use Prediction instead)
- Any social/carpool terms

---

## User Model Consistency

All features use these inputs:

**Vehicle Profile** → fuel efficiency + constraints  
**Commute Pattern** → route + frequency  
**Optimization Priorities** → cost/time/quality weighting (totals 100%)  
**Context Preferences** → weather, brands, price sensitivity

These inputs influence:
- All recommendations
- Savings calculations  
- Predictions
- Cost breakdowns

---

## Screen Architecture

### Dashboard Screen
**Purpose:** Display primary recommendation and financial impact  
**Primary Action:** Navigate to optimal station  
**Answer:** "Why is this the best financial decision for this user right now?"

Components:
- Budget tracker
- Price prediction (if applicable)
- Optimal recommendation with cost breakdown
- Alternative recommendation (if meaningful)
- Weekly savings tracker

### Map Screen  
**Purpose:** Visualize station options and compare costs  
**Primary Action:** Select station to view details  
**Answer:** Shows total cost breakdown for each station

Components:
- Map with route overlay
- Station markers (color-coded by price level)
- Optimal station highlighted
- Station detail sheet with cost breakdown

### Profile Screen
**Purpose:** Edit optimization preferences and system inputs  
**Primary Action:** Adjust preferences  
**Answer:** "These settings improve your fuel recommendations"

Components:
- Savings summary
- Optimization preferences (sliders)
- Budget settings
- Context settings
- Vehicle profile display

### Onboarding Flow
**Purpose:** Configure user model for decision engine  
**Primary Action:** Complete profile setup  
**Message:** "Configure your financial optimization system"

Steps:
1. Vehicle Profile (required)
2. Commute Behavior (skippable)
3. Optimization Priorities (skippable)
4. Context Preferences (skippable)
5. Summary & Confirmation

---

## Recommendation Output Format

Every recommendation must include:

1. **Primary recommendation** - Best overall financial decision
2. **Reasoning** - Why this is optimal (cost + time tradeoff)
3. **Cost breakdown** - Fuel + Time + Detour costs
4. **Trade-offs** - What is sacrificed (explicit)
5. **Comparison** - vs baseline or alternative

---

## Navigation Structure

**Bottom Navigation:**
- Dashboard (primary system output)
- Stations (map view)
- Profile (settings)

**No other tabs or navigation.**

---

## Removed Systems

The following are COMPLETELY REMOVED:
- Carpooling features
- Trusted Circles
- Community/social matching
- Any peer-to-peer functionality

---

## UI Consistency Rules

1. Only 1 primary action per screen
2. Only 1 dominant insight card per screen
3. Financial impact always visually emphasized
4. Consistent card structure for recommendations
5. Use design system colors:
   - Primary: #0B132B
   - Secondary: #3E5C9A  
   - Success: #10B981
   - Warning: #F59E0B
   - Error: #B3261E

---

## State Management

**AppContext manages:**
- User settings (budget, prediction threshold)
- User profile (vehicle, commute, priorities)
- Station data
- Prediction calculations
- Recommendation algorithms
- Financial tracking

**Key functions:**
- `getPricePrediction()` - Prediction Layer
- `getOptimalRecommendation()` - Recommendation Layer
- `getAlternativeRecommendation()` - Recommendation Layer
- `getBudgetStatus()` - Savings Layer

---

## Design Principle

**Every screen, component, and output must answer:**

> "Why is this the best financial decision for THIS user right now?"

If it doesn't answer this question, it should be redesigned or removed.

---

## Final System Goal

The entire app must feel like **one unified intelligence system** — not multiple features, but one connected financial decision engine that optimizes commuting costs.
