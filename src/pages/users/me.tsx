import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { BreakpointContainer } from '@/components/common/breakpoint-container'

export default function UsersMe() {
  const { user } = useAuthentication()

  if (user === null) {
    return (
      <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
        <BreakpointContainer>
          <Box py={16}>
            <Heading as="h1" fontStyle="h1">マイページ</Heading>
            <Box>サインインしていません</Box>
          </Box>
        </BreakpointContainer>
      </Layout>
    )
  }

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        <BreakpointContainer>
          <Box py={16}>
            <Heading as="h1" fontStyle="h1">マイページ</Heading>
            <Box>サインイン中: {user.name}さん</Box>
            <Box>(お問い合わせID: {user.uid})</Box>
          </Box>
        </BreakpointContainer>
      </Container>
    </Layout>
  )
}