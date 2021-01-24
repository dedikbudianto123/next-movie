import { CookieSerializeOptions } from 'cookie';
import { NextApiHandler } from 'next';

/**
 * CSRF Options Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFOptions {
  secret: string;
  ignoredMethods?: string[];
  csrfErrorMessage?: string;
  tokenKey?: string;
  cookieOptions?: CookieSerializeOptions;
}

/**
 * CSRF Middleware
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFMiddleware extends Pick<ICSRFOptions, 'secret'> {
  csrfErrorMessage: string;
  ignoredMethods: string[];
  csrfSecret: string;
  tokenKey: string;
  cookieOptions: CookieSerializeOptions;
}

/**
 * CSRF Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFBuilder {
  csrfToken: string;
  csrf: (handler: NextApiHandler) => NextApiHandler<any>;
}
