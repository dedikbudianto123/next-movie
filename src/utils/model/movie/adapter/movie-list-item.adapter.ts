import { MOVIE_NOT_FOUND_POSTER } from '@/utils/constant/movie.constant';
import { BulkVerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { ISearchItemAPIResponse } from '@/utils/interface/generated/list-api.interface';
import { IMovieType } from '@/utils/interface/movie/movie-type.interface';
import { IMovieListItem } from '@/utils/model/movie/interface/movie-list.interface';

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
