import { setupAPI } from '@/utils/modules/csrf';

/**
 *
 * @param req
 * @param res
 */
const handler = (req, res) => {
  res.statusCode = 200;
  res.json({ message: `CSRF token added to cookies` });
};

export default setupAPI(handler);
