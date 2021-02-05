import { FC } from 'react';

import { IMovieDetail } from '@/library/model/movie/interface/movie-detail.interface';

/**
 * Movie Detail
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetailBody: FC<IMovieDetail | undefined> = (movie) => {
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
