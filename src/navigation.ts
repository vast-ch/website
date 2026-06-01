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
      links: [
        {
          text: 'Web and app development',
          href: getPermalink('/services/web-development'),
        },
        {
          text: 'Data science and forecasting',
          href: getPermalink('/services/data-science'),
        },
        {
          text: 'Advisory & digitalization',
          href: getPermalink('/services/advisory'),
        },
        {
          text: 'Small tools & prototypes',
          href: getPermalink('/services/small-tools'),
        },
      ],
    },
    {
      text: 'Domains',
      href: getPermalink('/domains'),
      links: [
        {
          text: 'Energy and buildings',
          href: getPermalink('/domains/energy'),
        },
        {
          text: 'Applied research',
          href: getPermalink('/domains/research'),
        },
        {
          text: 'Outdoor sports',
          href: getPermalink('/domains/outdoor-sports'),
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
  actions: [{ text: 'Contact us', href: getPermalink('/contact') }],
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
        { text: 'Advisory & digitalization', href: getPermalink('/services/advisory') },
        { text: 'Small tools & prototypes', href: getPermalink('/services/small-tools') },
      ],
    },
    {
      title: 'Domains',
      links: [
        { text: 'Energy and buildings', href: getPermalink('/domains/energy') },
        { text: 'Applied research', href: getPermalink('/domains/research') },
        { text: 'Outdoor sports', href: getPermalink('/domains/outdoor-sports') },
      ],
    },
  ],
  secondaryLinks: [{ text: 'Terms', href: getPermalink('/terms') }],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} Vast Switzerland GmbH — All rights reserved.
  `,
};
