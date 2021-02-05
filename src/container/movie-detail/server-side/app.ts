import { IMovieDetailProps } from '@/container/movie-detail/interface';
import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';
import { IMovieDetail as Detail } from '@/library/model/movie/interface/movie-detail.interface';
import { Get } from '@/library/modules/fetch-api';
import { INextAPIResponse as API } from '@/library/modules/next-api/interface/next-api.interface';

/**
 * Get Movie Detail Props
 * @returns {Promise<IMovieDetailProps>}
 */
export const GetMovieDetailProps = (
  movieID: string
): Promise<IMovieDetailProps> =>
  Get<API<Detail>>(`http://localhost:3000/api/movie/detail`, {
    params: {
      id: movieID
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
