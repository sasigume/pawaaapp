import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import { Answer } from '@/models/Answer'
import { Comment } from '@/models/Comment'
import TweetButton from '@/components/common/tweet-button'
import { useAuthentication } from '@/hooks/authentication'

interface Props {
  answer: Answer
  comment: Comment
}

export default function AnswersShow(props: Props) {
  const {user}=useAuthentication()

  if(user == null){
    return (
      <Layout preview={false} title={props.comment ? props.comment.body : '(質問が見つかりませんでした)'} desc={'回答の詳細ページ'}>
        <Container>ログインしてください。</Container>
      </Layout>
    )
  } else return (
    <Layout preview={false} title={props.comment ? props.comment.body : '(質問が見つかりませんでした)'} desc={'回答の詳細ページ'}>
      <Container>
        
        <div className="flex flex-col items-center my-16">
          <div className="">
            <h2 className="">質問</h2>
            <div className="">{props.comment.body}</div>
          </div>

          <section className="text-center mt-4">
            <h2 className="">回答</h2>

            <div className="">
              <div className="text-left">{props.answer.body}</div>
            </div>
          </section>

          <TweetButton url={process.env.HTTPS_URL + '/answers/' + props.answer.id} text={props.answer.body} />
          
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ query }: any) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`)
  const json = await res.json()
  return { props: json }
}