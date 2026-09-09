# Google Play Data Safety — Draft / Mapping

## Purpose and Status

This document maps the current FitLife website behavior to information that would need review for a future Google Play Data Safety declaration. It is **not** a submitted Play Console form, approval, legal opinion, or compliance certification.

The current production web build uses a no-op analytics provider. Typed analytics events are not sent to Google Analytics, Firebase, AppsFlyer, Adjust, or a backend.

## Current Data and State Mapping

| Data / state | Current storage or processing | Sent externally now? | Purpose |
| --- | --- | --- | --- |
| Onboarding preferences | Browser `localStorage` | No | Restore selected fitness goal and workout duration |
| Generated workout plan | Browser `localStorage` | No | Preserve the personalized 7-day plan |
| Completed workout history | Browser `localStorage` | No | Derive progress, streaks, totals, and recent activity |
| Workout-session recovery state | Browser `localStorage` | No | Restore an interrupted session safely as paused |
| Theme preference | Browser `localStorage` | No | Preserve dark or light UI preference |
| Sound preference | Browser `localStorage` | No | Preserve workout audio preference |
| UTM attribution | Browser `localStorage` | No | Preserve web campaign first-touch/current-touch context |
| Anonymous visitor ID | Browser `localStorage` | No | Provide local analytics-event context |
| Session ID | Browser `sessionStorage` | No | Distinguish the current tab session locally |
| Debug analytics events | In-memory buffer, only with `debugAnalytics=true` | No | Allow explicit portfolio/reviewer inspection |
| Personal identity data | Not collected | No | Not applicable |
| Name or email address | Not collected | No | Not applicable |
| Precise location | Not collected | No | Not applicable |
| Health or medical records | Not collected | No | Not applicable |
| Advertising fingerprint | Not created | No | Not applicable |
| Standard request metadata such as IP address and user agent | Processed by hosting and remote image-delivery infrastructure | Yes, as part of normal HTTPS requests | Deliver the website and image resources |

Mock users, workout records, workouts, recipes, and progress examples are fictional demonstration content. They are not obtained from a real user or backend.

## Analytics and Attribution

In development, typed events can be written to the local browser console. In the deployed production build, the configured provider is a no-op. The analytics architecture therefore demonstrates event design and attribution boundaries without currently transmitting events to an external analytics vendor.

UTM attribution covers a campaign link that opens the website, including an initial URL loaded by a future WebView. It does not cover Google Play install attribution.

## Future Review Triggers

The mapping and any eventual Play Console declaration must be updated before releasing a version that adds any of the following:

- a real analytics or attribution provider;
- a backend or cloud synchronization;
- account registration or authentication;
- crash reporting or remote diagnostics;
- advertising or marketing SDKs;
- Google Play Install Referrer;
- a native bridge or additional Android permissions;
- a different hosting, image, or content-delivery provider.

The final declaration must cover the complete packaged application, all included SDKs, every distributed region/version, and the actual data practices at submission time.

