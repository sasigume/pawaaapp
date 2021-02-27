import React, { useState, useEffect } from 'react'

import MarkdownRender from './MarkdownRender'
import cn from 'classnames'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import { useSpring, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    config: { mass:1, tension: 500, friction: 50 }
  })

  useEffect(()=>{
    setAppeared(state => !state)
  },[])

  return (
    <animated.div style={{ transform }} className={
      cn('w-80 bg-white inline-block my-4 p-4 pb-2 border-2 border-gray-200 rounded-xl shadow-xl',
        {
          'mr-4 md:mr-12': n % 2 == 0,
          'ml-4 md:ml-12': n % 2 !== 0,
        })}>
      <div className="mb-4 text-lg flex flex-col md:flex-row justify-between">
        <div className="w-full flex justify-between items-center">
          <div className="flex-col">
            <div>{post.mondaiName}</div>
            <div className="text-gray-600">{post.mondaiPage}</div>
          </div>

          <a onClick={addCount} className="cursor-pointer inline-block p-2 shadow-xl bg-blue-500 text-white rounded-xl">
            <div className="flex items-center">
              <div className="w-5 mr-2"><FontAwesomeIcon icon={['fas', 'thumbs-up']} /></div><div>{post.good + count}</div>
            </div>
          </a>
        </div>
      </div>
      <div className="text-xl">
        <MarkdownRender source={post.md} />
      </div>
    </animated.div >
  )
}

export default LandingPagePostComponent