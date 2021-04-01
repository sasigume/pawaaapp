export const PLATFORM_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
displayName
description
slug
bgColor
icon {
  name
  style
}
`;

export const PERSON_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
displayName
description
slug
picture {
  url
}
`;

/* -------------------------------------------

bodyをたらい回ししたくなくてこうなってるんですが
もはやPostBaseとPostの違いがbody/hideAdsenseだけなのは非効率なので
近いうちに直します

--------------------------------------------- */
export const POSTFORRSS_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
title
slug
publishDate
person {
  ${PERSON_GRAPHQL_FIELDS}
}
description
`;

export const POSTBASE_GRAPHQL_FIELDS =
  POSTFORRSS_GRAPHQL_FIELDS +
  `
heroImage {
  url
}
platformsCollection(limit: 5) {
  items {
    ${PLATFORM_GRAPHQL_FIELDS}
  }
}
`;

export const POST_GRAPHQL_FIELDS =
  POSTBASE_GRAPHQL_FIELDS +
  `
body
hideAdsense`;
