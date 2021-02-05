import { FC } from 'react';

import { IMovieDetailProps } from '@/container/movie-detail/interface';

import MovieDetailBody from './components/organisms/body';
import MovieDetailHead from './components/organisms/head';

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
        <MovieDetailBody movie={movie} />
      </>
    );
  }

  return <div>Movie Not Found</div>;
};

export default MovieDetail;
