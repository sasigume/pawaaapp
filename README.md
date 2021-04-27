# このフォルダについて

Next.js 版クライアントです。Vercel にデプロイすることを前提にしています

## フォルダ構成

`src`以下にまとめています

- components
  - common: ページ関係なく使い回すもの
  - partials: レイアウトのためのパーツ
  - providers: Chakra UI のカラーテーマ切り替え用
- hooks: 認証用
- lib: 後ろの処理(API サーバーに分離できなかったもの)
- models: 型の定義
- pages: ページ
- styles: CSS モジュール

## Contentful について

`lib/contentful/graphql/`に全てまとめています。

QraphQL なので指定したフィールドしか返ってきません。ご注意ください。

## Thanks

### Adsense

https://b.0218.jp/202104021830.html

### Google Analytics

https://sunday-morning.app/posts/2020-12-09-nextjs-google-analytics

### GraphQL + Contentful

https://github.com/vercel/next.js/tree/canary/examples/cms-contentful

### Firebase auth

https://qiita.com/y-shida1997/items/f5e52c7288813a8184ff

### OGP

https://qiita.com/cheez921/items/39ae1ad2c38e5829b89c

### RSS and Sitemap

https://zenn.dev/catnose99/articles/c7754ba6e4adac

https://zenn.dev/catnose99/articles/c441954a987c24
