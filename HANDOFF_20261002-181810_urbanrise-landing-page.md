---
name: "UrbanRise landing page handoff"
status: ready-for-next-request
branch: main
base_commit: 8e9b997
updated_at: 2026-10-03T02:49:34.221748+05:30
---

# UrbanRise landing page handoff

## Resume here

All currently requested page changes are complete. Latest: added the approved top-right liquid-glass early-access notification after 5 seconds of visible browsing. It opens the existing lead form and settles into a compact bell with a 1 badge. No pending user request is known.

Workspace: `G:\C Landing Page`, Windows/PowerShell. Edit [Urban_Rise_Landing_Page.html](Urban_Rise_Landing_Page.html) and synchronize [index.html](index.html) byte-for-byte. They match at this handoff. Read [button_to_sections.md](button_to_sections.md) for current destinations and behaviors. Inspect the current files before editing: the user uploads updates and commits independently, so historical diffs may not describe the current source.

User preferences: act directly, keep changes scoped, inspect visually before design adjustments, and report briefly. Luxury real estate imagery, liquid glass, Inter headings, champagne/sage accents, and familiar Apple interactions. Avoid excessive empty space or tiny labels. Mobile-only requests must leave desktop unchanged. No proactive subagents are authorized. Do not introduce em dashes into page copy; all existing ones were removed.

## Current page order

Hero `#home` -> `#why-home` -> `#release` -> `#benchmarks` -> **`#carbon-calculator`** -> `#version` -> `#lineup` -> **`#project-facts`** -> **`#urbanrise`** -> `#vision` -> `#access` -> `#residences` -> footer.

- Experience (`#experience`, including `#location`) was removed, along with its feature-card code and waveform animation. Its navigation entries were removed. Gattahalli in Project Facts is now a location label, not a link. Vision's remaining button scrolls to Residences.
- Sustain (`.sustain.on-dark`) and its `#ov-approach` modal were removed. The footer follows Residences directly.
- Live Panorama and Explore in 3D (`.ghost3d`) were removed. The Spaces section's Explore Residences button still opens the residence viewer.
- Top glass navigation has five jumps: Home, Benchmarks, Calculator, Vision, Residences. The hamburger has eight: Home, What's new, Benchmarks, Calculator, Version check, The lineup, Vision, Residences, plus its early-access action. Calculator targets `#carbon-calculator`.

## Current section behavior and design

### Hero

Blue hour remains the default (7:31 PM). Slider is manual, without scroll coupling. Desktop remains vertical, with value 0 = Golden hour and 100 = Night. **Mobile <=640px reverses this: left/0 = Night; right/100 = Golden hour.** Icons and track gradient match. `todIsMobile` mirrors the numeric value when crossing the breakpoint to preserve the represented time; default mobile value is 28, desktop 72. `--tod-position` controls the thumb.

Mobile time control is centered. The old 430px empty side reservation was removed; content spacing fills available hero height, with 32px between stats and slider and 32px below it. Headline sits 16px above the description while the description's placement stays unchanged. `mapHero()` computes `--hero-headline-offset` only on mobile, without moving other elements. Keep that distinction when changing layout.

Intro/reminders/menu behavior is preserved. Logo is `assets/logo-02.png`, cropped in CSS with the SVG white-lettering filter. Hero banners use the 640px breakpoint.

### Early-access notification

`#accessInvitation` is a fixed top-right native backdrop-filter glass notification below the header. After 5 seconds of visible browsing (intro and hidden tabs excluded), it shows a circular bell, badge 1, preview copy and dismiss button. A single gentle bell wobble and badge entrance respect reduced motion. After six seconds it becomes a compact bell; hover or keyboard focus defers compacting. Clicking opens existing `#ov-join`; form closure restores focus to the hero early-access button.

It defers for open menus/modals, focused inputs and eight seconds after quiz interaction; shown notifications hide while menus/modals are open. Opening the lead modal or focusing either lead form suppresses it. Dismiss and Escape remove it. Session key `urbanrise.accessInvitation.v1` prevents repeat appearances on reload in the same tab. No automatic form opening or server submission. CSS/markup/JS are scoped to invitation classes and IDs; native blur is intentional for a fixed element crossing section backgrounds.

