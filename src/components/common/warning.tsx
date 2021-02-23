import Link from "next/link"

const Warning =()=>(
  <div className="bg-red-500 text-white text-xl font-bold p-4 m-4">
    <Link href="/posts/eula" ><a className="underline">利用規約</a></Link>に反した投稿は即刻削除します。Twitterアカウントと投稿が紐づけられていることを忘れないでください。
    </div>
)
export default Warning