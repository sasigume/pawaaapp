import Link from "next/link"

const Warning = () => (
  <div className="bg-gray-500 text-white text-lg font-bold p-4 m-4">
    <div>
      <Link href="/posts/eula" ><a className="underline">利用規約</a></Link>に反した投稿は即刻削除します。Twitterアカウントと投稿が紐づけられていることを忘れないでください。
      </div>
    <div>サーバーサイドのデータは常時同期しているわけではないので、コメントなどの反映には少し時間がかかります。</div>
  </div>
)
export default Warning