export const SITE_NAME = 'ナポアンのマイクラ'
export const SITE_URL = 'napoan.com'
export const CREATOR_ID = 'sasigume'
export const SITE_DESC = '日本最大のマイクラブログ'

export const VERCEL_LAST_COMMIT = 'https://github.com/' + (process.env.VERCEL_GIT_REPO_OWNER ?? '') + '/' + (process.env.VERCEL_GIT_REPO_SLUG ?? '') + '/commit/' + (process.env.VERCEL_GIT_COMMIT_SHA ?? '')
export const VERCEL_LAST_COMMIT_MESSAGE = process.env.VERCEL_GIT_COMMIT_MESSAGE ?? ''