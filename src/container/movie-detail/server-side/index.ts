import { IMovieDetailProps } from '@/container/movie-detail/interface/movie-props.interface';
import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { IMovieDetail as Detail } from '@/utils/model/movie/interface/movie-detail.interface';
import { Get } from '@/utils/modules/fetch-api';
import { INextAPIResponse as API } from '@/utils/modules/next-api/interface/next-api.interface';

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
