import { NextApiRequest, NextApiResponse } from 'next';

import { INextAPIResponse } from '@/library/modules/next-api/interface';

/**
 * Generate API Response APO
 * @param {T} data - response api
 * @returns {INextAPIResponse<T>}
 */
export function GenerateAPIResponse<T>(data: T): INextAPIResponse<T> {
  return {
    code: 200,
    data,
    message: `ok`
  };
}

/**
 * Next API Response
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {() => void}
 */
export function NextAPIResponse<T>(_: NextApiRequest, res: NextApiResponse) {
  return (data: T): void => {
    const response = GenerateAPIResponse<T>(data);

    res.statusCode = 200;
    res.json(response);
  };
}
