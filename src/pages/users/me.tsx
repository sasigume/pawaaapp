import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import TweetButton from '@/components/common/tweet-button'
import Container from '@/components/common/container'

export default function UsersMe() {
  const { user } = useAuthentication()

  if (user === null) {
    return (
      <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        <div className="my-16">
        ログインしていません
        </div>
      </Container>
    </Layout>
    )
  }

  const url = `${process.env.HTTPS_URL}/users/${user.uid}`

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        <div className="my-8">
        <h1 className="text-4xl mb-8">マイページ</h1>
        <div className="my-16">ログイン中: {user.name}さん</div>
        <p>ツイートして質問してもらおう！(このページのURLは関係ありません)
        </p>
        <div className="flex flex-col items-center justify-center">
          <TweetButton url={url} text={'質問してね！'} />
        </div>
        </div>
      </Container>
    </Layout>
  )
}