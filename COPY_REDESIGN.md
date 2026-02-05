# ZEKE BAWTRY — Portfolio Copy Redesign
## Security Researcher / Bounty Hunter Focus

> **STATUS: ✅ IMPLEMENTED** — All changes below have been applied to the codebase.

---

## STRATEGIC POSITIONING RATIONALE

### The Vibe We're Going For
- **Understated excellence** — Not "I hack things" but "I find what others miss"
- **Selective, not prolific** — Quality over quantity implies expertise
- **Curious researcher** — Driven by understanding, not just finding bugs
- **AI/ML infrastructure specialist** — Unique angle, not just "another security person"
- **Professional mystery** — Let the work speak; don't overshare methodology

### What We're Hiding
- ❌ Bug counts / stats / metrics
- ❌ Process details (24-target system, agent swarm, Deep Check)
- ❌ Unconfirmed bounties or pending work
- ❌ Effectiveness multipliers or bragging
- ❌ How we find things

### What We're Showing
- ✅ Security research focus
- ✅ AI/ML infrastructure expertise
- ✅ Quality-first mindset
- ✅ Continuous learning
- ✅ Professional, selective approach
- ✅ Curiosity-driven exploration

---

## SECTION-BY-SECTION COPY

---

### 1. METADATA (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: "ZEKE BAWTRY — Security Researcher",
  description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
  keywords: ["security researcher", "bug bounty", "AI security", "ML infrastructure", "vulnerability research", "Zeke Bawtry"],
  authors: [{ name: "Zeke Bawtry" }],
  creator: "Zeke Bawtry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zekebawtry.vercel.app",
    title: "ZEKE BAWTRY — Security Researcher",
    description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
    siteName: "Zeke Bawtry",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEKE BAWTRY — Security Researcher",
    description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
    creator: "@zekebawt",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

### 2. HERO SECTION (hero.tsx)

**Remove:** PRs pending, potential earnings, day counter
**Keep:** Name, tagline, social links

#### New Copy:

```
[Small tag]
SECURITY RESEARCHER

[Giant name]
ZEKE
BAWTRY

[Tagline]
I find what others miss.
Infrastructure security. AI/ML systems.

[CTAs]
VIEW RESEARCH → (links to Projects)
ABOUT → (links to About)

[Social links - keep as is]
```

**Key changes:**
- Remove all stats/numbers from hero
- Remove "DAY X OF THE JOURNEY"
- Simpler, more mysterious tagline
- Research-focused CTAs

#### Implementation (hero.tsx):

```tsx
// Remove these imports/usage:
// - dashboardData.income (pendingPRs, pendingAmount, etc.)
// - dashboardData.evolution.currentDay
// - getPaddedDay

// Small tag
<span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
  SECURITY RESEARCHER
</span>

// Tagline
<p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-[#8a9d86] leading-tight">
  I find what{" "}
  <span className="text-[#F1F7ED] font-medium">others miss</span>.
  <br />
  <span className="text-[#576953]">Infrastructure security. AI/ML systems.</span>
</p>

// CTAs
<Link href="#projects" ...>
  <span>VIEW RESEARCH</span>
  <ArrowRight ... />
</Link>

<Link href="#about" ...>
  ABOUT ME
</Link>

// REMOVE: Top stats floating corner (desktop)
// REMOVE: Mobile stats
// REMOVE: Large decorative day number
```

---

### 3. ABOUT SECTION (about.tsx)

**Remove:** Day counter, Brian origin story details, specific dates
**Keep:** Values grid, professional framing

#### New Copy:

```
[Label]
WHO I AM

[Heading]
THE
APPROACH

[Main story card]
Security research driven by curiosity, not quotas.

I specialize in AI/ML infrastructure — the systems that power modern intelligence. 
My approach is methodical: understand deeply before testing. 
Quality findings matter more than quantity.

[Values grid - updated]
1. Quality First
   One real vulnerability beats a hundred false positives.

2. Deep Understanding
   Know the system before you test the system.

3. Continuous Learning
   The landscape changes daily. So do I.

4. Responsible Disclosure
   Security research with integrity. Always.

5. Technical Depth
   Infrastructure, APIs, auth flows, data pipelines.

6. Selective Focus
   Fewer targets, deeper dives, better results.
```

#### Implementation (about.tsx):

