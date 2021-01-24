import { CookieSerializeOptions } from 'cookie';
import { GetServerSideProps, NextApiHandler } from 'next';

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
 * CSRF Setup Middleware
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export type ICSRFSetupMiddleware = Pick<
  ICSRFMiddleware,
  'csrfSecret' | 'secret' | 'tokenKey' | 'cookieOptions'
>;

/**
 * CSRF Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFBuilder {
  csrfToken: string;
  setupAPI(handler: NextApiHandler): NextApiHandler;
  setupWeb(handler: GetServerSideProps<any>): GetServerSideProps<any>;
  csrf(handler: NextApiHandler): NextApiHandler<any>;
}
