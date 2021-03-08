import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import { Button, Container } from '@chakra-ui/react'
import { BreakpointContainer } from '@/components/common/breakpoint-container'

export default function UsersMe() {
  const { user } = useAuthentication()

  if (user === null) {
    return (
      <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
        <Container>
          <div className="my-16">
            サインインしていません
        </div>
        </Container>
      </Layout>
    )
  }

  const url = `${process.env.HTTPS_URL}/users/${user.uid}`

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        <BreakpointContainer>
          <div className="my-8">
            <h1 className="text-4xl mb-8">マイページ</h1>
            <div className="my-16">サインイン中: {user.name}さん (お問い合わせID: {user.uid})</div>
          </div>
        </BreakpointContainer>
      </Container>
    </Layout>
  )
}