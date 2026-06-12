// Taxonomy for the `case-studies` content collection.
// Slugs match the page slugs under /services/* and /industries/* so entries
// stay linkable to their pages; labels are the single source of truth for
// how a slug is displayed (filter pills, card tags).
export const CASE_STUDY_SERVICES = [
  'app-development',
  'data-science-machine-learning',
  'small-tools',
  'advisory',
] as const;
export const CASE_STUDY_INDUSTRIES = ['energy', 'research', 'sport-industry'] as const;

export type CaseStudyService = (typeof CASE_STUDY_SERVICES)[number];
export type CaseStudyIndustry = (typeof CASE_STUDY_INDUSTRIES)[number];

export const TAXONOMY_LABELS: Record<CaseStudyService | CaseStudyIndustry, string> = {
  'app-development': 'Application development',
  'data-science-machine-learning': 'Data science & ML',
  'small-tools': 'Small tools & prototypes',
  advisory: 'Advisory & digitalization',
  energy: 'Energy and buildings',
  research: 'Applied research',
  'sport-industry': 'Sport industry',
};