```tsx
// Remove imports: dashboardData, formatStartDate, getPaddedDay

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "One real vulnerability beats a hundred false positives.",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "Know the system before you test the system.",
  },
  {
    icon: Code2,
    title: "Continuous Learning",
    description: "The landscape changes daily. So do I.",
  },
  {
    icon: Shield,
    title: "Responsible Disclosure",
    description: "Security research with integrity. Always.",
  },
  {
    icon: Rocket,
    title: "Technical Depth",
    description: "Infrastructure, APIs, auth flows, data pipelines.",
  },
  {
    icon: Heart,
    title: "Selective Focus",
    description: "Fewer targets, deeper dives, better results.",
  },
];

// Label
<span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
  WHO I AM
</span>

// Heading
<h2 className="...">
  <span className="text-[#F1F7ED]">THE</span>
  <br />
  <span className="text-[#F1F7ED]/20">APPROACH</span>
</h2>

// Main story card content
<p className="text-base sm:text-lg lg:text-xl text-[#8a9d86] leading-relaxed mb-4 sm:mb-6">
  Security research driven by{" "}
  <span className="text-[#F1F7ED] font-medium">curiosity</span>, not quotas.
</p>
<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#576953] tracking-tight-hero">
  Understanding comes first.
</p>
<p className="text-sm sm:text-base text-[#8a9d86] mt-4 sm:mt-6">
  I specialize in AI/ML infrastructure — the systems that power modern intelligence.
  My approach is methodical: understand deeply before testing.
  Quality findings matter more than quantity.
</p>

// REMOVE: Day counter box completely
// Just have the story card span full width
```

---

### 4. SKILLS SECTION (skills.tsx)

**Remove:** "2/day" stats, "14/week target", skill percentages
**Keep:** Skill names, categories, general competency indication

#### New Copy:

```
[Label]
CAPABILITIES

[Heading]
TECHNICAL
FOCUS

[Categories - reframe for security]
SECURITY RESEARCH
- Vulnerability Assessment
- API Security
- Authentication Flows
- Infrastructure Testing

LANGUAGES & TOOLS
- Python
- TypeScript
- Burp Suite
- Git/GitHub

AI/ML SYSTEMS
- LLM Security
- ML Pipeline Analysis
- Training Infrastructure
- Model Deployment

DEVELOPMENT
- React/Next.js
- Node.js
- Cloud Infrastructure
- Automation

[Bottom note - no stats]
Continuous learning isn't optional.
The security landscape evolves daily.
```

#### Implementation (skills.tsx):

```tsx
// New skills data structure - no percentages shown
export const skills = [
  { name: "Vulnerability Assessment", category: "Security Research" },
  { name: "API Security", category: "Security Research" },
  { name: "Authentication Flows", category: "Security Research" },
  { name: "Infrastructure Testing", category: "Security Research" },
  { name: "Python", category: "Languages & Tools" },
  { name: "TypeScript", category: "Languages & Tools" },
  { name: "Burp Suite", category: "Languages & Tools" },
  { name: "Git/GitHub", category: "Languages & Tools" },
  { name: "LLM Security", category: "AI/ML Systems" },
  { name: "ML Pipeline Analysis", category: "AI/ML Systems" },
  { name: "Training Infrastructure", category: "AI/ML Systems" },
  { name: "Model Deployment", category: "AI/ML Systems" },
  { name: "React/Next.js", category: "Development" },
  { name: "Node.js", category: "Development" },
  { name: "Cloud Infrastructure", category: "Development" },
  { name: "Automation", category: "Development" },
];

// REMOVE: Skill level percentages
// REMOVE: Bottom stat bar with "2/day" etc.

// Label
<span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
  CAPABILITIES
</span>

// Heading
<h2 className="...">
  <span className="text-[#F1F7ED]">TECHNICAL</span>
  <br />
  <span className="text-[#576953]">FOCUS</span>
</h2>

// Bottom note (replace stat bar)
<motion.div className="mt-20 pt-8 border-t border-[#3a4438]">
  <p className="text-[#8a9d86] text-sm max-w-xl">
    <span className="text-[#576953]">Continuous learning isn&apos;t optional.</span>{" "}
    The security landscape evolves daily.
  </p>
</motion.div>
```

---

### 5. PROJECTS SECTION (projects.tsx)

**Remove:** Bounty amounts, pending counts, potential earnings, Keep HQ PRs
**Show:** Security research focus, confirmed/completed work only

#### New Copy:

```
[Label]
RESEARCH

[Heading]
SELECT
WORK

[Project cards - only show confirmed/completed things]
// For now, keep it minimal until we have confirmed bounties

1. Infrastructure Security Research
   Ongoing vulnerability research in AI/ML systems and cloud infrastructure.
   [ACTIVE] [AI/ML, Infrastructure, Security]

2. Open Source Contributions
   Security-focused contributions to open source projects.
   [ONGOING] [Python, Security, OSS]

[CTA]
GitHub → (view contributions)
```

**Important:** Don't list pending PRs or unconfirmed bounties. Keep it vague until things are confirmed.

#### Implementation (projects.tsx):

