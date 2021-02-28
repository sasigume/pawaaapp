import FaiconDiv from "@/components/common/faicon-div"
import LinkChakra from "@/components/common/link-chakra"
import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface Props {
  text: string
}

const FloatShare = ({ text }: Props) => {

  const {asPath} = useRouter()
  const shareUrl = process.env.HTTPS_URL + asPath as string

  const tweetUrl = `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}&hashtags=PAWAAAPP`
  return (
    <Box position="fixed" bottom={5} right={5}>
      <Button target="_blank" as={LinkChakra} href={tweetUrl} colorScheme="twitter" leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}>
        ツイート
        </Button>
    </Box>
  )
}
export default FloatShare