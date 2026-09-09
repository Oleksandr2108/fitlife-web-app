import { AppContainer } from "../../components/layout/AppContainer";
import { Footer } from "../../components/navigation/Footer";

const sections = [
  {
    title: "Information Stored",
    paragraphs: [
      "FitLife may store your onboarding preferences, generated workout plan, completed workout history, workout-session recovery state, theme preference, sound preference, UTM attribution, and an anonymous visitor identifier in your browser’s local storage. A session identifier is stored in session storage for the current browser tab.",
      "This information is application state rather than a medical record. FitLife currently has no account registration and does not ask for your name, email address, precise location, or health records.",
    ],
  },
  {
    title: "How It Is Used",
    paragraphs: [
      "Stored information keeps your selected preferences, workout plan, active session, visual theme, audio choice, and progress available when you return. Attribution and anonymous identifiers provide a local context for demonstrating the product analytics architecture.",
    ],
  },
  {
    title: "Analytics & Attribution",
    paragraphs: [
      "FitLife can read UTM campaign parameters from the initial website URL and preserve first-touch and current-touch attribution locally. Product events are strongly typed, but the deployed production build currently uses a no-op analytics provider and does not send those events to an external analytics service.",
      "A review-only analytics panel is available only when the explicit debugAnalytics=true query parameter is present. Its recent event list is held in memory and is not a production analytics integration. FitLife does not perform advertising fingerprinting.",
    ],
  },
  {
    title: "Local Storage",
    paragraphs: [
      "Browser storage belongs to the browser or WebView profile on your device. Storage may be unavailable in restricted browsing environments; FitLife handles those failures without making core navigation unusable.",
    ],
  },
  {
    title: "Data Sharing",
    paragraphs: [
      "FitLife does not currently sell application data or send locally stored workout, preference, attribution, or analytics state to a backend or external analytics provider.",
      "Like other hosted websites, standard network information such as an IP address and browser user agent may be processed by the hosting infrastructure and remote image provider when delivering the site and its images.",
    ],
  },
  {
    title: "Data Retention / Removal",
    paragraphs: [
      "Local application state remains on the device until it is replaced by normal product use or the browser/site storage is cleared. Closing a browser tab ends its session-storage context. You can remove the stored data through your browser’s site-data controls.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "The public demo is hosted on Vercel and currently loads selected workout and recipe imagery from Unsplash. Those services may process standard request metadata under their own policies. No Firebase, AppsFlyer, Adjust, Google Play Install Referrer, payment, authentication, or external production analytics SDK is integrated in this web project.",
    ],
  },
  {
    title: "Future Changes",
    paragraphs: [
      "If FitLife later connects a real backend, analytics provider, account system, or native Android wrapper, this policy and any related data-safety declarations must be reviewed and updated before that functionality is released.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Contact information will be provided by the project owner before public release.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <>
      <div className="py-10 sm:py-14 lg:py-16">
        <AppContainer>
          <article className="mx-auto w-full max-w-3xl">
            <header className="border-b border-border pb-8 sm:pb-10">
              <p className="text-meta uppercase tracking-[0.16em] text-accent">
                Your data, explained clearly
              </p>
              <h1 className="text-page-title mt-3">Privacy Policy</h1>
              <p className="text-body mt-4 max-w-2xl text-text-secondary">
                This policy describes the current FitLife portfolio web
                application. It does not describe an Android application or a
                future service that has not been implemented.
              </p>
              <p className="mt-4 text-sm text-text-muted">
                Last updated: September 9, 2026
              </p>
            </header>

            <div className="divide-y divide-border">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="py-7 sm:py-9"
                >
                  <h2 className="text-section-title">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-body text-text-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </AppContainer>
      </div>
      <Footer />
    </>
  );
}
