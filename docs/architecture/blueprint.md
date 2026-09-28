# **App Name**: Aries PhysioCare Global

## Core Features:

- Dynamic Content Fetch: Fetch services, therapists, locations, blogs, job openings, FAQs, SEO metadata, and appointment slots from Firestore. The website will have read-only access, except for appointment bookings, job applications, and contact form submissions.
- Multi-Location & Country Handling: Automatically detect user country via IP/browser locale and display a glassmorphism modal prompting the user to switch to the appropriate country website (e.g., India).
- Appointment Booking System: Allow users to book appointments by selecting location, service, therapist, and time slot. Ensure slot availability is checked from Firestore and prevent double bookings.  The booking information is then saved in the Appointments collection.
- Job Portal: Display job openings fetched from the Admin Dashboard. Enable users to filter jobs by location and role and apply by uploading their resume (Firebase Storage) and submitting an application form, which will be stored in Firestore.
- AI Precision Recovery Insights: Present insights and data-driven guidance for Assess, Plan, Track, and Advance stages in recovery.  An AI-powered tool will tailor information displayed, based on an assessment of the data collected.
- Global Header: Implement a sticky, glassmorphic header with the Aries PhysioCare logo, navigation links (Home, About Us, Services with dropdown, Blogs, Work With Us, Contact Us), location selector, dark/light mode toggle, and a "Book Appointment" CTA.

## Style Guidelines:

- Primary color: Teal (#008080) for a sense of trust and health. The prompt specified that teal should be used.
- Background color: Desaturated teal (#E0F8F8) to create a calm and professional backdrop.
- Accent color: Electric Green (#7CFC00) to highlight key CTAs and interactive elements. A bright, analogous hue provides the needed pop and modern healthcare feel.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines to give a techy, professional look, combined with 'Inter' (sans-serif) for body text to maintain readability.
- Use a consistent set of clean, professional icons that align with the glassmorphism UI.  Healthcare/medical-related icons will communicate information about services.
- Implement a fully responsive design, optimized for mobile through 4K screens. Utilize glassmorphism and subtle neon borders to create a premium, clutter-free healthcare feel.
- Incorporate smooth micro-animations and soft hover effects to enhance the user experience without being flashy.