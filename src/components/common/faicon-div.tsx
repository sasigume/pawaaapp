import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Box } from "@chakra-ui/react"

interface Props {
  icon: IconProp
  color?: string
}
const FaiconDiv = ({icon,color}:Props) => (
  <Box w={4} color={color ?? ''}><FontAwesomeIcon icon={icon} /></Box>
)

export default FaiconDiv