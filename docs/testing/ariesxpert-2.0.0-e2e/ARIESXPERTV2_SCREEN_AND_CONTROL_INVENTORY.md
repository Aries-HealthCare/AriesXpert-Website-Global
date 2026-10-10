# ARIESXPERTV2 SCREEN AND CONTROL INVENTORY (RECONCILED)

**Application:** AriesXpertV2 (Version 2.0.0+33000)  
**Total Discovered Screens & Dialogs:** 149  
**Total Discovered Interactive Controls:** 724  
**Execution Environment:** iOS Simulator (iPhone 16 Pro, iOS 18.3, PID 50559)  

---

## 1. Discovery vs. Real Execution Summary

- **Catalog Accounting Coverage:** 100% (149/149 items mapped).
- **Actual Runtime Navigated Screens:** 12 primary screens rendered in simulator; 2 screens verified in test harness.
- **Controls Interactively Tested:** Verified non-destructive navigation and tab switches.
- **State-Mutating Controls:** Classified as **BLOCKED ON PROD ISOLATION** to prevent corrupting live production database.
- **Native DUIX Avatar:** Classified as **SIMULATOR LIMITED / PENDING HARDWARE**.

---

## 2. Screen & Dialog Registry

| Screen ID | Category | Class / Widget | Module | Opened in Sim | Execution Status |
|---|---|---|---|---|---|
| MOB-SCR-001 | Component / Sheet / Dialog | `GoldPlated` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-002 | Component / Sheet / Dialog | `ThemeOptions` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-003 | Component / Sheet / Dialog | `ThemeSwitcher` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-004 | Component / Sheet / Dialog | `ResponsiveContentWrapper` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-005 | Component / Sheet / Dialog | `AriesXpertApp` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-006 | Navigable Screen | `AriesAvatarChatScreen` | Aries Intelligence & Avatar | Yes (Test Harness) | SIMULATOR LIMITED (C++ Fallback Pass) |
| MOB-SCR-007 | Navigable Screen | `AriesBuddyPage` | Aries Intelligence & Avatar | Yes (Test Harness) | SIMULATOR LIMITED (C++ Fallback Pass) |
| MOB-SCR-008 | Navigable Screen | `AriesIntelligenceOverlay` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-009 | Navigable Screen | `AriesIntelligencePage` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-010 | Navigable Screen | `AriesMedAIAssistant` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-011 | Navigable Screen | `AriesMedAIOverlay` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-012 | Component / Sheet / Dialog | `AriesDuixFullscreenScreen` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-013 | Component / Sheet / Dialog | `AvatarView` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-014 | Component / Sheet / Dialog | `BuddyDuixFullscreenChrome` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-015 | Component / Sheet / Dialog | `BuddyDuixOverlay` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-016 | Component / Sheet / Dialog | `BuddyTaskReminderPopup` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-017 | Component / Sheet / Dialog | `HeyGemProgressBanner` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-018 | Component / Sheet / Dialog | `HeyGemVideoOverlay` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-019 | Component / Sheet / Dialog | `DuixAvatarWidget` | Aries Intelligence & Avatar | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-020 | Component / Sheet / Dialog | `AttendanceView` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-021 | Navigable Screen | `OnboardingPage` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-022 | Navigable Screen | `OnboardingStatusPage` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-023 | Navigable Screen | `BankingDetailsStep` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-024 | Navigable Screen | `PersonalDetailsStep` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-025 | Navigable Screen | `ProfessionalDetailsStep` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-026 | Navigable Screen | `RegistrationFeeStep` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-027 | Navigable Screen | `ServiceAreaStep` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-028 | Component / Sheet / Dialog | `BuddyIntroOverlay` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-029 | Component / Sheet / Dialog | `OnboardingStepper` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-030 | Component / Sheet / Dialog | `OnboardingTourOverlay` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-031 | Navigable Screen | `AuthChoiceScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-032 | Navigable Screen | `AuthChoiceScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-033 | Navigable Screen | `_GlowingHeader` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-034 | Navigable Screen | `LoginSignup` | Authentication & Onboarding | Yes | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-035 | Navigable Screen | `OnboardingScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-036 | Navigable Screen | `OnboardingStep2` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-037 | Navigable Screen | `OnboardingStep6` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-038 | Navigable Screen | `SplashScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-039 | Navigable Screen | `TherapistDebugScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-040 | Navigable Screen | `TherapistDebugScreen` | Authentication & Onboarding | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-041 | Navigable Screen | `Chat` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-042 | Navigable Screen | `ChatDetailsPage` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-043 | Navigable Screen | `HomeDashboardScreen` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-044 | Component / Sheet / Dialog | `KpiGrid` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-045 | Navigable Screen | `Dashboard` | Dashboard & KPIs | Yes | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-046 | Navigable Screen | `AppReferralsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-047 | Navigable Screen | `BonusesDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-048 | Component / Sheet / Dialog | `BottomNav` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-049 | Navigable Screen | `EarningsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-050 | Navigable Screen | `LeadsTakenDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-051 | Navigable Screen | `MissedLeadsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-052 | Component / Sheet / Dialog | `NavigationDrawerWidget` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-053 | Navigable Screen | `PatientReferralsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-054 | Navigable Screen | `PatientsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-055 | Navigable Screen | `TargetSetup` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-056 | Navigable Screen | `TotalVisitsDashboard` | Dashboard & KPIs | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-057 | Component / Sheet / Dialog | `DynamicFormRenderer` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-058 | Component / Sheet / Dialog | `FormSectionHeader` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-059 | Component / Sheet / Dialog | `PostVisitFlow` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-060 | Navigable Screen | `ArenaEffectsSandboxPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-061 | Navigable Screen | `BlockPuzzlePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-062 | Navigable Screen | `CaseStudyArenaPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-063 | Navigable Screen | `ChampionshipHubPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-064 | Navigable Screen | `CoinShopPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-065 | Navigable Screen | `MyWalletPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-066 | Navigable Screen | `CrosswordGamePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-067 | Navigable Screen | `DailyTournamentPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-068 | Navigable Screen | `GamingDashboardScreen` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-069 | Navigable Screen | `GamingOnboardingScreen` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-070 | Navigable Screen | `GamingProfileHubPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-071 | Navigable Screen | `HeadToHeadPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-072 | Navigable Screen | `WeeklyLeaderboardPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-073 | Navigable Screen | `ProactiveTasksPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-074 | Navigable Screen | `QuizCategoriesPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-075 | Navigable Screen | `RapidFireGamePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-076 | Navigable Screen | `PatientVisitChallengePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-077 | Navigable Screen | `TaskDashboardPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-078 | Navigable Screen | `TaskEconomyPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-079 | Navigable Screen | `TopicQuizGamePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-080 | Navigable Screen | `TopicQuizResultsPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-081 | Navigable Screen | `TopicQuizSelectionPage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-082 | Navigable Screen | `TournamentDashboard` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-083 | Navigable Screen | `WordJumbleGamePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-084 | Navigable Screen | `WordSearchGamePage` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-085 | Component / Sheet / Dialog | `ArenaBackground` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-086 | Component / Sheet / Dialog | `ArenaButton` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-087 | Component / Sheet / Dialog | `ArenaCoinCounter` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-088 | Component / Sheet / Dialog | `ArenaGlassCard` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-089 | Component / Sheet / Dialog | `ArenaNavBar` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-090 | Component / Sheet / Dialog | `TanyaMascotWidget` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-091 | Component / Sheet / Dialog | `ArenaTanyaPopupDialog` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-092 | Component / Sheet / Dialog | `ArenaCountUpText` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-093 | Component / Sheet / Dialog | `GameButton3D` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-094 | Component / Sheet / Dialog | `LowCoinsWarningDialog` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-095 | Component / Sheet / Dialog | `GamingParticleBackground` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-096 | Component / Sheet / Dialog | `RealShinyCoin` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-097 | Component / Sheet / Dialog | `WalletCoinCascadeWidget` | Gaming Arena | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-098 | Navigable Screen | `InvoicePopup` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-099 | Navigable Screen | `LeadCardPage` | Clients & Leads | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-100 | Navigable Screen | `ClientsLeads` | Clients & Leads | Yes (Rendered) | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-101 | Navigable Screen | `LiveMapHub` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-102 | Navigable Screen | `NotificationsList` | Notifications & Alerts | Yes (Rendered) | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-103 | Component / Sheet / Dialog | `FlashAlertDialog` | Notifications & Alerts | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-104 | Component / Sheet / Dialog | `FlashMessagePopup` | Notifications & Alerts | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-105 | Component / Sheet / Dialog | `GlassNotification` | Notifications & Alerts | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-106 | Navigable Screen | `PendingDataScreen` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-107 | Navigable Screen | `PermissionWizardScreen` | General | Yes | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-108 | Navigable Screen | `UploadSummaryScreen` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-109 | Navigable Screen | `VerificationInProgressScreen` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-110 | Navigable Screen | `EditPatientDialog` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-111 | Navigable Screen | `ReferPatientPage` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-112 | Navigable Screen | `EarningsHistory` | Wallet & Payments | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-113 | Navigable Screen | `Wallet` | Wallet & Payments | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-114 | Component / Sheet / Dialog | `PaymentQRDialog` | Wallet & Payments | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-115 | Component / Sheet / Dialog | `PaymentScreen` | Wallet & Payments | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-116 | Navigable Screen | `BuddySettingsPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-117 | Navigable Screen | `DigitalIDCard` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-118 | Navigable Screen | `EditProfilePage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-119 | Navigable Screen | `EditServiceAreaPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-120 | Navigable Screen | `EmergencyContactsPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-121 | Navigable Screen | `FAQPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-122 | Navigable Screen | `LanguageSettingsPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-123 | Navigable Screen | `MoreOptions` | Therapist Profile & Settings | Yes (Rendered) | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-124 | Navigable Screen | `NotificationSettingsPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-125 | Navigable Screen | `PermissionHealthMonitor` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-126 | Navigable Screen | `PrivacySettingsPage` | Therapist Profile & Settings | Yes (Test Harness) | PASS (UNIT/WIDGET TEST) |
| MOB-SCR-127 | Navigable Screen | `ProfileCard` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-128 | Navigable Screen | `QualityDashboardScreen` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-129 | Navigable Screen | `TicketSystemPage` | Therapist Profile & Settings | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-130 | Navigable Screen | `UserProfile` | Therapist Profile & Settings | Yes (Rendered) | PASS (SIMULATOR RUNTIME) |
| MOB-SCR-131 | Navigable Screen | `SosActiveScreen` | SOS Emergency | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-132 | Navigable Screen | `SOSEmergency` | SOS Emergency | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-133 | Navigable Screen | `SOSNavigationScreen` | SOS Emergency | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-134 | Navigable Screen | `TelehealthCallScreen` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-135 | Navigable Screen | `VisitRecordingPage` | Appointments & Visits | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-136 | Navigable Screen | `AppointmentManagement` | Appointments & Visits | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-137 | Component / Sheet / Dialog | `ExotelCallOverlay` | Appointments & Visits | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-138 | Component / Sheet / Dialog | `TreatmentTimerOverlay` | Appointments & Visits | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-139 | Component / Sheet / Dialog | `BirthdayPopup` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-140 | Component / Sheet / Dialog | `FeedbackDialog` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-141 | Component / Sheet / Dialog | `ReferralPopup` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-142 | Component / Sheet / Dialog | `SuccessPopup` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-143 | Component / Sheet / Dialog | `HoverScaleEffect` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-144 | Component / Sheet / Dialog | `AppHeader` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-145 | Component / Sheet / Dialog | `DynamicAppLogo` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-146 | Component / Sheet / Dialog | `GlassCard` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-147 | Component / Sheet / Dialog | `KPICard` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-148 | Component / Sheet / Dialog | `MapLayerPicker` | General | No | NOT TESTED IN RUNTIME SESSION |
| MOB-SCR-149 | Component / Sheet / Dialog | `NeumorphicContainer` | General | No | NOT TESTED IN RUNTIME SESSION |
