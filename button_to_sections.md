# Button-to-section mappings

Source: `Urban_Rise_Landing_Page.html`. Deployment copy: `index.html`.

This document records the current destinations and behaviors. To change a mapping, update the HTML/JavaScript and synchronize `index.html` as well.

## Hero and main navigation

| Button or link | Location | Destination | Behavior |
| --- | --- | --- | --- |
| Urbanrise logo | Header | Home — `#home` | Returns to the hero. |
| Home | Header / menu | Home — `#home` | Scrolls to the hero. |
| Vision | Header / menu | Home evolution — `#vision` | Scrolls to the home-evolution section. |
| Residences | Header / menu | Residences — `#residences` | Scrolls to the residences section. |
| Location | Header / menu | Location feature — `#location`, within `#experience` | Scrolls to the location feature card. |
| Experience | Header / menu | Experience — `#experience` | Scrolls to the experience section. |
| Join Early Access | Header / footer | Early-access form — `#ov-join` | Opens the existing modal. The mobile arrow button uses the same destination. |
| Open / Close menu — `#menuToggle` | Header | Compact dropdown — `#ov-menu` | Toggles the dropdown and changes the three bars into an X. Escape, an outside click, or choosing a link closes it. |
| Check Your Version | Hero version card (`#heroCheckVersion`) | Version check (`#version`) | Scrolls to the 12-question home version check. |
| Remind Me Later | Hero version card — `#heroRemindLater` | Bottom message — `#introToast` | Uses the same messages and shake effect as the intro's Remind me later button. Repeated clicks advance the messages. Each message disappears after 3.2 seconds; another click restarts that timer. |
| Live Panorama | Hero | Panorama viewer — `#ov-view` | Opens the panorama overlay. |

## Section buttons

| Button | Location | Destination / action |
| --- | --- | --- |
| Search features | Release notes ? `#releaseSearch` | Filters feature tabs by name or description. Escape clears the search; the first matching feature opens if needed. |
| Energy / Water / Air / Mobility / Nature / Community | Release notes ? `#release` | Selects the corresponding `#release-panel-*` within the section. Arrow keys, Home and End also change the selected feature. |
| Show Home 2.0 switch | Benchmarks ? `#vswitch` | Toggles all six `#bench` tiles between Home v1.0 and Home 2.0. Click, Enter or Space toggles the switch. |
| Answer choices | Version check | Selecting an answer fades into the next question; the final answer shows the result. Repeated clicks during the fade cannot skip questions. |
| Back | Version check (`#versionBack`) | Returns to the previous question with its saved answer selected. |
| Retake | Version check result (`#versionRetake`) | Clears answers and restarts the check. |
| Get early access | Version check result | Opens the existing form (`#ov-join`). |
| Update to Home 2.0 | Inline Early Access (`#accessForm`) | Validates name and mobile number, then shows a local selection preview. No data is sent. |
| Edit my details | Inline Early Access (`#accessEdit`) | Reopens the form with the entered details and preferences retained. |
| Or chat on WhatsApp | Inline Early Access | Opens `https://wa.me/918943214897` in a new tab (user-provided number: `00918943214897`). |
| Home 2.0 / Home 2.0 Plus / Home 2.0 Max residence cards | Lineup (`#models`) | Selects the model, fills `#accessModel`, reopens the inline form if needed and scrolls to `#access`. Changing the form model updates the selected card. |
| Discover the Vision | Home evolution — `#vision` | Scrolls to Experience — `#experience`. |
| Explore in 3D | Home evolution — `#vision` | Opens the residence view in `#ov-view`. |
| Intelligent Living | Experience — `#experience` | Expands its description; no section navigation. |
| Sustainable by Design | Experience — `#experience` | Expands its description; no section navigation. |
| Unmatched Locations | Experience — `#experience`, card `#location` | Expands its description; no section navigation. |
| Human-Centric Spaces | Experience — `#experience` | Expands its description; no section navigation. |
| Explore Residences | Residences — `#residences` | Opens the residence view in `#ov-view`. |
| Floor-to-Ceiling Views | Residences gallery | Changes the gallery view; no section navigation. |
| Natural Materials | Residences gallery | Changes the gallery view; no section navigation. |
| Indoor-Outdoor Living | Residences gallery | Changes the gallery view; no section navigation. |
| Our Approach | Sustainability section | Opens the approach modal — `#ov-approach`. |

## Intro, film, and modal controls

These controls perform actions rather than navigate to a section.

| Button / control | Location | Action |
| --- | --- | --- |
| Skip intro — `#skipIntro` | Startup intro — `#intro` | Closes the intro and reveals the hero. |
| Remind me later — `#laterBtn` | Startup intro | Shows a temporary message in `#introToast` and shakes the dialog. Shares its message sequence with the hero reminder. |
| Update — `#updateBtn` | Startup intro | Runs the update progress sequence, then reveals the hero. |
| Play / Pause — `#vPlay`, `#vToggle` | Film player in `#vision` | Starts or pauses the preview. |
| Full screen — `#vFull` | Film player | Toggles fullscreen. |
| Subtitles — `#vSubs` | Film player | Toggles subtitles. |
| Playback speed — `#vSpeed` | Film player | Cycles preview playback speed. |
| Restart — `#vRestart` | Film player | Restarts the preview. |
| Time-of-day slider — `#todRange` | Hero | Changes the hero's time-of-day appearance. |
| Join Early Access submit | Early-access form — `#joinForm` | Validates the fields and displays the existing local confirmation — `#joinDone`. No server submission is currently connected. |
| Close early access | `#ov-join` | Closes the form overlay and restores focus to the opening control. |
| Join early access | Header dropdown — `#ov-menu` | Closes the dropdown and opens the existing form — `#ov-join`. |
| Close approach | `#ov-approach` | Closes the approach overlay and restores focus to the opening control. |
| Close viewer | `#ov-view` | Closes the panorama/residence viewer and restores focus to the opening control. |

## Reminder messages

The intro and hero reminders share this sequence:

1. Bengaluru has been pressing "Remind me later" for 30 years.
2. Still later? The tanker will wait. The inverter will beep.
3. Fine. But Home v1.0 is no longer supported.

Further clicks repeat the third message. These are temporary on-page messages; they do not schedule a reminder.
