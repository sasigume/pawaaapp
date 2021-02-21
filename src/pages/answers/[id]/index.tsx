import Layout from '@/components/partials/layout'
import { Answer } from '@/models/Answer'
import { Comment } from '@/models/Comment'

type Props = {
  answer: Answer
  comment: Comment
}



export default function AnswersShow(props: Props) {
  return (
    <Layout preview={false} title={props.comment ? props.comment.body : 'LOADING'} desc={'回答の詳細ページ'}>
      <div className="my-8 justify-center">
        <div className="">
          <>
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
          </>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }:any) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`)
  const json = await res.json()
  return { props: json }
}