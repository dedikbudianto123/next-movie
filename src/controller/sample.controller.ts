import { NextApiRequest, NextApiResponse } from 'next';

import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import {
  NextAPICustom,
  NextAPIDelete,
  NextAPIGet,
  NextAPIPost,
  NextAPIPut
} from '@/utils/modules/next-api';

/**
 * Sample Controller Class
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
class SampleController {
  private static instance: SampleController;

  /**
   * GET Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @NextAPIGet()
  get(req: NextApiRequest, res: NextApiResponse): void {
    res.statusCode = 200;
    res.json({ method: req.method });
  }

  /**
   * POST Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @NextAPIPost()
  post(req: NextApiRequest, res: NextApiResponse): void {
    res.statusCode = 200;
    res.json({ method: req.method });
  }

  /**
   * DELETE Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @NextAPIDelete()
  delete(req: NextApiRequest, res: NextApiResponse): void {
    res.statusCode = 200;
    res.json({ method: req.method });
  }

  /**
   * Put Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @NextAPIPut()
  put(req: NextApiRequest, res: NextApiResponse): void {
    res.statusCode = 200;
    res.json({ method: req.method });
  }

  /**
   * Custom Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @NextAPICustom([`GET`, `POST`])
  custom(req: NextApiRequest, res: NextApiResponse): void {
    res.statusCode = 200;
    res.json({ method: req.method });
  }

  /**
   * Get Instance
   * @returns {SampleController}
   */
  public static getInstance(): SampleController {
    if (!VerifiedIsNotEmpty(SampleController.instance)) {
      SampleController.instance = new SampleController();
    }

    return SampleController.instance;
  }
}

export default SampleController;
