import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconProp
}
const FaiconDiv = ({icon}:Props) => (
  <div className="w-4"><FontAwesomeIcon icon={icon} /></div>
)

export default FaiconDiv