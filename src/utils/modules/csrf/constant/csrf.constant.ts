import { ICSRFMiddleware } from '@/utils/modules/csrf/interface/csrf.interface';

export const CSRF_DEFAULT_OPTIONS: Omit<
  ICSRFMiddleware,
  'secret' | 'csrfSecret'
> = {
  tokenKey: `XSRF-TOKEN`,
  csrfErrorMessage: `Invalid CSRF token`,
  cookieOptions: {
    httpOnly: true,
    path: `/`,
    secure: process.env.IS_PRODUCTION === `true`
  },
  ignoredMethods: [`GET`, `HEAD`, `OPTIONS`]
};
