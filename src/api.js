// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches : string[] , body: Object.<string, *> | undefined) => Promise<APIResponse>} callback
 */

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**@type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'first',
    content: 'content',
  },
  {
    id: 'my_seconde_post',
    title: 'my second post!',
    content: '그러쿤',
  },
];

/**
 * post
 * GET /posts
 * GEt /posts/:id
 * POST /posts
 */

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: posts,
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: {},
    }),
  },
];

module.exports = {
  routes,
};

//자바스크립트에서는 각 파일이 다 모듈
// 내보내고 싶은 로직
