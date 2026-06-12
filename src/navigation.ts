import { getPermalink } from './utils/permalinks';

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
          text: 'Data science and machine learning',
          href: getPermalink('/services/data-science-machine-learning'),
          icon: 'tabler:chart-line',
          description: 'Support your decisions with data',
        },
        /*
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
        */
      ],
    },
    {
      text: 'Case studies',
      href: getPermalink('/case-studies'),
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
  actions: [{ variant: 'primary' as const, text: 'Contact us', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Web and app development', href: getPermalink('/services/app-development') },
        { text: 'Data science and machine learning', href: getPermalink('/services/data-science-machine-learning') },
      ],
    },
    {
      title: 'Case studies',
      links: [
        { text: 'Flightbook — shipped, in production', href: getPermalink('/case-studies#flightbook') },
        {
          text: 'Foundation models vs. classical baselines',
          href: getPermalink('/case-studies#foundation-models-benchmark'),
        },
        { text: 'See all case studies', href: getPermalink('/case-studies') },
      ],
    },
  ],
  secondaryLinks: [],
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
