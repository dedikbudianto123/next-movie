import { NextApiHandler } from 'next';

import { csrf, csrfToken } from '@/utils/modules/csrf';

/**
 * Handler API
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
const handler: NextApiHandler = (_, res): void => {
  res.statusCode = 200;
  res.json({ name: `John Doe`, csrfToken });
};

export default csrf(handler);
