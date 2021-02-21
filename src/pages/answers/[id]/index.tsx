import Head from 'next/head'
import Layout from '@/components/partials/layout'
import { Answer } from '@/models/Answer'
import { Comment } from '@/models/Comment'

type Props = {
  answer: Answer
  comment: Comment
}

function getDescription(answer: Answer) {
  const body = answer.body.trim().replace(/[ \r\n]/g, '')
  if (body.length < 140) {
    return body
  }
  return body.substring(0, 140) + '...'
}

export default function AnswersShow(props: Props) {
  const description = getDescription(props.answer)
  const ogpImageUrl = `${process.env.WEB_URL}/api/answers/${props.answer.id}/ogp`

  return (
    <Layout preview={false} title={props.answer ? props.answer.body : 'LOADING'} desc={"回答です"}>
      <Head>
        <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
        <meta name="description" key="description" content={description} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
      </Head>
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