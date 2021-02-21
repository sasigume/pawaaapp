import Layout from '@/components/partials/layout'
import TwitterShareButton from '@/components/common/tweet-button'
import { useAuthentication } from '../../hooks/authentication'
import {useRouter} from 'next/router'
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
        <h1 className="">マイページ</h1>
        <p>このページをツイートして質問してもらおう！</p>
        <div className="d-flex justify-content-center">
          <TweetButton url={url} text={'質問してね！'} />
        </div>
      </Container>
    </Layout>
  )
}