QA: `test-invitation.cjs` covers timing, intro, compact state, menu hiding, form opening, focus restoration and session suppression at 1440/390/320. `test-invitation-edge.cjs` covers hidden-tab pause, menu deferral, compact dismissal and previous form engagement.

The Vision video bottom toolbar (play toggle, seek, subtitles, speed and restart) was removed. Its orphan CSS/JS was removed; center play/pause and top fullscreen remain.

### Why Home and Release

Why Home keeps its custom alert badge, electric-car icon, and labels. `.bg .img-why-home{inset:-15% 0!important}` crops baked-in pale borders; preserve this crop.

Release is a Settings-style glass window with six feature tabs, matching colored icons, search/filtering, and keyboard navigation. All release counts (01/06 etc.) were removed. No New prefix or confirmation placeholders.

**Release glass is now restored:** `.img-release-banner` identifies the original image AND its lens copies. Toolbar/layout gradients have low opacity, instead of the previous opaque taupe surface. Window parameters: blur 12, tint .10, tintColor `#d6c8ae`. Do not restore the opaque gradients.

### Benchmarks and carbon calculator

Benchmarks switch updates six comparisons and green accents. Background changes from dull (`saturate(.38) brightness(.82)`) to vibrant (`saturate(1.7) brightness(1.12) contrast(1.04)`) with Home 2.0. Reduced motion disables transitions.

Calculator source: [Tool/Living Wave Carbon Calculator.html](Tool/Living%20Wave%20Carbon%20Calculator.html). Integrated section is `#carbon-calculator`, immediately after Benchmarks. All calculator IDs/classes are `cc-` prefixed and JavaScript is scoped in an IIFE. Two glass panels contain household controls and live results; they stack on mobile. Inputs: household size, monthly electricity, daily water, car distance/fuel, two-wheeler distance, optional EV switch, monthly LPG. Results: annual/per-person totals, percent reduction, category bars/table, CO2 saved, tree equivalent, ten-year savings, copy and WhatsApp share.

**Assumptions UI and its source-note paragraph are intentionally omitted.** Original fixed values remain in code; calculations match the source. Introductory "Make it personal..." paragraph was removed. Results remain clearly indicative. Source parity passed default, high-use diesel, and low-use EV scenarios. Bars normalize against positive category totals so the nature credit cannot cause overflow. Copy has inline success/failure feedback, sharing requires the user's action, and a screen-reader status announces updated estimates. Zero savings cells show `0` rather than an em dash.

### Version check

12 source questions with auto-advance, guarded repeated clicks, Back, scoring/issues, and Retake. No Continue button. Reduced motion advances immediately. Hero Check Your Version targets `#version`; `.version-check` is the hero button, `.version-diagnostic` is the section. Source scoring retained (100/100 produces v1.9).

The user rejected green and blue-gray opaque quiz surfaces and explicitly requested the original soft charcoal, then requested translucency restoration. **Current quiz has neutral charcoal glass, with the banner visible through it.** `.img-version-banner` reaches the original image and lens copies; no solid background on `#quizContent`. Glass parameters: blur 12, tint .12, tintColor `#414744`; toolbar has a light transparent overlay. Preserve the restored glass rather than reverting to opaque green/slate.

### Lineup and Project Facts

Lineup cards select `#accessModel`, reopen the inline form with contact details retained, and scroll/focus it. Changing the form model updates the cards. First model selected by default. Max uses a house icon with a sparkle, not the old layers/copy icon. Prices omitted; source configurations/areas retained.

Project Facts uses four glass cards: 4.20 acres, 368 apartments, 222 first-release homes, and 3 & 4 BHK. Abstract SVGs depict layered land, stacked planted buildings, and raised room volumes. The home SVG intentionally uses an abstract aesthetic rather than a literal floor plan and has no leaf/stem. Metric labels were enlarged.

