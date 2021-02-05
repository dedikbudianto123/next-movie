import Tokens from 'csrf';
import { NextApiRequest } from 'next';

import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';

/**
 * CSRF Tokens Instance Singleton
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
class CSRFTokens {
  private static tokens: Tokens | undefined;

  /**
   * Get Instance
   * @returns {Tokens}
   */
  public static getInstance(): Tokens {
    if (!VerifiedIsNotEmpty(CSRFTokens.tokens)) {
      CSRFTokens.tokens = new Tokens();
    }

    return CSRFTokens.tokens;
  }
}

/**
 * Get Token From Header
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {NextApiRequest} req - next api request
 * @param {string} name - headers name
 * @returns {string | string[]}
 * @since 2021.01.24
 */
export const getTokenHeader = (
  { headers }: NextApiRequest,
  tokenKey: string
): string | string[] => {
  if (VerifiedIsNotEmpty(headers)) {
    return headers[tokenKey.toLocaleLowerCase()] || ``;
  }

  return ``;
};

export default CSRFTokens;
