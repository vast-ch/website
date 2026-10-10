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
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },

  home: {
    meta: {
      title: 'vast \\ software and modelling',
      description:
        'Vast is a software engineering company. We develop software and machine-learning models with our clients, for people and nature.',
    },
    hero: `<a href="${r('services')}">Software and machine learning</a>, built with you.<br />For <a href="${r('about')}">people and nature</a>.`,
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
      'We develop software and machine-learning models with our clients, and we specialise in data from the physical world.',
    //intro: [
    //  'Writing code is becoming cheap and fast. What stays scarce is knowing which problem is worth solving, checking that a solution really works, and having the data that makes it reliable. That is where we put most of our effort.',
    //  'Our speciality is machine-learning models for time series: forecasting and anomaly detection on measurement data, especially in energy and buildings. We also build web and mobile applications and custom software. We work closely with your team, and every project starts with a conversation and a small first step.',
    //],

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

  approach: {
    meta: {
      title: 'Approach',
      description:
        'How Vast works: knowing what to build, building it with you, a small first step, honesty, care for the environment and transparency about code and data.',
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
        'Vast is a consulting company. We develop software and machine-learning models for time series with our clients, with care for the environment and for digital sovereignty.',
    },
    label: 'About',
    intro: `<a href="${r('home')}">Vast</a> is a consulting company. We develop software and machine-learning models for time series with our clients.`,
    sections: [
      {
        title: 'Who we are',
        text: `Vast is run by its founders, all senior developers. <a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a> works on data science and time-series forecasting. <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> is a software engineer with a frontend focus and a long-time Ember and JavaScript contributor. <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a> builds mobile and web applications, including apps published on the App Store and Google Play.`,
      },
      {
        title: 'Data science for energy',
        text: 'Frédéric holds a PhD in computer science from the University of Fribourg (UNIFR). His research covered estimating the energy performance of buildings, detecting anomalies in district heating networks and benchmarking forecasting models. We publish our research and develop onTime, an open-source library for benchmarking time-series forecasting models.',
      },
      {
        title: 'Environment and sovereignty',
        text: `We want our work to be good for people and nature, and we are glad to work on projects in energy, buildings and the environment. We also care about who controls software and data: we favour open-source tools and hosting in Switzerland or Europe. <a href="${r('approach')}">Read how we work</a>.`,
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
    smallPrint: `<a href="${r('legal')}">Legal notice</a> · <a href="${r('privacy')}">Privacy policy</a>`,
  },

  notFound: {
    meta: { title: 'Page not found', description: 'This page could not be found.' },
    heading: 'This page is lost in the clouds.',
    back: 'Back to the home page',
  },
};
