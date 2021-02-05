import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { ErrorAdapter, ErrorApps } from '@/library/modules/error';
import { IErrorApps } from '@/library/modules/error/interface/error.interface';

/**
 * Generate Error API Response
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
const GenerateErrorAPIResponse = (error: IErrorApps): NextApiHandler => (
  _,
  res
) => {
  res.statusCode = error.code;
  res.json(error);
};

/**
 * Next API Error 404
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
export const NextAPIError404: NextApiHandler = GenerateErrorAPIResponse(
  ErrorAdapter(new ErrorApps(404, `Page not found`))
);

/**
 * Next API Catch Error Handler
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
export const NextAPICatchErrorHandler = (e: any): NextApiHandler =>
  GenerateErrorAPIResponse(ErrorAdapter(e));

/**
 * Next API Promise Catch Error Handler
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
export const NextAPIPromiseCatchErrorHandler = (
  _: NextApiRequest,
  res: NextApiResponse
) => (e) => {
  const error = ErrorAdapter(e);

  res.statusCode = error.code;
  res.json(error);
};
