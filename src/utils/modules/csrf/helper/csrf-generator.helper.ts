import { parse, serialize } from 'cookie';
import { sign, unsign } from 'cookie-signature';
import { NextApiHandler } from 'next';

import { ICSRFMiddleware } from '@/utils/modules/csrf/interface/csrf.interface';
import ErrorApps from '@/utils/modules/error';

import CSRFCookie from './csrf-cookie.helper';
import CSRFTokens, { getTokenHeader } from './csrf-tokens.helper';

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
    // 1. extract secret and token from their cookies
    const tokenFromCookie = CSRFCookie(req, tokenKey);
    const tokenFromCookieUnsigned = unsign(tokenFromCookie, secret);

    // If no token in cookie then we assume first request and proceed to setup CSRF mitigation
    if (!tokenFromCookie) {
      const reqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
      const reqCsrfTokenSigned = sign(reqCsrfToken, secret);

      res.setHeader(
        `Set-Cookie`,
        serialize(tokenKey, reqCsrfTokenSigned, cookieOptions)
      );
      return handler(req, res);
    }

    // Do nothing on if method is in `ignoreMethods`
    if (ignoredMethods.includes(req.method as string)) return handler(req, res);

    // 2. extract token from custom header
    const tokenFromHeaders = parse(<string>getTokenHeader(req, tokenKey));

    // We need the token in a custom header to verify Double-submit cookie pattern
    if (!tokenFromHeaders.length) throw new ErrorApps(403, csrfErrorMessage);

    const tokenFromHeadersUnsigned = unsign(
      <string>tokenFromHeaders[tokenKey],
      secret
    );

    // 3. verify signature
    if (!tokenFromCookieUnsigned || !tokenFromHeadersUnsigned) {
      throw new ErrorApps(403, csrfErrorMessage);
    }

    // 4. double-submit cookie pattern
    if (tokenFromCookieUnsigned !== tokenFromHeadersUnsigned) {
      throw new ErrorApps(403, csrfErrorMessage);
    }

    // 5. verify CSRF token
    if (!CSRFTokens.getInstance().verify(csrfSecret, tokenFromCookieUnsigned)) {
      throw new ErrorApps(403, csrfErrorMessage);
    }

    // 6. If everything is okay and verified, generate a new token and save it in the cookie
    const newReqCsrfToken = CSRFTokens.getInstance().create(csrfSecret);
    const newReqCsrfTokenSigned = sign(newReqCsrfToken, secret);

    res.setHeader(
      `Set-Cookie`,
      serialize(tokenKey, newReqCsrfTokenSigned, cookieOptions)
    );

    return handler(req, res);
  } catch (e) {
    return res.status(e.status ?? 500).json({ message: e.message });
  }
};

export default CSRFGenerator;
