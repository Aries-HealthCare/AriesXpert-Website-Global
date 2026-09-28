# Mobile App: Real Data + Responsive UI

## Disable Mock/Demo Data
- Read config from `/settings/mobile_app`:
  - `{ demoMode: false, apiBase: "https://www.ariesxpert.com/api/backend" }`
- Ensure all screens fetch from API instead of local constants.
- Persist auth token on login and attach `Authorization: Bearer <token>` in each request.

## API Base & Auth
- Base URL: `https://www.ariesxpert.com/api/backend`
- Login: `POST /auth/login` `{ email, password }` → `{ token, user }`
- Patients: `GET /patients`
- Therapists: `GET /users?role=therapist`
- Visits: `GET /visits`
- Packages: `GET /packages`

## Responsive Layout (React Native)
- Use `SafeAreaView` + `View` with Flexbox. Avoid absolute positioning.
- Use `%`, `flex`, and `min/maxWidth` instead of fixed pixel widths.
- Use `useWindowDimensions()` to adapt component sizes dynamically.
- Use scalable text via `PixelRatio` or libraries like `react-native-responsive-fontsize`.
- Prefer `FlatList` for lists; set `contentContainerStyle` with padding responsive to screen width.
- Support orientation changes: recompute layouts on `Dimensions.addEventListener('change', ...)`.

### Sample Responsive Container
```tsx
import React from 'react';
import { SafeAreaView, View, Text, useWindowDimensions, FlatList } from 'react-native';

export default function DashboardScreen({ data = [] }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cardWidth = Math.min(width * 0.46, 360);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: isTablet ? 24 : 12, paddingVertical: 12 }}>
        <Text style={{ fontSize: isTablet ? 22 : 18, fontWeight: '600', marginBottom: 12 }}>
          Patients
        </Text>
        <FlatList
          data={data}
          numColumns={isTablet ? 2 : 1}
          key={isTablet ? 't' : 'm'}
          columnWrapperStyle={isTablet ? { justifyContent: 'space-between' } : undefined}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <View
              style={{
                width: isTablet ? cardWidth : '100%',
                borderRadius: 12,
                padding: 12,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 6,
              }}
            >
              <Text style={{ fontSize: isTablet ? 18 : 16, fontWeight: '500' }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ fontSize: isTablet ? 14 : 12, color: '#666' }}>{item.condition || 'N/A'}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
```

## Map & Geolocation
- Use Google Maps SDK for Android/iOS.
- Configure key domain/app restrictions; read fallback from `/settings/google_maps`.
- Gate rendering if `isTargetBlocked` or key missing; show actionable message.

## Testing Across Devices
- Use emulators for common sizes: small phones (360w), large phones (412w), tablets (768w+).
- Verify tap-target sizes (min 44x44), font legibility, and scroll behavior.

## Performance
- Avoid nested ScrollViews; use FlatList with `getItemLayout` where possible.
- Debounce searches and API calls; paginate lists with `page` & `limit`.
