/**
 * Team: 7 Agenten. Reihenfolge, Rollen und Texte aus der alten team.html
 * (/workspace/agentunit-cd-ref/website/live/pages/team.html), unverändert übernommen.
 * Avatare (WebP, 300 px) liegen unter public/team/.
 */
export interface Member {
  slug: string;
  name: string;
  role: string;
  tag: string;
  description: string;
  expertise: string;
  values: string;
  avatar: string;
  alt: string;
}

export const team: Member[] = [
  {
    slug: 'kai', name: 'Kai', role: 'Portfolio Orchestrator', tag: 'Strategist / Conductor',
    description: 'Manages cross-project priorities, tracks OKRs, and ensures momentum across the entire portfolio. The conductor who keeps 14 repos moving in harmony.',
    expertise: 'Portfolio management, OKR methodology, dependency identification, resource allocation',
    values: 'Focus over breadth, Transparency, Accountability, Momentum',
    avatar: '/team/kai.webp', alt: 'Kai — Portfolio Orchestrator',
  },
  {
    slug: 'atlas', name: 'Atlas', role: 'Chief Architect', tag: 'Master Builder',
    description: 'Owns system design and technical decisions across all repositories. Every API shape, database choice, and infrastructure pattern goes through Atlas.',
    expertise: 'Distributed systems, API design, database selection, performance analysis',
    values: 'Simplicity over sophistication, Consistency, Reversibility',
    avatar: '/team/atlas.webp', alt: 'Atlas — Chief Architect',
  },
  {
    slug: 'sentinel', name: 'Sentinel', role: 'Security Lead', tag: 'Guardian',
    description: 'Reviews every change for vulnerabilities, manages secrets hygiene, and ensures no code ships without a security audit. The watchkeeper who never sleeps.',
    expertise: 'OWASP Top 10, auth design, secrets management, container security, GDPR',
    values: 'Defense in depth, Least privilege, Auditability',
    avatar: '/team/sentinel.webp', alt: 'Sentinel — Security Lead',
  },
  {
    slug: 'pulse', name: 'Pulse', role: 'SRE / Ops Lead', tag: 'Operator',
    description: 'Owns reliability, monitoring, and incident response. If it runs in production, Pulse watches it — and automates its recovery before you notice it broke.',
    expertise: 'SLOs, monitoring/alerting, container orchestration, deployment strategies',
    values: 'Reliability over features, Automation over heroics, Graceful degradation',
    avatar: '/team/pulse.webp', alt: 'Pulse — SRE / Ops Lead',
  },
  {
    slug: 'prism', name: 'Prism', role: 'Analytics Lead', tag: 'Data Architect',
    description: 'Architects web analytics pipelines, GTM strategies, and data validation. The measurement strategist who ensures every event fires correctly.',
    expertise: 'GTM architecture, PostHog/GA4, data layer design, server-side tagging, consent management',
    values: 'Accuracy over volume, Privacy by design, Client self-service',
    avatar: '/team/prism.webp', alt: 'Prism — Analytics Lead',
  },
  {
    slug: 'wave', name: 'Wave', role: 'Streaming Lead', tag: 'Broadcast Engineer',
    description: 'Builds and operates streaming infrastructure — audio, video, multi-channel. Thinks in latency, bitrate, and buffer metrics.',
    expertise: 'HLS/DASH/RTMP/Icecast, CDN architecture, audio processing, FFmpeg/Liquidsoap',
    values: 'Continuity over features, Quality preservation, Cost awareness',
    avatar: '/team/wave.webp', alt: 'Wave — Streaming Lead',
  },
  {
    slug: 'scout', name: 'Scout', role: 'QA Lead', tag: 'Quality Guardian',
    description: 'Designs test strategies, builds quality gates, and prevents regressions. Skeptical by nature — every untested path is a risk.',
    expertise: 'Test strategy (unit/integration/e2e), coverage analysis, CI/CD pipelines, flaky test detection',
    values: 'Confidence over coverage, Fast feedback, Automation over manual',
    avatar: '/team/scout.webp', alt: 'Scout — QA Lead',
  },
];
