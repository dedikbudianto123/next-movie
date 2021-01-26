import { NextApiHandler } from 'next';

/**
 * Next API Error 404
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
export const NextAPIError404: NextApiHandler = async (
  _,
  res
): Promise<void> => {
  res.statusCode = 404;
  res.json({ message: `Page not found`, status: 404 });
};
