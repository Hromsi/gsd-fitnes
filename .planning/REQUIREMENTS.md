# Requirements: Personalized Workout Planner

**Defined:** 2026-04-03
**Core Value:** Give each user a clear, usable weekly workout plan that feels personalized without adding complexity or requiring coaching.

## v1 Requirements

### Authentication

- [x] **AUTH-01**: User can create an account with email and password.
- [x] **AUTH-02**: User can sign in with email and password.
- [x] **AUTH-03**: User can sign out of the application.
- [x] **AUTH-04**: User session persists across browser refresh.

### Fitness Profile

- [x] **PROF-01**: User can create a fitness profile with a primary goal of lose weight, build muscle, or maintain.
- [x] **PROF-02**: User can set fitness level as beginner or intermediate.
- [x] **PROF-03**: User can choose available equipment as none, home, or gym.
- [x] **PROF-04**: User can choose a training frequency from 3 to 5 days per week.

### Plan Generation

- [ ] **PLAN-01**: User receives a deterministic 7-day workout plan immediately after completing onboarding.
- [ ] **PLAN-02**: Generated plan uses the user's goal, fitness level, equipment, and training frequency as inputs.
- [ ] **PLAN-03**: User can manually regenerate a new workout plan on demand.
- [ ] **PLAN-04**: Generated workouts use only exercises from the app's predefined exercise library.

### Workout Experience

- [ ] **WORK-01**: User can view a weekly schedule of the current 7-day workout plan.
- [ ] **WORK-02**: User can open a workout detail page from the weekly schedule.
- [ ] **WORK-03**: Workout detail page shows exercise names, order, sets/reps or duration guidance, and text descriptions.

### Progress Tracking

- [ ] **PROG-01**: User can mark a scheduled workout as completed.
- [ ] **PROG-02**: User can see completion status in the weekly schedule.
- [ ] **PROG-03**: User can review previously completed workouts over time.

### UX

- [ ] **UX-01**: Core onboarding, planning, and workout-tracking flows work on mobile and desktop screen sizes.
- [x] **UX-02**: Each user only sees their own profile, plans, and workout completion history.

## v2 Requirements

### Coaching

- **COACH-01**: User can receive nutrition suggestions tied to workout goals.
- **COACH-02**: User can chat with an AI coach for workout guidance.

### Content Management

- **ADMIN-01**: Admin can manage exercise content through an internal dashboard.

### Insights

- **ANALYT-01**: User can view charts and analytics about workout consistency or progress.

### Customization

- **CUST-01**: User can edit generated workouts or replace exercises manually.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Nutrition tracking or meal planning | Not necessary to validate the core workout-planning product |
| AI-generated workout plans | V1 should remain deterministic and predictable |
| AI chat coach | Deferred until the core planner proves useful |
| Social features | Not part of the MVP's single-user planning focus |
| Advanced analytics or charts | Simple completion tracking is sufficient for MVP |
| Admin panel | Fixed internal content is enough for the first release |
| Custom workout editing | Controlled templates keep the generator simple and reliable |
| Social login | Email/password is sufficient for the MVP |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Complete |
| AUTH-02 | Phase 1 | Complete |
| AUTH-03 | Phase 1 | Complete |
| AUTH-04 | Phase 1 | Complete |
| UX-02 | Phase 1 | Complete |
| PROF-01 | Phase 2 | Complete |
| PROF-02 | Phase 2 | Complete |
| PROF-03 | Phase 2 | Complete |
| PROF-04 | Phase 2 | Complete |
| PLAN-01 | Phase 3 | Pending |
| PLAN-02 | Phase 3 | Pending |
| PLAN-04 | Phase 3 | Pending |
| WORK-01 | Phase 4 | Pending |
| WORK-02 | Phase 4 | Pending |
| WORK-03 | Phase 4 | Pending |
| PLAN-03 | Phase 4 | Pending |
| PROG-01 | Phase 5 | Pending |
| PROG-02 | Phase 5 | Pending |
| PROG-03 | Phase 5 | Pending |
| UX-01 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-03 after initial definition*