`#projectPhaseCount` animates 0 -> 222 linearly over 2400ms once the ring becomes visible (IntersectionObserver threshold .4); ring share stays synchronized. Reduced motion and no-JS retain final 222. Counter inherits font/letter spacing and ring alignment is centered. Phase caption matches BHK label size (15px desktop, 13px mobile). Hover/focus/tap on `#projectPhaseInfoTrigger` opens a clamped manual popover; Escape/outside closes it. Exact explanatory copy: "The first release’s share of the full project: 222 of 368 sustainable homes!"

### Urbanrise EI, Vision, Early Access, Spaces, footer

EI is an Apple Health-inspired summary/detail interface, not accessory-control tiles. Water/Energy/Carbon tabs select one target and its supporting toolkit systems; arrow keys/Home/End work. Native grouped disclosures (`.ei-tech`) show one explanation per category. All ten systems retained (4 water, 2 energy, 4 carbon). Former modal tiles were removed.

EI story paragraphs are 17px desktop/16px mobile, with enlarged target labels and stronger contrast. System names/descriptions are 14px desktop/13px mobile. The long company-introduction paragraph was removed. "Every Drop, Every Watt Matters." sits right-aligned 12px above the glass panel. Corporate 100-year targets remain identified as targets, not achieved results.

Vision and Spaces headings now match section hierarchy: `clamp(34px,3.7vw,52px)`, weight 350, line-height 1.15, letter-spacing -.035em; mobile uses `clamp(34px,7vw,46px)`. Former desktop size ~84px was intentionally reduced. Vision poster is `video_thumbnail.png`; subsequent animated preview scenes remain unchanged. Frame ratio 16:9.1; recommended poster 1600 x 910, with safe margins for cover cropping and round corners. This remains the existing animated preview, not a newly supplied video file.

Early Access contains name, 10-digit mobile, and model only; **`accessTime` / "When do you plan to move?" was removed.** Validation, local preview, Edit, and lineup selection still work. No backend submission/reservation or scheduled message. WhatsApp link `https://wa.me/918943214897` is user-provided. Header/footer and quiz-result early-access buttons still open the original modal.

Early Access translucency is restored using `.img-access-banner`, which reaches lens copies. Card blur 12, tint .09, tintColor `#d6c8ae`. No opaque form background. Banner replacement must preserve the glass backdrop class.

Spaces uses `.img-spaces`, with the same image used in the residence viewer. Gallery chips retain their pan/zoom interaction.

Footer starts with Recognition for Urbanrise, four awards and Bengaluru/Hyderabad/Chennai. A divider separates it from the logo/copyright/Join Early Access row below. The four distinct award icons were added and explicitly undone; **do not re-add them**. The existing recognition-heading trophy and location pin remain.

## Banner mappings

All mobile replacements below activate at **<=640px**. Assets are under `assets/`.

| Section | Desktop | Mobile |
| --- | --- | --- |
| Hero | `banners/banner.png` | `banners/mobile_banner.png` |
| Why Home | `background/background_section2.png` | Same |
| Release | `background/release-section-background-updated.png` | `background/release-section-background-updated_mobile_banner.png` |
| Benchmarks | `background/Benchmarks_Section.png` | Same active mapping; other mobile asset may exist unused |
| Carbon calculator | `background/carbon_calculator_banner.jpeg` | `background/carbon_calculator_mobile_banner.jpeg` |
| Version | `background/version_section_desktop_banner.png` | `background/version_section_mobile_banner.png` |
| Lineup | `background/lineup_desktop_banner.png` | `background/lineup_mobile_banner.png` |
| Project Facts | `background/project_facts_desktop_banner.jpeg` | `background/project_facts_mobile_banner.png` |
| Urbanrise | `background/urbanrise_desktop_background_image_.png` | `background/urbanrise_mobile_background_image_.png` |
| Early Access | `background/early-access-desktop-banner.png` | `background/early-access-mobile-banner.png` |
| Video poster | `background/video_thumbnail.png` | Same |
| Spaces/viewer | `background/spaces_section.png` | Same |

