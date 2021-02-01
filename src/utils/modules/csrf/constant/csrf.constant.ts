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
  ignoredMethods:
    process.env.IS_PRODUCTION === `true`
      ? [`HEAD`, `OPTIONS`]
      : [`HEAD`, `OPTIONS`, `GET`, `POST`, `PUT`, `PATCH`],
  tokenKey: `XSRF-TOKEN`
};
