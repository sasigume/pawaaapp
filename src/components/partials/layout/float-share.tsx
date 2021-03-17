import FaiconDiv from "@/components/common/faicon-div"
import LinkChakra from "@/components/common/link-chakra"
import { Box, Button, Tooltip } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface Props {
  text: string
  count?: number
}

const FloatShare = ({ text, count }: Props) => {

  const { asPath } = useRouter()
  const shareUrl = process.env.HTTPS_URL + asPath as string

  const tweetUrl = `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}&hashtags=PAWAAAPP`
  return (
    <Tooltip label={count ? <>{(`${count}件のツイートが見つかったよ!`)}</> : "まだツイートされてないみたい😥"} bg="blue.300" mr={4}>
      <Box position="fixed" bottom={5} right={5}>
        <Button aria-label="ツイートする" target="_blank" as={LinkChakra} href={tweetUrl} colorScheme="twitter" leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}>
          ツイート: {count ?? 0}
        </Button>
      </Box>
    </Tooltip>
  )
}
export default FloatShare