Project Facts mobile asset had an accidental double dot; it was renamed to the listed single-dot name. Original embedded Base64 images still serve some animated video scenes; don't remove them globally. `assets/background/release-section-background.jpg` is an extracted copy of the older `.img-res` image, not the current Spaces image.

## Critical glass implementation detail

`sceneBg()` selects the section background, and liquid-glass creates copies inside `.lqg-lens-inner`. A CSS selector such as `.section > .bg .ph` **does not match a nested glass copy**. Removing the old image class while assigning the new image only with that direct-child selector caused flat-looking cards.

Fixed Release, Version and Early Access by adding dedicated image classes and using selectors that also match the nested copies. Preserve those classes and clone-compatible selectors for desktop/mobile. Other newer section banners still use direct-child selectors; if a future request concerns their glass backdrop, inspect the nested `.ph` computed `backgroundImage` before changing colors. Don't broaden unrelated section changes without a request.

## Git, environment and verification

Observed branch: `main`; HEAD `8e9b997 Fixed Hamburger and Navpill`. Recheck before work. HTML, index, button mappings and this handoff are modified for the invitation feature. User-provided assets are present; preserve them. No commit/push/deploy performed in this work. Origin previously observed: `https://github.com/Akshais97/urban-landing-page.git`. Deployment state is not verified.

Current permissions: unrestricted filesystem/network, approval never. Do not set `sandbox_permissions`. Use native PowerShell literal-path file operations. No destructive Git operations.

QA files: `C:\Users\askhai\AppData\Local\Temp\urbanrise-intro-qa`. Playwright: that directory's `node_modules/playwright`; Chrome: `C:/Program Files/Google/Chrome/Application/chrome.exe`; target `file:///G:/C%20Landing%20Page/index.html`. In-app Browser runtime was tried and browser discovery returned no sessions; standalone Playwright was used after reading its skill/troubleshooting. HTTP(S) dependencies are aborted in targeted tests. Recent glass checks verified actual `.lg-on` layers and computed banner URLs inside their lens copies; don't claim live CDN/network/deployment coverage.

Recent checks:
- Calculator at 1440/1024/848/390/320: controls/results, section order, no assumptions UI, text fit, source parity, sharing and copy feedback. Reusable `test-carbon.cjs`; screenshot `carbon-1440.png` and `carbon-390.png`.
- Mobile hero at 320/390/440: visual spacing, centered slider, stable description placement, reversed time mapping and resize state preservation. Desktop geometry checked unchanged.
- Each desktop/mobile banner: correct computed image and successful decode, including 640/641 boundary where applicable.
- Release/Version glass at 1440/390: nested backdrop images, feature selection, complete 12-question quiz, Back and Retake. `glass-fixed-release-*.png`, `glass-fixed-version-*.png`.
- Early Access glass at 1440/390: image in lens, valid local preview and Edit. `access-after-glass-*.png`.
- Removed sections: desktop/mobile, no dangling anchor links or script errors, footer follows Residences.
- Five-link navigation: 1440/1100/390, no overlap, valid jumps, selected nav indicator and mobile-menu closing.
- Footer: four awards above brand/actions at 1440/390/320; no added award icons.
- Heading scale: 1440/848/390/320; visual desktop/mobile screenshots `title-after-*.png`.
- Latest poster/Spaces update: both assets load at 1440/390; residence viewer matches Spaces.

Old temporary scripts can contain stale section order, Continue/radio assumptions, old image names or removed controls. Update them before reuse. Temporary artifacts may disappear. `git diff --check` passes with harmless LF-to-CRLF warnings.

Use `rg`, scope replacements and assert matches. Preserve UTF-8 through byte reads/writes; avoid dumping huge Base64 CSS lines. PowerShell/Python stdout may use CP1252; escape non-ASCII when printing diagnostics. Test only what the change requires, keep source/index identical, and do not overwrite user changes.
