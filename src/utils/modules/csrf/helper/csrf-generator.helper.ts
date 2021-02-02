import { serialize } from 'cookie';
import { sign, unsign } from 'cookie-signature';
import { NextApiHandler } from 'next';

import { ICSRFMiddleware } from '@/utils/modules/csrf/interface/csrf.interface';
import { ErrorApps } from '@/utils/modules/error';
import { NextAPICatchErrorHandler } from '@/utils/modules/next-api/helper/next-api-error.helper';

import CSRFCookie from './csrf-cookie.helper';
import CSRFTokens from './csrf-tokens.helper';

/**
 * CSRF Generator
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
const CSRFGenerator = (
  handler: NextApiHandler,
  {
    cookieOptions,
    csrfErrorMessage,
    csrfSecret,
    ignoredMethods,
    secret,
    tokenKey
  }: ICSRFMiddleware
): NextApiHandler => async (req, res) => {
  try {
    // Do nothing on if method is in `ignoreMethods`
    if (ignoredMethods.includes(req.method as string)) return handler(req, res);

    // 1. extract secret and token from their cookies
    const tokenFromCookie = CSRFCookie(req, tokenKey);
    const tokenFromCookieUnsigned = unsign(tokenFromCookie, secret);

    if (!tokenFromCookieUnsigned) {
      throw new ErrorApps(403, `cookies not available`);
    }

    // verify CSRF token
    if (!CSRFTokens.getInstance().verify(csrfSecret, tokenFromCookieUnsigned)) {
      throw new ErrorApps(403, csrfErrorMessage);
    }

    // If everything is okay and verified, generate a new token and save it in the cookie
    const newReqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
    const newReqCsrfTokenSigned = sign(newReqCsrfToken, secret);

    res.setHeader(
      `Set-Cookie`,
      serialize(tokenKey, newReqCsrfTokenSigned, cookieOptions)
    );

    return handler(req, res);
  } catch (e) {
    return NextAPICatchErrorHandler(e)(req, res);
  }
};

export default CSRFGenerator;
