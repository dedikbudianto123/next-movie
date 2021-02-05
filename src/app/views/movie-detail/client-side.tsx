import { FC } from 'react';

import MovieDetailBody from '@/app/views/movie-detail/components/organisms/body';
import MovieDetailHead from '@/app/views/movie-detail/components/organisms/head';
import { IMovieDetailProps } from '@/app/views/movie-detail/interface';
import ClientSideBuilder from '@/library/modules/page-generator/builder/client-side.builder';
import { SEOHTMLGenerator } from '@/library/modules/seo/helper/seo-html.helper';

/**
 * Movie Detail
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetail: FC<IMovieDetailProps> = ({ movie }) => {
  if (movie) {
    return (
      <>
        <MovieDetailHead title={movie.title} />
        <MovieDetailBody {...movie} />
      </>
    );
  }

  return <div>Movie Not Found</div>;
};

export default new ClientSideBuilder(MovieDetail)
  .registerHandler(SEOHTMLGenerator)
  .execute();
