import { Platform } from '@/models/contentful/Platform'
import LinkChakra from '@/components/common/link-chakra'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { Button, Stack } from '@chakra-ui/react'
import FaiconDiv from '@/components/common/faicon-div'

interface Props {
  platform: Platform
}

interface ListProps {
  platforms: Platform[]
}

const OnePlatform = ({ platform }: Props) => {

  let iconStyle, iconName

  if (platform.icon) {
    iconStyle = platform.icon.style
    iconName = platform.icon.name
  } else {
    iconStyle = "fas" as IconPrefix
    iconName = "question" as IconName
  }

  return (
    <Button mb={2} href={(`/platforms/${platform.slug}`)} colorScheme={platform.bgColor ?? "green"} as={LinkChakra} leftIcon={<FaiconDiv icon={[iconStyle, iconName]} />}>
      {platform.displayName}
    </Button>
  )
}

const PlatformList = ({ platforms }: ListProps) => {
  return (
    <Stack maxW="100vw" direction="column" mb={4}>
      {platforms.map((s: Platform) => <OnePlatform platform={s} key={s.slug} />)}
    </Stack>
  )
}

export default PlatformList