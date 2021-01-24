import CSRFBuilder from './builder/csrf.builder';

const { csrf: handler, csrfToken: token } = CSRFBuilder.singleton({
  secret: `a7206c3a-8643-48f0-ab2a-2b70053157ce`
});

export const csrfToken = token;
export const csrf = handler;
