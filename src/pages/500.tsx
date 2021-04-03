import { CREATOR_ID, VERCEL_LAST_COMMIT, VERCEL_LAST_COMMIT_MESSAGE } from '@/lib/constants';

const pkg = require('../../package.json');
const repoV = pkg.version;

export default function Custom500() {
  return (
    <div>
      <h1>サーバーサイドで問題が発生してるみたいです...</h1>

      <p>
        <a href={`https://twitter.com/${CREATOR_ID}`}>https://twitter.com/{CREATOR_ID}</a>
        にご報告いただければ助かります。
      </p>
      <p>
        もしかして: プレビュー用Cookieが消去されていないのかもしれません。
        <a href="/api/preview?exit=yes">こちら</a>をクリックしてみてください。
      </p>
      <p>
        {' '}
        v{repoV} / Last commit: <a href={VERCEL_LAST_COMMIT}>{VERCEL_LAST_COMMIT_MESSAGE}</a>
      </p>
    </div>
  );
}
