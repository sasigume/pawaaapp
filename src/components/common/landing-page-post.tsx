import React, { useState, useEffect } from 'react'

import MarkdownRender from './MarkdownRender'
import cn from 'classnames'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import { useSpring, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
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

  return (
    <animated.div>
      <Box my={4} p={4} border="solid" background="white" borderColor="gray.300" rounded="xl" shadow="xl"
        style={{ transform }} className={
          cn({
            'mr-4 md:mr-12': n % 2 == 0,
            'ml-4 md:ml-12': n % 2 !== 0,
          })}>
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

    </animated.div >
  )
}

export default LandingPagePostComponent