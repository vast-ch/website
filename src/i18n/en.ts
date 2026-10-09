import { ROUTES } from './config';
import type { Dictionary } from './types';

const r = (key: keyof typeof ROUTES) => ROUTES[key].en;

export const en: Dictionary = {
  locale: 'en',

  chrome: {
    company: 'Vast Switzerland GmbH',
    skipToContent: 'Skip to content',
    primaryNav: 'Primary navigation',
    externalLinks: 'Elsewhere',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    languageNames: { en: 'English', fr: 'Français' },
    theme: { label: 'Appearance', auto: 'Auto', light: 'Light', dark: 'Dark' },
  },

  nav: {
    home: 'Home',
    services: 'Services',
    approach: 'Approach',
    about: 'About',
    contact: 'Contact',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },

  home: {
    meta: {
      title: 'vast — Measured outcomes for buildings, energy and the environment',
      description:
        'Vast is a small Swiss engineering studio. We combine engineering, applied machine learning and domain knowledge of buildings, energy and the environment to deliver results you can measure and proof you can audit.',
    },
    hero: `<a href="${r('services')}">Measured outcomes</a> for buildings, energy and the environment.<br />Data you can trust, results you can <a href="${r('approach')}">prove</a>.`,
    links: { services: 'Our services', contact: 'Get in touch' },
  },

  services: {
    meta: {
      title: 'Services',
      description:
        'Five ways to work with Vast: process optimisation sprints, compliance and reporting, monitoring and data consolidation, validated models and benchmarking, and research to practice.',
    },
    label: 'Services',
    heading:
      'We don’t sell software. We sell results you can measure, proof you can audit, and a partner who stays accountable.',
    intro: [
      'Software is becoming cheap to build. What stays scarce is knowing which problem is worth solving, proving that a solution works in the real world, and owning the data that makes it trustworthy. Vast works on exactly that layer.',
      'We combine engineering, applied machine learning and deep domain knowledge of buildings, energy and the environment. Every engagement is designed to leave you with a result you can act on, a record that proves it, and a system that keeps working after we leave.',
    ],
    listLabel: 'Five offers',
    labels: {
      audience: 'For',
      deliverables: 'What you get',
      how: 'How it works',
      pricing: 'Pricing',
      why: 'Why it works',
      start: 'Where to start',
      write: 'Write to us about this',
    },
    offers: [
      {
        id: 'process-sprint',
        title: 'Process Optimisation Sprint',
        headline: 'One painful process, fixed in three weeks.',
        promise:
          'We find the process that costs your team the most time, map how it really works, and remove the friction. You get a working improvement, not a report.',
        audience:
          'Small and mid-sized organisations whose processes grew by habit rather than design, where one person holds the knowledge and everyone else chases emails and spreadsheets.',
        deliverables: [
          'A clear map of how the process actually runs today, including the steps nobody wrote down.',
          'The highest-value fixes implemented: automation of repetitive steps, connections between the tools you already use, removal of manual re-entry.',
          'Documentation that takes the process out of one person’s head, so your organisation no longer depends on them being present.',
          'A short list of what to fix next, ranked by return.',
        ],
        how: 'One week to observe and map, two weeks to build and hand over. We work inside your existing tools wherever possible, so your team keeps its habits and loses the pain.',
        pricing: 'Fixed price, fixed scope. You know the cost before we start.',
        why: 'The tools are cheap. Knowing which friction to remove is not. We bring the judgement, you keep the result.',
        cta: 'Tell us which process your team complains about most. We will tell you within a week whether it is worth fixing, and what it would take.',
      },
      {
        id: 'compliance-reporting',
        title: 'Compliance & Reporting, Done For You',
        headline: 'Your energy and environmental reporting, handled. Every cycle. Guaranteed correct.',
        promise:
          'We take over the reporting your team dreads: energy declarations, emissions and carbon reporting, environmental submissions. You sign off. We do the rest, and we stand behind the numbers.',
        audience:
          'Property owners, facility managers, municipalities and companies with obligations under energy, building and environmental regulations, and no one with the time or expertise to own them.',
        deliverables: [
          'Reports delivered on time, in the format the authority or standard requires.',
          'Numbers traced to their source, so every figure can be defended if questioned.',
          'One point of contact who understands both the regulation and the data behind it.',
          'A consolidated record of your performance that grows more valuable each year.',
        ],
        how: 'We connect to your meters, invoices and building data once. From then on, each reporting cycle runs on schedule with minimal input from you. When regulations change, we adapt the process before the deadline, not after.',
        pricing: 'Annual subscription per site or portfolio, priced to the reporting obligation, not to hours.',
        why: 'Compliance is a recurring cost and a recurring risk. Outsourcing it to a partner who carries both is cheaper than building the expertise in-house, and safer than hoping a spreadsheet is right.',
        cta: 'Send us your last report and the regulation it answers to. We will show you where the effort and the risk sit, and what it would cost to remove both.',
      },
      {
        id: 'monitoring',
        title: 'Monitoring & Data Consolidation',
        headline: 'All your energy and environmental data in one trusted place, watched around the clock.',
        promise:
          'We bring together the data scattered across your meters, sensors, building systems and spreadsheets, keep it clean, and tell you when something goes wrong before it costs you.',
        audience:
          'Operators of buildings, heating networks, energy systems and environmental monitoring who have more data than insight, and who learn about faults from the bill rather than from the system.',
        deliverables: [
          'One consolidated, continuously updated record of your energy, climate and environmental data.',
          'Automatic detection of anomalies: leaks, drifting sensors, equipment running outside its normal pattern, unexplained consumption.',
          'Alerts that reach the right person with enough context to act.',
          'Monthly review of what the data shows and what it suggests you change.',
        ],
        extra: {
          label: 'Typical scope',
          text: 'Electricity, heat and water consumption; indoor climate and air quality; district heating networks; environmental sensors on sites and in the field.',
        },
        how: 'We connect your existing sources, no new hardware required unless you want it. Data flows into a time-series platform we operate for you. Our detection models learn what normal looks like for your systems and flag what deviates.',
        pricing:
          'Monthly service per site, network or data stream. Scales with what we watch, not with how often you ask.',
        why: 'Collecting data is easy. Understanding what it means, every day, without someone staring at dashboards, is the service. The longer we watch, the better the detection gets.',
        cta: 'List your data sources, even the messy ones. We will tell you what we can consolidate in the first month and what we expect to find.',
      },
      {
        id: 'validated-models',
        title: 'Validated Models & Benchmarking',
        headline: 'Predictions you can defend, because we prove them against reality.',
        promise:
          'We build models of your buildings, energy systems or environmental risks, validate them against measured outcomes, and show you where you stand against comparable sites. You pay for accuracy you can verify, not for a model that looks good on paper.',
        audience:
          'Portfolio owners, utilities, public bodies and research-driven organisations that need to estimate, forecast or prioritise at scale: energy consumption, renovation potential, exposure to environmental risks, expected performance of a measure before it is funded.',
        deliverables: [
          'A model fitted to your data and documented so a third party can audit it.',
          'A validation report showing how the model performs against real measurements, with its limits stated plainly.',
          'Benchmarks placing each site or asset against its peers, so investment goes where the gap is largest.',
          'Forecasts and scenarios you can put in front of a board, a funder or an authority.',
        ],
        extra: {
          label: 'Typical questions',
          text: 'Which buildings in this portfolio waste the most energy? What will this renovation actually save? Which sites carry the highest indoor-environment risk? What will consumption look like next winter?',
        },
        how: 'We start from the data you already hold and enrich it with public and geospatial sources. Models are tested against held-out measurements before they are used. Results come with uncertainty, because a number without its uncertainty is a guess.',
        pricing:
          'Project price for the model and validation, then an annual fee to keep it current as new data arrives. Where outcomes can be measured, part of the fee can be tied to them.',
        why: 'Anyone can produce a model today. Few can prove it works, and proof requires real data, real outcomes and a track record. That is what you are buying.',
        cta: 'Tell us the decision you need to make and the data you have. We will tell you what can be estimated, how accurately, and what it would take.',
      },
      {
        id: 'research-to-practice',
        title: 'Research to Practice',
        headline: 'The method exists in a paper. We make it work in your system.',
        promise:
          'We take state-of-the-art techniques from research, judge which are mature enough to rely on, and integrate them into your real operations. You get the frontier without the risk of being its test case.',
        audience:
          'Companies, utilities and public bodies that know a better method exists but lack the people to evaluate and deploy it. Research groups and innovation programmes that need a prototype to become a product.',
        deliverables: [
          'An honest assessment of which methods are ready for production and which are still academic.',
          'A working integration into your systems, built to be maintained, not demonstrated once.',
          'Transfer of understanding to your team, so you are not dependent on us to operate it.',
          'Where relevant, a path to co-funded innovation projects with academic partners.',
        ],
        extra: {
          label: 'Typical work',
          text: 'Time-series forecasting and anomaly detection on infrastructure data; estimation models from geospatial and building data; machine-learning pipelines that replace manual expert assessment; rapid prototypes to test an idea in weeks rather than quarters.',
        },
        how: 'A short scoping phase to match the problem to the method. Then an iterative build with measurable checkpoints, each one validated against your data. We stop when the result is proven, not when the budget runs out.',
        pricing:
          'Scoping at a fixed price. Development in milestones, each with a defined deliverable and acceptance criterion.',
        why: 'The gap between a published result and a reliable system is where most projects fail. We have crossed it repeatedly, in academic and commercial settings, and we know which shortcuts are safe.',
        cta: 'Share the paper, the problem or the prototype. We will tell you whether it can be made to work, and what it would take to get there.',
      },
    ],
    outro: `Not sure which one fits? Most clients start small and expand as trust and data accumulate. <a href="${r('approach')}#where-to-start">See where to start</a>, or <a href="${r('contact')}">just tell us the problem</a>.`,
  },

  approach: {
    meta: {
      title: 'Approach',
      description:
        'How Vast works: outcomes not hours, proof included, one accountable person, your tools first, your data stays yours, built to last.',
    },
    label: 'Approach',
    heading: 'How we work',
    principles: [
      {
        title: 'Outcomes, not hours.',
        text: 'Every offer is priced to a result: a process fixed, a report delivered, a system watched, a model proven. You never pay for effort you cannot see.',
      },
      {
        title: 'Proof included.',
        text: 'We document how every number was produced. If a figure cannot be traced to its source, we do not report it.',
      },
      {
        title: 'One accountable person.',
        text: 'You deal with the engineer who did the work, not an account manager. When something needs explaining or fixing, the person who can do it is the person you call.',
      },
      {
        title: 'Your tools first.',
        text: 'We build inside what you already use whenever it is sound. New software is a last resort, not a reflex.',
      },
      {
        title: 'Your data stays yours.',
        text: 'You own your data and can take it with you at any time. Where we retain data to improve our models and benchmarks, we do so only with your written agreement, in aggregated or anonymised form, and in full compliance with Swiss data protection law.',
      },
      {
        title: 'Built to last.',
        text: 'What we deliver is documented, maintainable and handed over properly. You are never locked in by code only we understand.',
      },
      {
        title: 'Values are a selection criterion.',
        text: 'We work with organisations whose activity we are glad to strengthen: energy, buildings, applied research, the outdoors, and the public and non-profit bodies that serve them.',
      },
    ],
    start: {
      heading: 'Where to start',
      intro: 'Most clients begin small and expand as trust and data accumulate. The natural sequence:',
      steps: [
        {
          title: 'Start with a sprint.',
          text: `A <a href="${r('services')}#process-sprint">Process Optimisation Sprint</a> or a single reporting cycle. Low commitment, visible result within a month, and we learn how your organisation really works.`,
        },
        {
          title: 'Move to a recurring service.',
          text: `<a href="${r('services')}#compliance-reporting">Compliance &amp; Reporting</a> or <a href="${r('services')}#monitoring">Monitoring</a>. Your data begins to accumulate in one trusted place, and each cycle gets cheaper and more reliable than the last.`,
        },
        {
          title: 'Build on the record.',
          text: `With a year or more of consolidated data, <a href="${r('services')}#validated-models">Validated Models &amp; Benchmarking</a> become possible and precise. Investment decisions are now backed by your own evidence.`,
        },
        {
          title: 'Reach for the frontier when it pays.',
          text: `<a href="${r('services')}#research-to-practice">Research to Practice</a> for the problems where a better method would change the economics.`,
        },
      ],
    },
    oneLiner: {
      label: 'The one-line version',
      text: 'We fix something concrete first. If it works, we keep going. If it does not, you have lost three weeks and learned something.',
    },
    outro: `<a href="${r('contact')}">Tell us where it hurts</a>.`,
  },

  about: {
    meta: {
      title: 'About',
      description:
        'Vast Switzerland GmbH is a small Swiss engineering studio based in Interlaken, Brig and Fribourg, working on buildings, energy and the environment.',
    },
    label: 'About',
    intro: `<a href="${r('home')}">Vast Switzerland GmbH</a> is a small Swiss engineering studio founded by <a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a>, <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> and <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a>.`,
    sections: [
      {
        title: 'Engineering, data and domain knowledge',
        text: 'We combine software engineering, applied machine learning and deep knowledge of buildings, energy and the environment. Our modelling work is PhD-led and grounded in peer-reviewed research. Our software is built to be maintained, not demonstrated once.',
      },
      {
        title: 'Open by practice',
        text: 'We publish our research and develop onTime, an open-source library for benchmarking time-series forecasting models. You can check our claims instead of taking them on trust.',
      },
      {
        title: 'Rooted in Switzerland',
        text: 'You will find us in Interlaken, Brig and Fribourg. We work in French, German and English, and we know how things actually get done here.',
      },
      {
        title: 'Why buildings, energy and the environment',
        text: `This is where better data most directly turns into less waste. We choose clients whose activity we are glad to strengthen, and we stay accountable for what we deliver. <a href="${r('approach')}">Read how we work</a>.`,
      },
    ],
    tagline: 'For a world where people and nature thrive together.',
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Write to Vast in French, German or English. Tell us the problem and we will tell you honestly whether we can help.',
    },
    label: 'Contact',
    heading: 'Tell us the problem. We will tell you honestly whether we can help.',
    intro:
      'Write to us in French, German or English. You will hear back from the engineer who would do the work, not from an account manager.',
    emailLabel: 'Email',
    offersLabel: 'Or start from one of these',
    write: 'Write about this',
    addressLabel: 'Registered office',
    address: ['Vast Switzerland GmbH', 'c/o Seed: Lab', 'Chemin du Musée 4', '1700 Fribourg', 'Switzerland'],
    elsewhereLabel: 'Elsewhere',
    smallPrint: `<a href="/terms">Terms and conditions</a>`,
  },

  notFound: {
    meta: { title: 'Page not found', description: 'This page could not be found.' },
    heading: 'This page is lost in the clouds.',
    back: 'Back to the home page',
  },
};
