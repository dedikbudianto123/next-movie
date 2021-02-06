import { CookieSerializeOptions } from 'cookie';
import { GetServerSideProps, NextApiHandler } from 'next';

/**
 * CSRF Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFBuilder {
  csrf(handler: NextApiHandler): NextApiHandler<any>;
  csrfDecorator: MethodDecorator;
  csrfToken: string;
  setupAPI(handler: NextApiHandler): NextApiHandler;
  setupWeb(handler: GetServerSideProps<any>): GetServerSideProps<any>;
}

/**
 * CSRF Middleware
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFMiddleware extends Pick<ICSRFOptions, 'secret'> {
  cookieOptions: CookieSerializeOptions;
  csrfErrorMessage: string;
  csrfSecret: string;
  ignoredMethods: string[];
  tokenKey: string;
}

/**
 * CSRF Options Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface ICSRFOptions {
  cookieOptions?: CookieSerializeOptions;
  csrfErrorMessage?: string;
  ignoredMethods?: string[];
  secret: string;
  tokenKey?: string;
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
