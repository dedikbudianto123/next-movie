import { NextApiHandler } from 'next';

import { cors } from '@/utils/modules/cors';
import { csrf } from '@/utils/modules/csrf';

/**
 * Handler API
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
const handler: NextApiHandler = async (req, res): Promise<void> => {
  await cors(req, res, {
    methods: [`GET`],
    origin: `http://localhost:3000`,
    optionsSuccessStatus: 200
  });

  res.statusCode = 200;
  res.json({ name: `John Doe` });
};

export default csrf(handler);
