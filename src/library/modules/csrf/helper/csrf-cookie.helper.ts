import { parse } from 'cookie';
import { NextApiRequest } from 'next';

import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';

/**
 * CSRF Cookie
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {NextApiRequest} req - next api request
 * @param {string} name - cookies name
 * @since 2021.01.24
 */
export const CSRFCookie = (
  { headers: { cookie } }: NextApiRequest,
  name: string
): string => {
  if (VerifiedIsNotEmpty(cookie)) {
    const parsedCookie = parse(cookie);
    return parsedCookie[name];
  }

  return ``;
};

export default CSRFCookie;
