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
      title: 'vast — Software and machine learning, built with you',
      description:
        'Vast is a small Swiss consulting company of senior developers. We build web and mobile applications and custom software with our clients, and develop machine-learning models for time series.',
    },
    hero: `<a href="${r('services')}">Software and machine learning</a>, built with you.<br />A small, senior Swiss team, for <a href="${r('about')}">people and nature</a>.`,
    links: { services: 'What we do', contact: 'Get in touch' },
  },

  services: {
    meta: {
      title: 'Services',
      description:
        'Web and mobile applications, custom software development, and machine learning for time series: forecasting and anomaly detection.',
    },
    label: 'Services',
    heading: 'We develop software with our clients.',
    intro: [
      'Vast is a small consulting company of senior developers. We build web and mobile applications and custom software, and we develop machine-learning models for time series, from forecasting to anomaly detection.',
      'We work closely with your team, show progress early and keep things simple. Every project starts with a conversation and a small first step, so you can see how we work before committing to more.',
    ],
    listLabel: 'What we do',
    labels: {
      audience: 'For',
      deliverables: 'What it can include',
      how: 'How we work on it',
      pricing: 'Pricing',
      why: 'Experience',
      start: 'Where to start',
      write: 'Write to us about this',
    },
    offers: [
      {
        id: 'web-and-mobile',
        title: 'Web and mobile applications',
        headline: 'From a first prototype to an app in production.',
        promise:
          'We design and build web applications and cross-platform mobile apps for iOS and Android, and we can keep developing them after launch.',
        audience:
          'Organisations that need a new application, want to replace a tool that has outgrown its spreadsheet, or need an existing app taken further.',
        deliverables: [
          'Web applications, from simple sites to long-lived business tools.',
          'Mobile apps for iOS and Android from a single codebase, published on the app stores.',
          'The backend and APIs behind them.',
          'Maintenance and further development after launch.',
        ],
        how: 'We start small, with a prototype or a first usable version, then work in short iterations with your feedback. We choose proven, well-documented technologies that your team or another supplier can maintain.',
        why: 'We have shipped web and mobile applications to production for years, including apps on the App Store and Google Play.',
        cta: 'Tell us about the application you have in mind, even if it is only a rough idea. We will tell you how we would approach it.',
      },
      {
        id: 'software',
        title: 'Custom software development',
        headline: 'Software built around how your organisation actually works.',
        promise:
          'We develop the software you cannot buy off the shelf: internal tools, integrations between systems, automations and data pipelines.',
        audience: 'Teams whose work depends on manual steps, copied data and tools that do not talk to each other.',
        deliverables: [
          'Internal tools that replace fragile spreadsheets and repetitive manual work.',
          'Integrations between the systems you already use.',
          'Data pipelines that collect, clean and store your data reliably.',
          'Reviews of existing code or architecture, with written recommendations.',
        ],
        how: 'We look at how the work is done today before writing any code, then build in small steps. When an existing tool already does the job, we say so.',
        why: 'Between us we cover frontend, mobile, backend, data and infrastructure, so one small team can take a project from start to finish.',
        cta: 'Describe the manual task or the missing tool that slows your team down. We will tell you honestly whether software is the right answer.',
      },
      {
        id: 'time-series',
        title: 'Machine learning for time series',
        headline: 'Forecasting and anomaly detection on your measurement data.',
        promise:
          'We develop machine-learning models for time series, such as consumption forecasts or the detection of abnormal behaviour, together with the data pipelines that feed them.',
        audience:
          'Organisations with sensor, meter or operational data, especially in energy and buildings, who want to anticipate what comes next or spot problems earlier.',
        deliverables: [
          'Forecasting models, from classical statistical methods to modern machine learning.',
          'Anomaly detection on sensor and meter data.',
          'The pipeline around the model, from raw measurements to results you can use.',
          'Documentation of how the model works and where its limits are.',
        ],
        extra: {
          label: 'From our research',
          text: 'Estimating the energy performance of buildings; detecting anomalies in district heating networks; benchmarking forecasting models, including time-series foundation models, with onTime, our open-source library.',
        },
        how: 'We start from the data you already have and check what it can support before building anything complex. Every model is compared with simple baselines and tested on data it has not seen.',
        why: 'Our machine-learning work is led by a PhD in computer science focused on data science for the energy sector, with peer-reviewed publications.',
        cta: 'Tell us what you would like to forecast or detect, and what data you have. We will tell you honestly what seems feasible.',
      },
    ],
    outro: `Not sure where your project fits? <a href="${r('contact')}">Just tell us about it</a>. If we are not the right team, we will say so.`,
  },

  approach: {
    meta: {
      title: 'Approach',
      description:
        'How Vast works: senior developers only, software built with you, a small first step, honesty, sovereignty over your code and data, and care for the environment.',
    },
    label: 'Approach',
    heading: 'How we work',
    principles: [
      {
        title: 'Senior people only.',
        text: 'Everyone working on your project is an experienced developer. That is how a small team gets to good results quickly.',
      },
      {
        title: 'Built with you.',
        text: 'We develop software together with our clients, not behind closed doors. You see progress early, give feedback often, and your team learns along the way.',
      },
      {
        title: 'A small first step.',
        text: 'We start with a well-defined first piece of work, so you can judge how we work before committing to more.',
      },
      {
        title: 'Honest about what we know.',
        text: 'We tell you what we are sure of, what we are not, and when something is not worth building.',
      },
      {
        title: 'Sovereignty.',
        text: 'Your code, your data and your infrastructure stay yours. We favour open standards, open-source tools and hosting in Switzerland or Europe, so you are never locked in, not even with us.',
      },
      {
        title: 'Care for the environment.',
        text: 'We want our work to be good for people and nature. We are especially glad to work on energy, buildings and the environment, and we keep what we build as lean as the problem allows.',
      },
    ],
    start: {
      heading: 'Where to start',
      intro: 'Most collaborations start small:',
      steps: [
        {
          title: 'A short conversation.',
          text: 'Thirty minutes in French, German or English with the developers who would do the work. If we are not the right fit, we will tell you.',
        },
        {
          title: 'A first, well-defined step.',
          text: 'A prototype, a first version or a short analysis of your data, with a clear scope and a price.',
        },
        {
          title: 'Short iterations.',
          text: 'Working software early, regular check-ins, and documentation written for whoever maintains it next.',
        },
        {
          title: 'Then decide together.',
          text: 'If it works, we continue, at a fixed price per milestone or at a daily rate. If it does not, you have spent little and learned something.',
        },
      ],
    },
    oneLiner: {
      label: 'The one-line version',
      text: 'We start small, build with you, and tell you honestly how it is going.',
    },
    outro: `<a href="${r('contact')}">Tell us about your project</a>.`,
  },

  about: {
    meta: {
      title: 'About',
      description:
        'Vast Switzerland GmbH is a small Swiss consulting company of senior developers, based in Interlaken, Brig and Fribourg. We value sovereignty and care for the environment.',
    },
    label: 'About',
    intro: `<a href="${r('home')}">Vast Switzerland GmbH</a> is a small Swiss consulting company. We develop software with our clients, and machine-learning models for time series.`,
    sections: [
      {
        title: 'Who we are',
        text: `Vast is run by its founders, all senior developers. <a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a> works on data science and time-series forecasting. <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> is a software engineer with a frontend focus and a long-time Ember and JavaScript contributor. <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a> builds mobile and web applications, including apps published on the App Store and Google Play.`,
      },
      {
        title: 'Data science for energy',
        text: 'Frédéric holds a PhD in computer science from HES-SO. His research covered estimating the energy performance of buildings, detecting anomalies in district heating networks and benchmarking forecasting models. We publish our research and develop onTime, an open-source library for benchmarking time-series forecasting models.',
      },
      {
        title: 'Sovereignty and the environment',
        text: `We care about who controls software and data, and about the planet it runs on. We favour open-source tools and Swiss or European hosting, and we are glad to work on projects that help people and nature. <a href="${r('approach')}">Read how we work</a>.`,
      },
      {
        title: 'Rooted in Switzerland',
        text: 'You will find us in Interlaken, Brig and Fribourg. We work in French, German and English.',
      },
    ],
    tagline: 'For a world where people and nature thrive together.',
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Write to Vast in French, German or English. Tell us about your project and we will tell you honestly whether we can help.',
    },
    label: 'Contact',
    heading: 'Tell us about your project. We will tell you honestly whether we can help.',
    intro:
      'Write to us in French, German or English. A rough idea is plenty. You will hear back from the developers who would do the work.',
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
