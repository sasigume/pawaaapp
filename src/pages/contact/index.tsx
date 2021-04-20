//import dynamic from 'next/dynamic';
import Layout from '@/components/layout';
import { useAuthentication } from '../../hooks/authentication';
import firebase from 'firebase/app';
import { Box, Heading, ButtonGroup, Stack } from '@chakra-ui/react';
import {
  InputControl,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
  TextareaControl,
} from 'formik-chakra-ui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as gtag from '@/lib/gtag';

import { useState } from 'react';

export default function UsersMe() {
  const { user } = useAuthentication();
  const [didYouSend, setSended] = useState(false);

  const validationSchema = Yup.object({
    content: Yup.string().required(`内容を入力してください。`),
    replyMail: Yup.string().email('メールアドレスの形式をご確認ください。'),
    agreed: Yup.boolean().required(),
  });

  return (
    <Layout
      preview={false}
      meta={{ title: 'お問い合わせ', desc: 'お問い合わせページ' }}
      hideAdsense={true}
    >
      <Box>
        <Heading as="h1" mb={6} fontStyle="h1">
          お問い合わせ
        </Heading>
      </Box>

      <Box mb={8}>
        <Formik
          initialValues={{
            content: '',
            replayMail: '',
            agreed: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (typeof window !== 'undefined') {
              gtag.event({
                action: 'contactSend',
                category: 'contact',
                label: 'お問い合わせの送信',
              });
            }
            setTimeout(() => {
              firebase
                .firestore()
                .collection('contacts')
                .add({
                  replayEmail: values.replayMail != '' ? values.replayMail : 'メール指定なし',
                  body: values.content,
                  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                  setSended(true);
                });
            }, 1000);
          }}
        >
          {({ handleSubmit, values }) => (
            <>
              <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                {!didYouSend ? (
                  <>
                    <InputControl
                      area-label="返信用メールアドレスを入力"
                      label="返信用メールアドレス(任意)"
                      placeholder="もし返信を希望される場合は、メールアドレスをご記入ください。"
                      mb={4}
                      name="replyMail"
                    />
                    <TextareaControl
                      label="お問い合わせ内容"
                      area-label="内容を入力"
                      mb={4}
                      name="content"
                    />

                    <CheckboxSingleControl mt={2} name="agreed">
                      利用規約に同意しました
                    </CheckboxSingleControl>
                    <ButtonGroup>
                      {values.agreed && <SubmitButton>お問い合わせを送信</SubmitButton>}
                      <ResetButton>リセット</ResetButton>
                    </ButtonGroup>
                  </>
                ) : (
                  <>
                    <Box>お問い合わせありがとうございました。</Box>
                    {values.replayMail && (
                      <Box>返信にお時間をいただくかもしれませんが、ご了承ください。</Box>
                    )}
                  </>
                )}
              </Stack>
            </>
          )}
        </Formik>
      </Box>
    </Layout>
  );
}
