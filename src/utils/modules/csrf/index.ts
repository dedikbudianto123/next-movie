import CSRFBuilder from './builder/csrf.builder';

const {
  csrf: handler,
  csrfToken: token,
  setupAPI: api,
  setupWeb: web
} = CSRFBuilder.singleton({
  secret: process.env.CSRF_SECRET
});

export const csrfToken = token;
export const csrf = handler;
export const setupAPI = api;
export const setupWeb = web;
