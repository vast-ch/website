import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
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
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ variant: 'primary' as const, text: 'Contact us', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Web and app development', href: getPermalink('/services/app-development') },
        { text: 'Data science and machine learning', href: getPermalink('/services/data-science-machine-learning') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Terms', href: getPermalink('/terms') },
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
