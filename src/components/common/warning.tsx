import { Box } from "@chakra-ui/react"

const Warning = () => (
  <Box background="gray.700" color="white" p={6} mb={4} rounded="xl">
    <div>
      {/* あえて通常のリンク(Adsenseの都合上) */}
      <a href="/eula/">利用規約</a>に反した投稿は即刻削除します。Twitterアカウントと投稿が紐づけられていることを忘れないでください。
      </div>
    <div>サーバーサイドのデータは常時同期しているわけではないので、コメントなどの反映には少し時間がかかります。</div>
  </Box>
)
export default Warning