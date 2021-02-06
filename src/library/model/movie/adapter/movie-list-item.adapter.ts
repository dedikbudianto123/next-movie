import { MOVIE_NOT_FOUND_POSTER } from '@/library/constant';
import { BulkVerifiedIsNotEmpty } from '@/library/helper';
import { IAdapter } from '@/library/interface/general';
import { ISearchItemAPIResponse } from '@/library/interface/generated';
import { IMovieType } from '@/library/interface/movie';
import { IMovieListItem } from '@/library/model/movie/interface';

/**
 * Movie List Item API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {IMovieListItem | undefined}
 * @since 2021.01.28
 */
export const MovieListItemAPIAdapter: IAdapter<
  ISearchItemAPIResponse,
  IMovieListItem
> = ({ imdbID: id, Poster: poster, Title: title, Type: type, Year: year }) => {
  if (BulkVerifiedIsNotEmpty([poster, title, type, year])) {
    return {
      id,
      poster: poster === `N/A` ? MOVIE_NOT_FOUND_POSTER : poster,
      title,
      type: type as IMovieType,
      year
    };
  }

  return undefined;
};
