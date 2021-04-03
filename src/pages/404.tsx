import { CREATOR_ID, VERCEL_LAST_COMMIT, VERCEL_LAST_COMMIT_MESSAGE } from '@/lib/constants';

const pkg = require('../../package.json');
const repoV = pkg.version;

export default function Custom404() {
  return (
    <div>
      <h1>どうやってここに来た！？！？！？？？？？？</h1>

      <p>
        (本来見れるはずなのにこうなった場合、
        <a href={`https://twitter.com/${CREATOR_ID}`}>https://twitter.com/{CREATOR_ID}</a>
        にご報告いただければ助かります。)
      </p>
      <p>
        {' '}
        v{repoV} / Last commit: <a href={VERCEL_LAST_COMMIT}>{VERCEL_LAST_COMMIT_MESSAGE}</a>
      </p>
    </div>
  );
}
