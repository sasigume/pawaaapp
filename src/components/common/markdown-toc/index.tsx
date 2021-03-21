import {
  Badge, Box, Flex, Button,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import ReactMarkdownHeading from "react-markdown-heading"
import FaiconDiv from "../faicon-div"
import LinkChakra from "../link-chakra"
import markdownTocStyles from './markdown-toc-styles.module.css'
import leftfixedStyles from './leftfixed-styles.module.css'

interface TocProps {
  markdown: string
  headingDepth?: any
  tweetCount?: number
  tweetText?: string
}

const MarkdownToc = (props: TocProps) => {
  const { asPath } = useRouter()
  const shareUrl = process.env.HTTPS_URL + asPath as string

  const tweetUrl = `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(props.tweetText ?? '')}&hashtags=PAWAAAPP`

  return (
    <Box>
      <Flex mb={4} alignItems="center">
        <Box mr={2}>
          <Button aria-label="ツイートする" target="_blank" as={LinkChakra} href={tweetUrl} colorScheme="twitter">
            <FaiconDiv icon={['fab', 'twitter']} />
          </Button>
        </Box>
        <Box className={leftfixedStyles['leftfixed']} fontSize="lg">
          {props.tweetCount ?? 0}
        </Box>
      </Flex>
      <div className={markdownTocStyles['toc']}>
        <ReactMarkdownHeading headingDepth={props.headingDepth ?? 2} markdown={props.markdown} hyperlink />
        <Badge color="black">※Markdownの見出しにのみ対応しています</Badge>
      </div>
    </Box>
  )
}

export default MarkdownToc