```tsx
// Simplified projects - no bounty amounts, no specific PRs
const projects = [
  {
    id: 1,
    name: "Infrastructure Security Research",
    description: "Ongoing vulnerability research in AI/ML systems and cloud infrastructure. Focus on authentication, API security, and data pipeline integrity.",
    status: "active",
    type: "research",
    tags: ["AI/ML", "Infrastructure", "Security"],
  },
  {
    id: 2,
    name: "Open Source Security",
    description: "Security-focused contributions to open source projects. Responsible disclosure and collaborative fixes.",
    status: "ongoing",
    type: "research",
    tags: ["Python", "Security", "OSS"],
  },
];

// REMOVE: Stats row (pendingPRs, pendingAmount, totalEarned)
// REMOVE: Bounty labels on cards
// REMOVE: External PR links (until confirmed)

// Label
<span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
  RESEARCH
</span>

// Heading
<h2 className="...">
  <span className="text-[#F1F7ED]">SELECT</span>
  <br />
  <span className="text-[#F1F7ED]/20">WORK</span>
</h2>
```

---

### 6. DASHBOARD SECTION — REMOVE ENTIRELY

The dashboard reveals too much (metrics, income tracking, skill counting). Remove it completely for the bounty hunter positioning.

```tsx
// In app/page.tsx, remove:
import { Dashboard } from "@/components/sections/dashboard";

// And remove from render:
<Dashboard />
```

---

### 7. INTERESTS SECTION (interests.tsx)

**Reframe:** Security research perspective, keep the curious explorer angle

#### New Copy:

```
[Label]
RESEARCH INTERESTS

[Heading]
AREAS OF
FOCUS

[Interest cards - security reframe]
1. AI/ML Security
   Exploring vulnerabilities in machine learning systems, from training pipelines to inference APIs.
   [LLMs, Model Security, Data Poisoning]

2. Cloud Infrastructure
   Understanding the attack surface of modern cloud deployments and container orchestration.
   [AWS, K8s, IAM]

3. Authentication & Identity
   Deep dives into auth flows, token security, and identity management systems.
   [OAuth, JWT, SSO]

4. API Security
   REST, GraphQL, gRPC — different protocols, consistent methodology.
   [REST, GraphQL, Rate Limiting]

5. Automation & Tooling
   Building tools that make security research more effective.
   [Python, Scripting, CI/CD]

[Bottom note]
Curiosity-driven. These interests shape how I approach security research.
```

---

### 8. BLOG SECTION (blog.tsx)

**Keep:** Sparse, high-value positioning
**Change:** Framing to security research focus

#### New Copy:

```
[Label]
WRITING

[Heading]
FROM THE
FIELD

[Subtext]
Occasional notes on security research, findings, and the landscape.

[CTA]
VIEW ALL POSTS →
```

---

### 9. CONTACT SECTION (contact.tsx)

**Keep:** Clean, professional
**Change:** Security-focused framing

#### New Copy:

```
[Label]
CONNECT

[Heading]
GET IN
TOUCH

[Email CTA - keep as is]
zekebawt@gmail.com →

[Social links - keep as is]
GitHub, Twitter, Discord

[Footer]
ZEKE BAWTRY • Security Researcher
© 2026
```

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Remove Revealing Elements
- [ ] Remove Dashboard section entirely
- [ ] Remove all stats from Hero (PRs, amounts, day counter)
- [ ] Remove day counter from About
- [ ] Remove skill percentages
- [ ] Remove "2/day" skill stats
- [ ] Remove bounty amounts from projects
- [ ] Remove pending PR details

### Phase 2: Update Copy
- [ ] Update metadata (title, description)
- [ ] Update Hero tagline and label
- [ ] Update About section (story and values)
- [ ] Update Skills (categories, no percentages)
- [ ] Update Projects (research framing, no specifics)
- [ ] Update Interests (security focus)
- [ ] Update Blog header
- [ ] Update Contact footer

### Phase 3: Update data.ts
- [ ] Simplify skills array (no levels)
- [ ] Simplify projects array (no bounties)
- [ ] Remove evolution/income tracking data
- [ ] Remove dashboard-specific exports

---

## TONE EXAMPLES

**Instead of:**
> "3 PRs pending with $180 potential"

**Say:**
> "Active security research" (or say nothing)

---

**Instead of:**
> "Day 5 of the journey"

**Say:**
> (Nothing. Let the work speak.)

---

**Instead of:**
> "2 new skills every day. No exceptions."

**Say:**
> "Continuous learning isn't optional. The security landscape evolves daily."

---

**Instead of:**
> "Nagios Provider - $75 bounty"

**Say:**
> "Open source security contributions" (until confirmed)

---

## VISUAL NOTES

- Keep the sage green (#576953) palette — it's understated, professional
- Keep Space Grotesk — clean, technical feel
- Keep the water caustics effect — adds subtle depth
- Remove progress bars / stat visualizations
- Keep hover effects and animations — quality feel

---

## POST-IMPLEMENTATION

Once bounties are confirmed/paid:
- Can add a "Selected Findings" section with confirmed vulns
- Can mention specific platforms (with permission)
- Can add testimonials from program managers
- Never reveal methodology or effectiveness metrics

The goal: Build a reputation through quality, not numbers.
