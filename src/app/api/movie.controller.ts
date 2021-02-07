import { NextApiRequest, NextApiResponse } from 'next';

import {
  BulkVerifiedIsNotEmpty,
  BulkVerifiedIsNotNull,
  VerifiedIsNotEmpty
} from '@/library/helper';
import { UseCors } from '@/library/modules/cors';
import { UseCSRF } from '@/library/modules/csrf';
import { ErrorApps } from '@/library/modules/error';
import { SingletonLogger } from '@/library/modules/error/helper/singleton-logger.helper';
import { NextAPIGet } from '@/library/modules/next-api';
import {
  NextAPIPromiseCatchErrorHandler,
  NextAPIResponse
} from '@/library/modules/next-api/helper';
import MovieRepositoryImplementation from '@/library/repository/rest-api/movie';

/**
 * Movie Controller Class
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
    const formattedPage = parseInt(`${page}`, 10);

    if (BulkVerifiedIsNotEmpty([keyword, page]) && formattedPage > 0) {
      instance
        .getMovieList(keyword as string, parseInt(`${page}`, 10))
        .then(NextAPIResponse(req, res))
        .catch(NextAPIPromiseCatchErrorHandler(req, res));
    } else if (formattedPage <= 0) {
      SingletonLogger.getInstance().info(
        `Page param is not number or page lower than 0`
      );
      throw new ErrorApps(500, `Page param is not number or page lower than 0`);
    } else {
      throw new ErrorApps(500, `Keyword / page not found`);
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
  getMovieDetail(req: NextApiRequest, res: NextApiResponse): void {
    const {
      query: { id }
    } = req;
    const instance = MovieRepositoryImplementation.singleton();

    if (BulkVerifiedIsNotNull([id])) {
      instance
        .getMovieDetail(id as string)
        .then(NextAPIResponse(req, res))
        .catch(NextAPIPromiseCatchErrorHandler(req, res));
    } else {
      throw new ErrorApps(500, `Movie ID not found`);
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
