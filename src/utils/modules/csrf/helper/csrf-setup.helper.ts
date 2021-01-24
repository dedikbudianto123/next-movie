import { serialize } from 'cookie';
import { sign } from 'cookie-signature';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse
} from 'next';

import { ICSRFSetupMiddleware } from '@/utils/modules/csrf/interface/csrf.interface';

import CSRFTokens from './csrf-tokens.helper';

/**
 * CSRF Setup API Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export const CSRFSetupAPIHelper = (
  handler: NextApiHandler,
  { cookieOptions, csrfSecret, secret, tokenKey }: ICSRFSetupMiddleware
): NextApiHandler => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const reqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
  const reqCsrfTokenSigned = sign(reqCsrfToken, secret);

  res.setHeader(
    `Set-Cookie`,
    serialize(tokenKey, reqCsrfTokenSigned, cookieOptions)
  );

  return handler(req as NextApiRequest, res as NextApiResponse);
};

/**
 * CSRF Setup Web Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export function CSRFSetupWebHelper<P>(
  handler: GetServerSideProps<P>,
  { cookieOptions, csrfSecret, secret, tokenKey }: ICSRFSetupMiddleware
): GetServerSideProps<P> {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const reqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
    const reqCsrfTokenSigned = sign(reqCsrfToken, secret);

    context.res.setHeader(
      `Set-Cookie`,
      serialize(tokenKey, reqCsrfTokenSigned, cookieOptions)
    );

    return handler(context);
  };
}
