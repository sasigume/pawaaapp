import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Box, ColorMode, HStack, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import DrawerLeft from './drawer-left';
import SiteLogo from '@/components/common/SiteLogo';
import PostList from '../../post';
import { Post } from '@/models/contentful/Post';
import { SITE_DESC } from '@/lib/constants';
const SignIn = dynamic(() => import('./drawer-left/signin'), { ssr: false });

interface NavProps {
  preview: boolean;
  drawerLeftChildren?: ReactNode;
  posts?: Post[];
  colorMode: ColorMode;
  text?: string;
}

// https://dev.to/guimg/hide-menu-when-scrolling-in-reactjs-47bj

export default class Nav extends Component<NavProps, { prevScrollpos: number; visible: boolean }> {
  constructor(props: any) {
    super(props);
    if (typeof window !== 'undefined') {
      this.state = {
        prevScrollpos: window.pageYOffset,
        visible: true,
      };
    } else {
      this.state = {
        prevScrollpos: 0,
        visible: true,
      };
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  // Hide menu when scroll
  handleScroll = () => {
    if (typeof window !== 'undefined') {
      const { prevScrollpos } = this.state;

      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;

      this.setState({
        prevScrollpos: currentScrollPos,
        visible,
      });
    }
  };

  render() {
    return (
      <Box
        sx={{
          '.translateY': {
            transform: 'translateY(0)',
            transitionProperty: 'transform',
            transitionDuration: '.3s',
          },
          '.hidden': {
            transform: 'translateY(-100%)',
          },
        }}
      >
        <Box
          zIndex={30}
          bg={this.props.colorMode == 'light' ? 'white' : 'blackAlpha.800'}
          w="100vw"
          h="56px"
          as="nav"
          px={{ base: 2, md: 6 }}
          py={2}
          shadow="lg"
          position="fixed"
          className={this.state.visible ? 'translateY' : 'translateY hidden'}
        >
          <HStack>
            <Box w={{ base: 'auto', xl: 0 }} display={{ base: 'flex', lg: 'none' }}>
              <DrawerLeft preview={this.props.preview}>
                <>
                  {this.props.drawerLeftChildren}
                  {this.props.posts && this.props.posts.length > 0 && (
                    <Box mt={8}>
                      <PostList mode="drawer" posts={this.props.posts} />
                    </Box>
                  )}
                </>
              </DrawerLeft>
            </Box>
            <SiteLogo display={{ base: 'none', md: 'inline-block' }} />
            <Box
              overflow="hidden"
              isTruncated
              fontWeight="bold"
              display={{ base: 'none', md: 'block' }}
              borderLeftWidth={2}
              borderLeftColor="gray.400"
              style={{ transform: 'skew(-10deg)' }}
              pl={4}
            >
              {this.props.text ?? SITE_DESC}
            </Box>
            <Spacer />

            <Box pl={4}>
              <SignIn />
            </Box>
          </HStack>
        </Box>
      </Box>
    );
  }
}
