/**
 * News: reading the posts, their URLs and dates, and the RSS and Atom feeds.
 * The posts are in src/content/news/ (see src/content.config.ts).
 */
import { getCollection, type CollectionEntry } from 'astro:content';

import { getDictionary, route, CONTACT_EMAIL, HTML_LANG, type Locale } from '~/i18n';

export type Post = CollectionEntry<'news'>;

const SITE = 'https://vast.ch';

/** The post's file name, without its language folder. */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
const postLocale = (post: Post) => post.id.split('/')[0] as Locale;

export const newsUrl = (locale: Locale) => route('news', locale);
export const postUrl = (locale: Locale, slug: string) => `${newsUrl(locale)}/${slug}`;
export const feedUrl = (locale: Locale, format: 'rss' | 'atom') => `${newsUrl(locale)}/${format}.xml`;

/** The published posts of one language, newest first. */
export const getPosts = async (locale: Locale): Promise<Post[]> => {
  const posts = await getCollection(
    'news',
    (post) => postLocale(post) === locale && (import.meta.env.DEV || !post.data.draft)
  );
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

/** "Tue, 28 Oct 2026" / "mar. 28 oct. 2026". */
export const formatDate = (locale: Locale, date: Date) =>
  new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CH' : 'en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/* ------------------------------------------------------------------ feeds */

const xml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const absolute = (path: string) => new URL(path, SITE).href;

const feedResponse = (body: string, type: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, {
    headers: { 'Content-Type': `${type}; charset=utf-8` },
  });

/** RSS 2.0, with each post in full. */
export const rssFeed = async (locale: Locale) => {
  const n = getDictionary(locale).news;
  const posts = await getPosts(locale);
  const items = posts
    .map((post) => {
      const link = absolute(postUrl(locale, postSlug(post)));
      return `    <item>
      <title>${xml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${xml(post.data.description)}</description>
      <content:encoded>${xml(post.rendered?.html ?? '')}</content:encoded>
    </item>`;
    })
    .join('\n');
  return feedResponse(
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xml(n.feed.title)}</title>
    <link>${absolute(newsUrl(locale))}</link>
    <description>${xml(n.feed.description)}</description>
    <language>${HTML_LANG[locale]}</language>
    <atom:link href="${absolute(feedUrl(locale, 'rss'))}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${posts[0].data.date.toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`,
    'application/rss+xml'
  );
};

/** Atom 1.0, with each post in full. */
export const atomFeed = async (locale: Locale) => {
  const n = getDictionary(locale).news;
  const posts = await getPosts(locale);
  const updated = (posts[0]?.data.date ?? new Date(0)).toISOString();
  const entries = posts
    .map((post) => {
      const link = absolute(postUrl(locale, postSlug(post)));
      return `  <entry>
    <title>${xml(post.data.title)}</title>
    <link href="${link}" />
    <id>${link}</id>
    <published>${post.data.date.toISOString()}</published>
    <updated>${post.data.date.toISOString()}</updated>
    <summary>${xml(post.data.description)}</summary>
    <content type="html">${xml(post.rendered?.html ?? '')}</content>
  </entry>`;
    })
    .join('\n');
  return feedResponse(
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${HTML_LANG[locale]}">
  <title>${xml(n.feed.title)}</title>
  <subtitle>${xml(n.feed.description)}</subtitle>
  <link href="${absolute(newsUrl(locale))}" />
  <link href="${absolute(feedUrl(locale, 'atom'))}" rel="self" type="application/atom+xml" />
  <id>${absolute(newsUrl(locale))}</id>
  <updated>${updated}</updated>
  <author>
    <name>vast</name>
    <email>${CONTACT_EMAIL}</email>
  </author>
${entries}
</feed>
`,
    'application/atom+xml'
  );
};
