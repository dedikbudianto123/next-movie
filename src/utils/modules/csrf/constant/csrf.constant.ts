import { ICSRFMiddleware } from '@/utils/modules/csrf/interface/csrf.interface';

export const CSRF_DEFAULT_OPTIONS: Omit<
  ICSRFMiddleware,
  'secret' | 'csrfSecret'
> = {
  cookieOptions: {
    httpOnly: true,
    path: `/`,
    secure: process.env.IS_PRODUCTION === `true`
  },
  csrfErrorMessage: `Invalid CSRF token`,
  ignoredMethods: [`GET`, `HEAD`, `OPTIONS`],
  tokenKey: `XSRF-TOKEN`
};
