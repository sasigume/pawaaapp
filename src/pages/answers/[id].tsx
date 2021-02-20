import Layout from '@/components/partials/layout'
import { Answer } from '@/models/Answer'
import { Comment } from '@/models/Comment'

type Props = {
  answer: Answer
  comment: Comment
}

export default function AnswersShow(props: Props) {
  return (
    <Layout preview={false} title={props.answer ? props.answer.body : 'LOADING'} desc={"回答です"}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <>
            <div className="card">
            <h2 className="h4">質問</h2>
              <div className="card-body">{props.comment.body}</div>
            </div>

            <section className="text-center mt-4">
              <h2 className="h4">回答</h2>

              <div className="card">
                <div className="card-body text-left">{props.answer.body}</div>
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