# Strauss-Strategies visual system redesign

## Direction
Use the selected **Precision corporate minimalism** direction for its disciplined spacing, crisp hierarchy, and engineered feel—but deliberately remove its generic SaaS-blue, pill-heavy, floating-card language.

The new system will feel like a precision engineering studio: warm off-white editorial surfaces, near-black technical sections, graphite text, and the existing champagne-gold brand color used sparingly for rules, focus states, key metrics, and primary actions.

## Page composition

### 1. Design system foundation
- Define semantic CSS tokens for the full palette, spacing scale, section rhythm, border radii, hairline borders, shadows, and motion timing.
- Use a confident display face for large headlines paired with a clean technical sans for body copy; preserve readability and avoid generic default SaaS typography.
- Replace large rounded pills with compact rectangular controls, modest corner radii, and precise hover/press states.
- Remove the blue glow, moving blobs, dot grid, repeated glass panels, and repeated floating-card shadows.

### 2. Navigation and logo
- Replace the floating pill navigation with a slim, full-width navigation treatment that changes contrast over light and dark sections.
- Give the supplied gold wordmark a controlled dark brand field rather than a pale pill, with enough size and contrast to remain legible.
- Keep the existing navigation destinations and Calendly action; add a compact mobile menu rather than hiding navigation without a replacement.

### 3. Typography-led hero
- Keep the current headline and supporting copy, but make the headline the dominant first-viewport element.
- Use a clean split composition: editorial copy on one side and a large, restrained product-interface placeholder on the other.
- Use a solid or subtly textured background with technical linework only where it supports the composition—no dot grid or gradient blob.
- Keep one primary booking action and a quieter text-style link to the work section.

### 4. “Sound familiar?” section
- Preserve the current pain-point writing, but label it as **What we keep hearing** and present it as an editorial transcript/list rather than testimonial cards.
- Use numbered statements, rules, and asymmetric typography so the quotes are clearly illustrative and never imply unattributed customer endorsements.

### 5. Services and page rhythm
- Turn the three services into a sequential, full-width process with large numbers and divider lines instead of three matching cards.
- Alternate off-white, white, and near-black full-width bands across the page.
- Use asymmetric columns, strong alignment, and generous whitespace to create distinct pacing from section to section.

### 6. Case-study showcase
- Replace the text-only native carousel with four large visual project features:
  1. Easy Shelf Point — retail POS and stock workflow
  2. Hospital Digital Workflow
  3. KZN Auction Platform
  4. CrocTrack — farm operations
- Give every project a stable browser or phone-frame placeholder, project name, existing headline and one-line description, outcome metric, and **View case study** action.
- Vary the project layouts between wide browser compositions and mobile-device compositions instead of repeating one card template.
- Keep future uploaded HTML case studies working. A matching published HTML post will open from the relevant project action; other uploaded posts remain available in the work area without inner scrolling.
- Build placeholder visuals from neutral interface scaffolds only, clearly ready to swap for supplied screenshots later; do not invent product UI claims.

### 7. Team section
- Preserve the existing team copy and corporate “we” voice.
- Create a confident asymmetric layout with a large photography placeholder and a technical-background rail highlighting the already stated experience across engineering, manufacturing, operations, software, physical automation, and hardware.
- Do not invent names, biographies, credentials, or personal details. The placeholder will be ready for a real team/workshop image later.

### 8. Motion and interaction
- Retain smooth anchored navigation, but simplify motion to purposeful fade/slide reveals, image-mask entrances, underline sweeps, and controlled button press feedback.
- Use subtle section-specific movement rather than making every block lift or glow.
- Preserve keyboard focus, touch behavior, reduced-motion fallbacks, and stable layout dimensions.

### 9. Remaining pages and validation
- Bring the post manager and not-found page into the same tokenized visual system without changing their functionality.
- Verify the homepage, navigation, work interactions, uploaded HTML rendering, mobile menu, post manager, and error page at desktop and mobile widths.
- Check for overflow, overlapping text, broken anchors, contrast issues, console errors, and reduced-motion behavior.

## Technical notes
- Preserve the current copy, section order, Calendly-only enquiry flow, no-pricing rule, SEO metadata, and existing backend/post-upload behavior.
- Rework the existing section components and global tokens rather than adding a parallel theme.
- Use semantic classes backed by CSS custom properties; avoid one-off color values and inline visual styles in page components.
- Use the existing logo asset and local placeholder compositions; no external stock photography will be invented before real photography is supplied.
