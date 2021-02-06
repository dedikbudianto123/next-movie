import { IMovieDetailProps } from '@/app/views/movie-detail/interface';
import { ISeoHandler } from '@/library/interface/general';

/**
 * Movie Detail Seo Handler
 * @param {IMovieDetailProps} param - props movie detail page
 * @returns {Promise<ISeoProps>}
 */
export const MovieDetailSeoHandler: ISeoHandler<IMovieDetailProps> = async ({
  movie
}) => {
  if (movie) {
    return {
      title: movie.title
    };
  }

  return {};
};
