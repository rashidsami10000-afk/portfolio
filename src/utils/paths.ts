// Prefix internal links with the deployed base path (e.g. /portfolio).
// import.meta.env.BASE_URL always ends with a slash, so we strip it.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/'): string {
  // Leave absolute URLs (and protocol-relative ones) untouched.
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;

  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
