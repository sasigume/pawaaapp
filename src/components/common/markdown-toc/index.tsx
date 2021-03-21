import {
  Badge, Box, Flex, Button, useColorMode,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import ReactMarkdownHeading from "react-markdown-heading"
import FaiconDiv from "../faicon-div"
import LinkChakra from "../link-chakra"
import markdownTocStyles from './markdown-toc-styles.module.css'

interface TocProps {
  markdown: string
  headingDepth?: any
  tweetCount?: number
  tweetText?: string
  commentCount?: number
}

const MarkdownToc = (props: TocProps) => {
  const { colorMode } = useColorMode()
  const { asPath } = useRouter()
  const shareUrl = process.env.HTTPS_URL + asPath as string

  const fukidashiStyle = {
    ".fukidashiBox": {
      position: "relative",
      color: "",
      background: colorMode == "light" ? "#fff" : "#000",
      padding: "7px 14px 7px",
      borderRadius: "10px",
      boxShadow: "0px 1px 5px 3px rgba(0,0,0,0.1)"
    },
    ".fukidashiBox::before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: "15px",
      left: "-10px",
      width: "0px",
      height: "0px",
      borderWidth: "5px",
      borderColor: `transparent ${colorMode == "light" ? "#fff" : "#000"} transparent transparent`
    }
  }

  const tweetUrl = `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(props.tweetText ?? '')}&hashtags=PAWAAAPP`

  return (
    <Box>
      <Flex sx={fukidashiStyle} mb={4} alignItems="center">
        <Box mr={2}>
          <Button aria-label="ツイートする" target="_blank" as={LinkChakra} href={tweetUrl} colorScheme="twitter">
            <FaiconDiv icon={['fab', 'twitter']} />
          </Button>
        </Box>
        <Box className="fukidashiBox" bg={colorMode == "dark" ? "black" : "white"} fontSize="lg" mr={6}>
          {props.tweetCount ?? 0}
        </Box>
        <Box mr={2}>
          <Button aria-label="コメントする" as="a" href="#a_comment" colorScheme="orange">
            <FaiconDiv icon={['fas', 'comment-alt']} />
          </Button>
        </Box>
        <Box className="fukidashiBox" sx={fukidashiStyle} bg={colorMode == "dark" ? "black" : "white"} fontSize="lg">
          {props.commentCount ?? 0}
        </Box>
      </Flex>
      <div className={markdownTocStyles['toc']}>
        <ReactMarkdownHeading headingDepth={props.headingDepth ?? 2} markdown={props.markdown} hyperlink />
        <Badge>※Markdownの見出しにのみ対応しています</Badge>
      </div>
    </Box>
  )
}

export default MarkdownToc