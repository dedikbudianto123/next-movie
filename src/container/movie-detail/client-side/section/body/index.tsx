import { FC } from 'react';

import { IMovieDetailProps } from '@/container/movie-detail/interface/movie-props.interface';

/**
 * Movie Detail
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetailBody: FC<IMovieDetailProps> = ({ movie }) => {
  if (movie) {
    return (
      <>
        <div>Movie Detail {movie.title}</div>
      </>
    );
  }

  return <div>Movie Not Found</div>;
};

export default MovieDetailBody;
