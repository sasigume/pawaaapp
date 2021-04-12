import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, ColorMode, Container, HStack, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import DrawerLeft from './drawer-left';
import SiteLogo from '@/components/common/SiteLogo';
import PostList from '../../post';
import { Post } from '@/models/contentful/Post';
import LinkChakra from '@/components/common/link-chakra';
import FaiconDiv from '@/components/common/faicon-div';
import { CREATOR_ID } from '@/lib/constants';
import { NAV_HEIGHT } from '@/lib/chakra/styles';
import ColorSwitch from '../color-switch';
const SignIn = dynamic(() => import('./drawer-left/signin'), { ssr: false });

interface NavProps {
  preview: boolean;
  drawerLeftChildren?: ReactNode;
  posts?: Post[];
  colorMode: ColorMode;
  maxW: number;
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
      let visible = prevScrollpos > currentScrollPos;
      if (currentScrollPos == 0) {
        visible = true;
      }

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
          h={`${NAV_HEIGHT}px`}
          as="nav"
          py={2}
          shadow="lg"
          position="fixed"
          className={this.state.visible ? 'translateY' : 'translateY hidden'}
        >
          <Container maxW={`${this.props.maxW}px`} px={0}>
            <HStack>
              <Box mr={4} w={{ base: 'auto', xl: 0 }} display={{ base: 'flex', lg: 'none' }}>
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

              <ColorSwitch />

              <Spacer />

              <HStack display={{ base: 'none', md: 'inline-block' }}>
                <Button
                  isExternal
                  leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}
                  as={LinkChakra}
                  href={`https://twitter.com/${CREATOR_ID}`}
                >
                  Twitter
                </Button>
                <Button
                  leftIcon={<FaiconDiv icon={['fas', 'book']} />}
                  as={LinkChakra}
                  href="/eula/"
                >
                  利用規約
                </Button>
              </HStack>

              <Box pl={4} pr={3}>
                <SignIn />
              </Box>
            </HStack>
          </Container>
        </Box>
      </Box>
    );
  }
}
