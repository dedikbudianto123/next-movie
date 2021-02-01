import { NextApiRequest, NextApiResponse } from 'next';

import { DEFAULT_PAGINATION } from '@/utils/constant/pagination.contant';
import {
  BulkVerifiedIsNotNull,
  VerifiedIsNotEmpty
} from '@/utils/helper/validator.helper';
import { UseCors } from '@/utils/modules/cors';
import { UseCSRF } from '@/utils/modules/csrf';
import { ErrorApps } from '@/utils/modules/error';
import { NextAPIGet } from '@/utils/modules/next-api';
import MovieRepositoryImplementation from '@/utils/repository/rest-api/movie';

/**
 * Sample Controller Class
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
class MovieController {
  private static instance: MovieController;

  /**
   * GET Movie List Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @UseCSRF
  @UseCors()
  @NextAPIGet()
  getMovieList(req: NextApiRequest, res: NextApiResponse): void {
    const instance = MovieRepositoryImplementation.singleton();
    const {
      query: { keyword, page }
    } = req;

    if (BulkVerifiedIsNotNull([keyword, page])) {
      instance
        .getMovieList(keyword as string, parseInt(`${page}`, 10))
        .then((item) => {
          res.statusCode = 200;
          res.json(item);
        })
        .catch((e) => {
          res.statusCode = 500;

          if (e instanceof Error) {
            res.json({ message: e.message });
          } else if (e instanceof ErrorApps) {
            res.json({ message: e.message });
          } else {
            res.json({ message: `unknown error` });
          }
        });
    } else {
      res.statusCode = 500;
      res.send({
        item: [],
        pagination: DEFAULT_PAGINATION
      });
    }
  }

  /**
   * GET Movie Detail Request
   * @param {NextApiRequest} req - request api
   * @param {NextApiResponse} res - response api
   * @returns {void}
   */
  @UseCSRF
  @UseCors()
  @NextAPIGet()
  getMovieDetail(
    { query: { id } }: NextApiRequest,
    res: NextApiResponse
  ): void {
    const instance = MovieRepositoryImplementation.singleton();

    if (BulkVerifiedIsNotNull([id])) {
      instance
        .getMovieDetail(id as string)
        .then((item) => {
          res.statusCode = 200;
          res.json(item);
        })
        .catch((e) => {
          res.statusCode = 500;

          if (e instanceof Error) {
            res.json({ message: e.message });
          } else if (e instanceof ErrorApps) {
            res.json({ message: e.message });
          } else {
            res.json({ message: `unknown error` });
          }
        });
    } else {
      res.statusCode = 500;
      res.send(null);
    }
  }

  /**
   * Get Instance
   * @returns {MovieController}
   */
  public static getInstance(): MovieController {
    if (!VerifiedIsNotEmpty(MovieController.instance)) {
      MovieController.instance = new MovieController();
    }

    return MovieController.instance;
  }
}

export default MovieController;
