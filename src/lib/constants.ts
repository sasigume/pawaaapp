export const SITE_NAME = 'ナポアンのマイクラ';
export const SITE_URL = 'napoan.com';
export const CREATOR_ID = 'sasigume';
export const SITE_DESC = '日本最速のマインクラフト情報サイト';
export const SITE_FULL_URL =
  process.env.HTTPS_URL ?? 'https://' + process.env.VERCEL_URL ?? 'https://next.napoan.com';

export const VERCEL_LAST_COMMIT =
  'https://github.com/' +
  (process.env.VERCEL_GIT_REPO_OWNER ?? '') +
  '/' +
  (process.env.VERCEL_GIT_REPO_SLUG ?? '') +
  '/commit/' +
  (process.env.VERCEL_GIT_COMMIT_SHA ?? '');
export const VERCEL_LAST_COMMIT_MESSAGE = process.env.VERCEL_GIT_COMMIT_MESSAGE ?? '';
