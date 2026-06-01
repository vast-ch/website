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
          text: 'All services',
          href: getPermalink('/services'),
        },
        {
          text: 'Web and app development',
          href: getPermalink('/services/web-development'),
        },
        {
          text: 'Data science and forecasting',
          href: getPermalink('/services/data-science'),
        },
        {
          text: 'Technological advice',
          href: getPermalink('/services/advisory'),
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
        { text: 'Technological advice', href: getPermalink('/services/advisory') },
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
