import { Platform } from '@/models/contentful/Platform'
import LinkChakra from '@/components/common/link-chakra'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { Box, Button, Stack } from '@chakra-ui/react'
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
    <Button mr={2} w={{ base: "45%", sm: "auto" }} fontSize={{ base: "0.8rem", sm: "1rem" }} mb={2} href={(`/platforms/${platform.slug}`)} colorScheme={platform.bgColor ?? "green"} as={LinkChakra} leftIcon={<FaiconDiv icon={[iconStyle, iconName]} />}>
      <Box>{platform.displayName}</Box>
    </Button>
  )
}

const PlatformList = ({ platforms }: ListProps) => {
  return (
    <Stack flexWrap="wrap" direction="row" mb={4}>
      <Box>{platforms.map((s: Platform) => <OnePlatform platform={s} key={s.slug} />)}</Box>
    </Stack>
  )
}

export default PlatformList