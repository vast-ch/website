import { SITE } from 'astrowind:config';

const trimSlash = (s = '') => s.replace(/^\/+|\/+$/g, '');

/** Absolute canonical URL for a path, honouring the site's trailing-slash setting. */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** Path to a file in public/, honouring the site's base path. */
export const getAsset = (path: string): string =>
  '/' +
  [SITE.base || '/', path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
