import React, { useState, useEffect } from 'react'

import MarkdownRender from './MarkdownRender'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import { useSpring, animated } from 'react-spring'
import { Box, Button, Flex, Stack, useColorMode } from '@chakra-ui/react'
import FaiconDiv from './faicon-div'

interface Props {
  post: LandingPagePost
  n: number
}

function LandingPagePostComponent({ post, n }: Props) {

  const [count, setCount] = useState(0)

  const addCount = () => {
    setCount(count + 1)
  }

  const [appeared, setAppeared] = useState(false)
  const { transform } = useSpring({
    opacity: appeared ? 1 : 0,
    transform: `translate(${appeared ? 0 : 300}px, 0px)`,
    config: { mass: 1, tension: 500, friction: 50 }
  })

  useEffect(() => {
    setAppeared(state => !state)
  }, [])

  const { colorMode } = useColorMode()

  return (
    <Box pr={(n % 2 == 0) ? 12 : 0} pl={(n % 2 != 0) ? 12 : 0}>
      <Box p={4} rounded="xl" shadow="xl" color={colorMode == "light" ? "black" : "white"} background={colorMode == "light" ? "white" : "black"} as={animated.div}
        style={{ transform }}>
        <Flex mb={2}>
          <Stack mr={4}>
            <div>{post.mondaiName}</div>
            <div className="text-gray-600">{post.mondaiPage}</div>
          </Stack>

          <Button onClick={addCount} leftIcon={<FaiconDiv icon={['fas', 'thumbs-up']} />} colorScheme="blue">
            {post.good + count}
          </Button>
        </Flex>
        <div className="text-xl">
          <MarkdownRender source={post.md} />
        </div>
      </Box>
    </Box>
  )
}

export default LandingPagePostComponent