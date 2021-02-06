import { BulkVerifiedIsNotEmpty } from '@/library/helper';
import { IAdapter } from '@/library/interface/general';
import { IRootObjectDetailAPIResponse } from '@/library/interface/generated';
import { IMovieFigure } from '@/library/model/movie/interface';

/**
 * Movie Figure API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {Pick<IRootObjectDetailAPIResponse, 'Director' | 'Writer' | 'Actors'>} param - param api
 * @returns {IMovieFigure | undefined}
 * @since 2021.01.28
 */
export const MovieFigureAPIAdapter: IAdapter<
  Pick<IRootObjectDetailAPIResponse, 'Director' | 'Writer' | 'Actors'>,
  IMovieFigure
> = ({ Actors: actors, Director: director, Writer: writter }) => {
  if (BulkVerifiedIsNotEmpty([actors, director, writter])) {
    return {
      actors,
      director,
      writter
    };
  }

  return undefined;
};
