import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { IMovieDetailProps } from '@/app/views/movie-detail/interface';
import BusinessLayerAbstract from '@/library/abstract/business-layer.abstract';
import { IDefaultBussinessLayer } from '@/library/abstract/interface';
import { VerifiedIsNotEmpty } from '@/library/helper';
import { IMovieDetail as Detail } from '@/library/model/movie/interface';
import { Get } from '@/library/modules/fetch-api';
import { INextAPIResponse as API } from '@/library/modules/next-api/interface';

/**
 * Movie Detail Business Logic
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.06
 */
class MovieDetailBusinessLogic extends BusinessLayerAbstract<
  IMovieDetailProps,
  string
> {
  /**
   * Generate Data
   * @returns {Promise<IMovieDetailProps>}
   */
  async generateData(): Promise<IMovieDetailProps> {
    const { param } = this;

    return Get<API<Detail>>(`http://localhost:3000/api/movie/detail`, {
      params: {
        id: param
      }
    })
      .then(({ data: { code, data } }) => {
        if (code === 200 && VerifiedIsNotEmpty(data)) {
          return {
            movie: data
          };
        }

        throw new Error(`Movie not found`);
      })
      .catch(() => ({}));
  }

  /**
   * Get Business Logic Instance
   * @param {GetServerSidePropsContext<ParsedUrlQuery>} param - get server side context
   * @returns {IDefaultBussinessLayer<O, P>}
   */
  public static singleton({
    params: { movieID }
  }: GetServerSidePropsContext<ParsedUrlQuery>): IDefaultBussinessLayer<IMovieDetailProps> {
    return new MovieDetailBusinessLogic().setParameter(`${movieID}`);
  }
}

export default MovieDetailBusinessLogic;
