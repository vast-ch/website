import { ROUTES } from './config';
import type { Dictionary } from './types';

const r = (key: keyof typeof ROUTES) => ROUTES[key].en;

export const en: Dictionary = {
  locale: 'en',

  chrome: {
    company: 'Vast Switzerland GmbH',
    association: 'vast.earth association',
    realm: { toEarth: 'Switch to vast.earth', toCh: 'Switch to vast.ch' },
    skipToContent: 'Skip to content',
    primaryNav: 'Primary navigation',
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
    join: 'Join us',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },

  home: {
    meta: {
      title: 'software and modelling',
      description:
        'vast is a software engineering company. We develop software and machine-learning models with our clients, for people and nature.',
    },
    heading: 'Building research-grade software and models for the physical world.',
    lead: 'vast.ch is our company. Together with you, we develop software that turns what you measure into understanding.',
    links: { services: 'What we do', contact: 'Get in touch' },
  },

  services: {
    meta: {
      title: 'Services',
      description:
        'Machine learning for time series and tabular data, our speciality, along with web and mobile applications and custom software, built with our clients.',
    },
    label: 'Services',
    heading:
      'We develop software and machine learning models with our clients, and we specialise in data from the physical world.',
    intro: [
      'Software engineering is changing with recent AI advances. Value no longer comes from the code alone: it comes from knowing which problem is worth solving, checking that a solution really works, having the data that makes it reliable, and standing behind the result.',

      'Our work has two sides. One is the software organisations run on: web and mobile applications, internal tools and integrations that remove friction from everyday work. The other is modelling the physical world from sensor readings and other data sources, in the energy, buildings, sport and weather sectors. This way, we can forecast, detect anomalies and estimate what cannot be measured.',
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
          'We design and build web applications and cross-platform mobile apps for iOS and Android, and we keep developing them after launch.',
        audience:
          'Organisations that need a new application, have a process that has outgrown its spreadsheet, or need an existing app taken further.',
        deliverables: [
          'Web applications, from simple sites to long-lived business tools.',
          'Mobile apps for iOS and Android from a single codebase, published on the app stores.',
          'The backend and APIs behind them.',
          'Maintenance and further development after launch.',
        ],
        how: 'We start small, with a prototype or a first usable version, then work in short iterations with your feedback. We choose proven, well-documented technologies that your team or another supplier can maintain.',
        why: 'Our team has shipped apps to the App Store and Google Play and has built web frontends for over a decade.',
        cta: 'Tell us about the application you have in mind, even if it is only a rough idea. We will tell you how we would approach it.',
      },
      {
        id: 'time-series',
        title: 'Modelling the physical world',
        headline: 'Forecasts, alerts and estimates from the data you already collect.',
        promise:
          "We train machine-learning models on data of many kinds, with a speciality in tabular data and time series. We use them for forecasting, anomaly detection and estimation: a consumption forecast, an alert when a sensor drifts, a building's energy rating from its characteristics. We build the data pipelines around them, so the models produce results your organisation can use.",
        audience:
          'Organisations with sensor, meter, wearable or weather data, in the energy, buildings, sport and weather sectors, who want to anticipate what comes next, spot problems earlier or estimate what they cannot measure.',
        deliverables: [
          'Forecasting models, from classical statistical methods to modern machine learning.',
          'Anomaly detection on sensor, meter and wearable data.',
          'Estimation of what cannot be measured directly, from the data that describes it.',
          'The pipeline around the model, from raw measurements to results you can use.',
          'Documentation of how the model works and where its limits are.',
        ],
        how: 'We start from the data you already have and check what it can support before building anything complex. Every model is compared with simple baselines and tested on data it has not seen.',
        why: 'Our modelling work is led at doctoral level and grounded in ongoing research with the University of Fribourg (UNIFR) and the School of Engineering and Architecture of Fribourg (HEIA-FR). Our methods are published in peer-reviewed venues.',
        cta: 'Tell us what you would like to model, and what data you have. We will come back with what the data can support, and what it cannot.',
      },
      {
        id: 'software',
        title: 'Custom software development',
        headline: 'Software built around how your organisation actually works.',
        promise:
          'We develop the software you cannot buy off the shelf: internal tools, integrations between systems, automations and data pipelines.',
        audience: 'Teams slowed down by copied data, re-typed figures and tools that do not talk to each other.',
        deliverables: [
          'Internal tools that replace fragile spreadsheets and copy-and-paste between systems.',
          'Integrations between the systems you already use.',
          'Data pipelines that collect, clean and store your data reliably.',
          'Reviews of existing code or architecture, with written recommendations.',
        ],
        how: 'We look at how the work is done today before writing any code, then build in small steps. When an existing tool already does the job, we say so.',
        why: 'We cover frontend, mobile, backend, data and infrastructure, so one team can take a project from start to finish.',
        cta: 'Describe the friction that slows your team down, or the tool that is missing. We will come back with a first step, scoped and priced.',
      },
    ],
    outro: `Not sure where your project fits? <a href="${r('contact')}">Just tell us about it</a>.`,
  },

  // The approach page is hidden for now (see src/pages/_approach.astro). Its copy stays here.
  approach: {
    meta: {
      title: 'Approach',
      description:
        'How vast works: knowing what to build, building it with you, a small first step, honesty, care for the environment and transparency about code and data.',
    },
    label: 'Approach',
    heading: 'How we work',
    principles: [
      {
        title: 'Knowing what to build.',
        text: 'Writing code is no longer the hard part; deciding what to build is. We take the time to understand your work, your requirements and what you are really trying to achieve, and we help you decide what is worth building, and what is not.',
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
        text: 'We tell you what we are sure of, what we are not, and when something is not worth building. Models are tested on data they have not seen, and software with the people who will use it.',
      },
      {
        title: 'Care for the environment.',
        text: 'We want our work to be good for people and nature. We are especially glad to work on energy, buildings and the environment, and we keep what we build as lean as the problem allows.',
      },
      {
        title: 'Transparency.',
        text: 'You always know what we build, how, and with what. The code we write for you is yours. When we host or process your data, for instance for monitoring, we agree in writing on what we store, where, and how it may be used, including whether it can help improve our models in aggregated or anonymised form. Data is hosted in Switzerland or Europe, in line with Swiss data protection law.',
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
        'We are a Swiss software engineering and modelling company specialising in data from the physical world.',
    },
    label: 'About',
    intro: `We are <a href="${r('home')}"><b>vast</b></a>, a Swiss company founded and run by three senior developers. We build software and machine-learning models with our clients, with a focus on data from the physical world.`,
    sections: [
      {
        title: 'About the founders',
        text: `<a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a> leads our data science and machine-learning work.

      <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> is a software engineer focused on frontend development and a long-time contributor to Ember.js and the JavaScript ecosystem.

      <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a> builds web applications that handle large volumes of data, and mobile apps published on the App Store and Google Play.`,
      },
      {
        title: 'Research behind our work',
        text: `Frédéric holds a PhD in computer science from the University of Fribourg, with research carried out in collaboration with HEIA-FR.

      His work covered estimating the energy performance of buildings, predicting indoor radon levels from geological and building data, detecting anomalies in district heating networks and benchmarking forecasting models.`,
      },
      {
        title: 'People, nature and sovereignty',
        // Approach page hidden for now. To restore its link, append to the text:
        //   <a href="${r('approach')}">Read how we work</a>.
        text: `We want our work to help people and nature thrive together, and we are particularly glad to take on projects in energy, buildings, sport, weather and the environment.

      Our non-profit association, <a href="https://vast.earth" target="_blank" rel="noopener noreferrer">vast.earth</a>, develops and supports projects of social and environmental benefit.

      Who controls software and data matters, and that includes your data. We favour open-source tools and hosting in Switzerland or Europe.`,
      },
    ],
    tagline: 'Software and models, built with you.',
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Write to vast in French, German or English. Tell us about your project and we will tell you honestly whether we can help.',
    },
    label: 'Contact',
    heading: 'Tell us about your project. We will tell you honestly whether we can help.',
    intro:
      'Write to us in French, German or English. A rough idea is plenty. You will hear back from the developers who would do the work.',
    emailLabel: 'Email',
    addressLabel: 'Registered office',
    address: ['Vast Switzerland GmbH', 'c/o Seed: Lab', 'Chemin du Musée 4', '1700 Fribourg', 'Switzerland'],
    elsewhereLabel: 'Elsewhere',
    smallPrint: `<a href="${r('legal')}">Legal notice</a> · <a href="${r('privacy')}">Privacy policy</a>`,
  },

  earth: {
    meta: {
      title: 'earth',
      description:
        'vast.earth is a non-profit association under Swiss law that fosters harmony between people and nature by developing and supporting projects of social and environmental benefit.',
    },
    heading: 'Fostering harmony between people and nature.',
    lead: 'vast.earth is our non-profit association. It develops and supports projects of social and environmental benefit for everyone.',
    soon: 'Coming soon',
    discord: 'Join us on Discord',
  },

  notFound: {
    meta: { title: 'Page not found', description: 'This page could not be found.' },
    heading: 'This page is lost in the clouds.',
    back: 'Back to the home page',
  },
};
