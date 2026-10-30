import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * News: one Markdown file per post, in src/content/news/en/ or .../fr/.
 * The folder is the post's language; a file with the same name in the other
 * folder is its translation. Set `draft: true` to keep a post out of the site
 * and the feeds while it is being written (it still shows with `npm run dev`).
 */
const news = defineCollection({
  loader: glob({ pattern: '{en,fr}/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** One or two sentences: for the feeds, search engines and link previews. */
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
