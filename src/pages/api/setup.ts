import { setupAPI } from '@/library/modules/csrf';

/**
 * Sample Setup API
 * @param {NextApiRequest} req - request api
 * @param {NextApiResponse} res - response api
 * @returns {void}
 */
const handler = (_, res) => {
  res.statusCode = 200;
  res.json({ message: `CSRF token added to cookies` });
};

export default setupAPI(handler);
