import { getPermalink } from './utils/permalinks';

// TODO: replace with the real Calendly/cal.com scheduling link
export const CALENDAR_URL = 'https://example.com/book-a-call';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
      megamenu: true,
      links: [
        {
          text: 'Application development',
          href: getPermalink('/services/app-development'),
          icon: 'tabler:code',
          description: 'Software built around your metrics.',
        },
        {
          text: 'Data science and forecasting',
          href: getPermalink('/services/data-science'),
          icon: 'tabler:chart-line',
          description: 'Time-series forecasting and ML grounded in research.',
        },
        {
          text: 'Small tools & prototypes',
          href: getPermalink('/services/small-tools'),
          icon: 'tabler:tool',
          description: 'Quick utilities that turn an annoyance into time saved.',
        },
        {
          text: 'Advisory & digitalization',
          href: getPermalink('/services/advisory'),
          icon: 'tabler:bulb',
          description: 'Independent reviews and hands-on digitalization.',
        },
      ],
    },
    {
      text: 'Industries',
      href: getPermalink('/industries'),
      megamenu: true,
      links: [
        {
          text: 'Energy and buildings',
          href: getPermalink('/industries/energy'),
          icon: 'tabler:bolt',
          description: 'Forecasting and ML for energy and smart buildings.',
        },
        {
          text: 'Applied research',
          href: getPermalink('/industries/research'),
          icon: 'tabler:school',
          description: 'Research software engineering, reproducible by design.',
        },
        {
          text: 'Sport industry',
          href: getPermalink('/industries/sport-industry'),
          icon: 'tabler:run',
          description: 'Mobile apps for clubs, federations and athletes.',
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    { variant: 'primary', text: 'Book a call', href: CALENDAR_URL, target: '_blank' },
    { text: 'Contact us', href: getPermalink('/contact') },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Web and app development', href: getPermalink('/services/web-development') },
        { text: 'Data science and forecasting', href: getPermalink('/services/data-science') },
        { text: 'Small tools & prototypes', href: getPermalink('/services/small-tools') },
        { text: 'Advisory & digitalization', href: getPermalink('/services/advisory') },
      ],
    },
    {
      title: 'Industries',
      links: [
        { text: 'Energy and buildings', href: getPermalink('/industries/energy') },
        { text: 'Applied research', href: getPermalink('/industries/research') },
        { text: 'Sport industry', href: getPermalink('/industries/sport-industry') },
      ],
    },
  ],
  secondaryLinks: [{ text: 'Terms', href: getPermalink('/terms') }],
  socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/company/vast-switzerland-gmbh',
    },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/vast-ch' },
  ],
  footNote: `
    © ${new Date().getFullYear()} Vast Switzerland GmbH — All rights reserved.
  `,
};
