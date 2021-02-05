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

import { ICSRFSetupMiddleware } from '@/library/modules/csrf/interface/csrf.interface';

import CSRFTokens from './csrf-tokens.helper';

/**
 * CSRF Setup API Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export const GenerateRefreshTokenHelper = ({
  cookieOptions,
  csrfSecret,
  secret,
  tokenKey
}: ICSRFSetupMiddleware): string => {
  const reqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
  const reqCsrfTokenSigned = sign(reqCsrfToken, secret);

  return serialize(tokenKey, reqCsrfTokenSigned, cookieOptions);
};

/**
 * CSRF Setup API Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export const CSRFSetupAPIHelper = (
  handler: NextApiHandler,
  config: ICSRFSetupMiddleware
): NextApiHandler => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.setHeader(`Set-Cookie`, GenerateRefreshTokenHelper(config));

  return handler(req as NextApiRequest, res as NextApiResponse);
};

/**
 * CSRF Setup Web Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export function CSRFSetupWebHelper<P>(
  handler: GetServerSideProps<P>,
  config: ICSRFSetupMiddleware
): GetServerSideProps<P> {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    context.res.setHeader(`Set-Cookie`, GenerateRefreshTokenHelper(config));

    return handler(context);
  };
}
