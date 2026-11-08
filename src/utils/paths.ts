// Prefix internal links with the deployed base path (e.g. /portfolio).
// import.meta.env.BASE_URL always ends with a slash, so we strip it.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
