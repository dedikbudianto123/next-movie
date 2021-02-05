import CSRFBuilder from './builder/csrf.builder';

const {
  csrf: handler,
  csrfDecorator: decorator,
  csrfToken: token,
  setupAPI: api,
  setupWeb: web
} = CSRFBuilder.singleton({
  secret: process.env.CSRF_SECRET
});

export const csrfToken = token;
export const csrf = handler;
export const UseCSRF = decorator;
export const setupAPI = api;
export const setupWeb = web;
