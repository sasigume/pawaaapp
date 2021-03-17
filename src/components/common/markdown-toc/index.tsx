import { Badge, Box } from "@chakra-ui/layout"
import ReactMarkdownHeading from "react-markdown-heading"
import markdownTocStyles from './markdown-toc-styles.module.css'

interface TocProps {
  markdown: string
  headingDepth?: any
}

const MarkdownToc = (props: TocProps) => {
  return (
    <div className={markdownTocStyles['toc']}>
      <Box textStyle="h2" mb={4}>目次</Box>
      <ReactMarkdownHeading headingDepth={props.headingDepth ?? 2} markdown={props.markdown} hyperlink />
      <Badge colorScheme="red">※Markdownが正しくない場合は表示されません</Badge>
    </div>
  )
}

export default MarkdownToc