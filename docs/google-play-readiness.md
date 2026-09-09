# Google Play / WebView Readiness

## Purpose

FitLife is currently a first-party web product designed to be a suitable web basis for a future Android WebView wrapper. This repository contains no Android application, native bridge, APK/AAB, app signing, or Play Console configuration. Those concerns remain future native work.

This document records the web characteristics and policy considerations reviewed for the test assignment. It is not a claim of Google Play approval or a substitute for reviewing the policies again before a real submission.

## Current Web Product Characteristics

The following qualities are implemented in the website now:

- FitLife is an owned, first-party fitness and nutrition experience rather than a wrapper around unrelated third-party content.
- It is a functional application, not a static landing page: onboarding, deterministic plans, workout discovery, guided sessions, completion history, progress analytics, and nutrition discovery all work in the browser.
- It is a white/non-gambling product with no betting, wagering, affiliate, or casino mechanics.
- Layouts are mobile-first and responsive, with touch-friendly controls and no critical hover-only action.
- The public demo is delivered over HTTPS.
- React Router provides predictable SPA navigation, with a Vercel rewrite supporting direct route reloads.
- Fixed mobile navigation and focused workout screens account for safe-area insets.
- Relevant application state is persisted locally, and storage access is guarded so unavailable or malformed storage does not crash the app.
- Server-like mock resources expose loading and error states through TanStack Query.
- UTM capture, first-touch/current-touch attribution, and typed product events demonstrate web acquisition analytics.
- Core functionality requires no native integration or unsafe JavaScript bridge.

## Why It Is Suitable for a WebView Wrapper

- Mobile viewport layouts have been validated from narrow phones through tablet and desktop widths.
- Primary controls are large enough for touch and do not depend on a mouse or physical keyboard.
- Safe-area spacing prevents fixed navigation and session controls from colliding with device UI.
- Core navigation remains inside the SPA and does not rely on new browser windows.
- Local state makes onboarding, plan, progress, theme, audio preference, and interrupted-session recovery useful in a persistent WebView profile.
- Browser-storage failures are handled defensively rather than blocking the product.
- The complete core flow works without a native API or device permission.
- UTM parameters can be captured when they are present on the initial WebView URL.

## Native Wrapper Responsibilities — Future Work

These items are **not implemented by this web repository**. A future Android wrapper would need to:

- load only the approved first-party FitLife domain;
- open unapproved or external URLs in the system browser;
- implement Android Back behavior at the native navigation level;
- provide an offline and network-error experience around WebView loading;
- keep mixed content disabled;
- disable unnecessary file and content access;
- avoid `addJavascriptInterface` unless a narrowly scoped, reviewed bridge becomes necessary;
- request only the minimum Android permissions;
- target the API level required by Google Play at submission time;
- define the application package, signing, release bundle, and AAB generation;
- complete Play Console declarations and release testing;
- integrate an install-referrer or attribution provider only if install attribution is required.

As last reviewed on September 9, 2026, Google Play requires new mobile app submissions and updates from August 31, 2026 to target Android 16 / API level 36. This is time-sensitive native configuration and must be rechecked before submission.

## Google Play Policy Considerations

| Consideration | Implemented on the web | Future native/release responsibility |
| --- | --- | --- |
| Meaningful functionality | Plans, workouts, guided sessions, progress, and nutrition provide app-specific utility | Validate the packaged build with Play pre-launch testing |
| WebView/affiliate spam | First-party product; no affiliate traffic or unrelated website wrapping | Retain proof of domain/content authorization and restrict navigation |
| Content | Fitness and lifestyle content; no gambling or medical treatment claims | Complete the content-rating and target-audience declarations accurately |
| Navigation security | Core flow uses first-party SPA routes and no critical popup flow | Enforce the domain allowlist and external-browser handoff natively |
| User-data transparency | Public `/privacy` route describes current local data behavior | Link the policy in Play Console and keep it synchronized with the packaged app |
| Data Safety | Current behavior is mapped in `google-play-data-safety.md` | Submit and maintain the actual Play Console form |
| Permissions | The website requests no native Android permission | Request only permissions required by the wrapper |
| Ads | No ad SDK or advertising UI is implemented | Declare the actual packaged-app behavior in Play Console |
| Target API and signing | Not applicable to the website | Use the current required target API, signing, package, and AAB configuration |

## UAC Scope

The implemented web acquisition flow is:

```text
Campaign link with UTM parameters
  → FitLife website or initial WebView URL
  → UTM parsing
  → persisted firstTouch/currentTouch
  → typed product events
```

The following install flow is not implemented:

```text
Advertisement → Google Play → Install → First app open
```

That flow would require future native install attribution, such as Google Play Install Referrer or a production attribution provider. No such SDK or native code is included here.

## Policy References Reviewed

- [Google Play: Spam, including Webviews and Affiliate Spam](https://support.google.com/googleplay/android-developer/answer/9899034)
- [Google Play: Functionality, Content, and User Experience](https://support.google.com/googleplay/android-developer/answer/9898783)
- [Google Play: User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311)
- [Google Play: Data Safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Google Play: Target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878)
- [Android Developers: Build web apps in WebView](https://developer.android.com/develop/ui/views/layout/webapps/webview)

