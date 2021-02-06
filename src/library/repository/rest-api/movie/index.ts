import {
  BulkVerifiedIsNotNull,
  VerifiedIsNotEmpty
} from '@/library/helper/validator.helper';
import { IRootObjectDetailAPIResponse } from '@/library/interface/generated/detail-api.interface';
import { IRootObjectAPIErrorResponse } from '@/library/interface/generated/error-api.interface';
import { IRootObjectListAPIResponse } from '@/library/interface/generated/list-api.interface';
import { MovieDetailAPIAdapter } from '@/library/model/movie/adapter/movie-detail.adapter';
import { MovieListAPIAdapter } from '@/library/model/movie/adapter/movie-list.adapter';
import { IMovieDetail } from '@/library/model/movie/interface/movie-detail.interface';
import { IMovieList } from '@/library/model/movie/interface/movie-list.interface';
import { ErrorApps } from '@/library/modules/error';
import { Get } from '@/library/modules/fetch-api';
import { IMovieRepository } from '@/library/repository/movie-repository.interface';

/**
 * Movie Repository
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.30
 */
class MovieRepositoryImplementation implements IMovieRepository {
  private static instance: IMovieRepository;

  /**
   * Get Movie Detail By ID
   * @param {string} movieId - movie id
   * @returns {Promise<IMovieList | ErrorApps>}
   */
  public async getMovieDetail(
    movieId: string
  ): Promise<IMovieDetail | ErrorApps | undefined> {
    if (VerifiedIsNotEmpty(movieId)) {
      return Get<IRootObjectDetailAPIResponse | IRootObjectAPIErrorResponse>(
        process.env.API_URI,
        {
          params: {
            apiKey: process.env.API_KEY,
            i: movieId
          }
        }
      )
        .then(({ data }) => data)
        .then(MovieDetailAPIAdapter);
    }

    throw new ErrorApps(500, `Movie ID Is Empty`);
  }

  /**
   * Get Movie List
   * @param {string} keyword - keyword search
   * @param {number} page - page number
   * @returns {Promise<IMovieList | ErrorApps>}
   */
  public async getMovieList(
    keyword: string,
    page: number
  ): Promise<IMovieList | ErrorApps> {
    if (BulkVerifiedIsNotNull([keyword, page])) {
      return Get<IRootObjectListAPIResponse | IRootObjectAPIErrorResponse>(
        process.env.API_URI,
        {
          params: {
            apiKey: process.env.API_KEY,
            page,
            s: keyword
          }
        }
      )
        .then(({ data }) => data)
        .then(MovieListAPIAdapter);
    }

    throw new ErrorApps(500, `Keyword or Page is undefined`);
  }

  /**
   * Singleton
   * @return {IMovieRepository}
   */
  public static singleton(): IMovieRepository {
    if (!VerifiedIsNotEmpty(MovieRepositoryImplementation.instance)) {
      MovieRepositoryImplementation.instance = new MovieRepositoryImplementation();
    }

    return MovieRepositoryImplementation.instance;
  }
}

export default MovieRepositoryImplementation;
