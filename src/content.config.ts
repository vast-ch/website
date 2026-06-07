import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const action = z.object({
  variant: z.enum(['primary', 'secondary', 'link']).optional(),
  text: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  target: z.string().optional(),
});

const item = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  callToAction: action.optional(),
});

const image = z.object({
  src: z.string(),
  alt: z.string(),
});

const pageMetadata = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ignoreTitleTemplate: z.boolean().optional(),
});

const hero = z.object({
  tagline: z.string().optional(),
  title: z.string().optional(),
  titleAccent: z.string().optional(),
  subtitle: z.string().optional(),
  image: image.optional(),
  imageAlt: z.string().optional(),
  actions: z.array(action).optional(),
});

const heroText = z.object({
  tagline: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
});

const stats = z.object({
  title: z.string().optional(),
  items: z.array(z.object({ title: z.string(), amount: z.string() })),
});

const featuresGrid = z.object({
  id: z.string().optional(),
  tagline: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  columns: z.number().optional(),
  items: z.array(item),
});

const content = z.object({
  isReversed: z.boolean().optional(),
  isAfterContent: z.boolean().optional(),
  tagline: z.string().optional(),
  title: z.string().optional(),
  contentHeading: z.string().optional(),
  contentBody: z.string().optional(),
  accentBackground: z.boolean().optional(),
  items: z.array(item),
  image: image.optional(),
});

const steps = z.object({
  tagline: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({ title: z.string(), description: z.string() })),
});

const contactForm = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  inputs: z.array(
    z.object({ type: z.string(), name: z.string(), label: z.string(), required: z.boolean().optional() })
  ),
  textarea: z.object({ label: z.string() }),
  disclaimer: z.object({ label: z.string() }),
  description: z.string().optional(),
});

const cta = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  actions: z.array(action),
});

const tech = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  tagline: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({ name: z.string(), icon: z.string() })).max(6),
});

const quickStart = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  categories: z.array(z.string()),
  button: z.string().optional(),
  consent: z.string().optional(),
});

const pageSchema = z.object({
  metadata: pageMetadata.optional(),
  hero: hero.optional(),
  heroText: heroText.optional(),
  stats: stats.optional(),
  services: featuresGrid.optional(),
  whyUs: content.optional(),
  industries: featuresGrid.optional(),
  team: featuresGrid.optional(),
  receipts: featuresGrid.optional(),
  values: steps.optional(),
  offices: featuresGrid.optional(),
  languages: featuresGrid.optional(),
  techStack: featuresGrid.optional(),
  whyTheseIndustries: content.optional(),
  whatsHard: content.optional(),
  proof: featuresGrid.optional(),
  whoItsFor: featuresGrid.optional(),
  whenItFits: featuresGrid.optional(),
  digitalization: featuresGrid.optional(),
  examples: content.optional(),
  categories: featuresGrid.optional(),
  approach: content.optional(),
  web: content.optional(),
  mobile: content.optional(),
  backend: content.optional(),
  capabilities: content.optional(),
  howWeWork: content.optional(),
  whatWeAdviseOn: content.optional(),
  howItWorks: content.optional(),
  caseStudy: content.optional(),
  nextSteps: steps.optional(),
  quickStart: quickStart.optional(),
  directContact: featuresGrid.optional(),
  contactForm: contactForm.optional(),
  tech: tech.optional(),
  cta: cta.optional(),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/content/pages' }),
  schema: pageSchema,
});

export const collections = {
  post: postCollection,
  pages: pagesCollection,
};
