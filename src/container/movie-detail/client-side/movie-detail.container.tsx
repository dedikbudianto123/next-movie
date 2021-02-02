import { FC } from 'react';

import { IMovieDetailProps } from '@/container/movie-detail/interface/movie-props.interface';

import MovieDetailBody from './section/body';
import MovieDetailHead from './section/head';

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