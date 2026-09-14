# Light Apple-inspired redesign and case studies

## Goal
Refresh Strauss-Strategies into a bright, restrained, Apple-inspired experience while preserving the existing brand logo, enquiry flow, admin-only HTML uploader, and no-pricing rule. Add the four supplied case studies to the work carousel and apply cohesive motion, glass, and cursor interactions across the site.

## What will change

### 1. Visual system
- Replace the dark ink theme with an Apple-like neutral palette: soft white page surfaces, crisp near-black text, cool grey secondary text, translucent white panels, hairline borders, and a restrained system-blue action color.
- Use Apple-style system typography (`-apple-system`, BlinkMacSystemFont, SF Pro fallbacks) with stronger weight contrast, precise hierarchy, and generous section spacing.
- Adapt the existing gold logo for a light navigation surface by placing it on a compact dark brand plate, preserving its legibility and identity.
- Update the admin and not-found pages to use the same light visual system.

### 2. Hero and navigation
- Recompose the first screen around a full-width, softly blurred capture of the real CrocTrack dashboard rather than decorative artwork.
- Float the navigation and headline treatment over the imagery with restrained translucent glass, readable contrast, and one dominant discovery-call action.
- Add a very subtle cursor spotlight and shallow background parallax on pointer devices only, with reduced-motion and touch fallbacks.
- Keep the next section visibly peeking into the first viewport on desktop and mobile.

### 3. Native case-study carousel
- Add the supplied CrocTrack, KZN Auction Platform, Hospital Digital Workflow, and Easy Shelf Point stories as polished native carousel entries.
- Each entry will show its name, headline, one-line outcome, key statistic, and a clearly structured before-to-after transformation.
- Preserve existing uploaded HTML posts and their auto-height embedded presentation; future uploads from the post manager will continue to appear in the same work area.
- Use the existing CrocTrack HTML as the detailed CrocTrack presentation where appropriate, without forcing visitors to scroll inside its frame.
- Make carousel controls keyboard accessible, touch friendly, and responsive.

### 4. Motion and interaction
- Add an IntersectionObserver-based reveal utility for sections and cards: fade from 0 to 1, move up about 20px, and stagger repeated items by roughly 100ms using the requested premium easing.
- Add restrained card lift, deeper shadow, pointer-proximity border glow, and a very small 3D tilt on desktop pointer devices.
- Add subtle button scale/glow feedback.
- Throttle pointer work with `requestAnimationFrame`, avoid permanent `will-change`, and disable nonessential transforms for reduced motion or touch input.

### 5. Cohesion and accessibility
- Apply the light glass treatment consistently to navigation, services, problem statements, work content, and calls to action without nesting decorative cards.
- Maintain strong text contrast, visible keyboard focus, semantic headings, descriptive image text, and stable dimensions to prevent layout shift.
- Remove the direct phone action so all enquiries continue through the existing Calendly booking link.

## Technical details
- Introduce small reusable interaction wrappers/hooks for reveal, cursor spotlight, and tilt rather than duplicating event logic.
- Extend semantic color and shadow tokens in the global stylesheet and Tailwind theme; page components will consume only those semantic tokens.
- Render the four supplied summaries from typed local content, then merge them predictably with live published HTML posts from Lovable Cloud. This avoids destructive data changes and keeps future publishing unchanged.
- Capture the CrocTrack HTML locally for the hero background asset and optimize it for responsive delivery.
- Validate the home page and post manager at desktop and mobile widths, including carousel controls, iframe height, reduced motion, overflow, and browser console errors.
