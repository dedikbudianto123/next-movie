import { DEFAULT_PAGINATION, PER_PAGE } from '@/library/constant';
import { BulkVerifiedIsNotEmpty, VerifiedIsNotEmpty } from '@/library/helper';
import { IAdapter } from '@/library/interface/general';
import {
  IRootObjectAPIErrorResponse,
  IRootObjectListAPIResponse
} from '@/library/interface/generated';
import { PaginationAPIAdapter } from '@/library/model/general/adapter/pagination.adapter';
import { IMovieList } from '@/library/model/movie/interface';

import { MovieListItemAPIAdapter } from './movie-list-item.adapter';

/**
 * Movie List API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {IMovieListItem | undefined}
 * @since 2021.01.28
 */
export const MovieListAPIAdapter: IAdapter<
  IRootObjectListAPIResponse | IRootObjectAPIErrorResponse,
  IMovieList
> = ({ Response, ...res }) => {
  if (Response === `True`) {
    const { Search, totalResults } = res as IRootObjectListAPIResponse;
    if (BulkVerifiedIsNotEmpty([Search, totalResults]) && Search.length > 0) {
      return {
        item: Search.map(MovieListItemAPIAdapter).filter(VerifiedIsNotEmpty),
        pagination: PaginationAPIAdapter({
          page: 1,
          perPage: PER_PAGE,
          totalResults
        })
      };
    }
  }

  return {
    item: [],
    pagination: DEFAULT_PAGINATION
  };
};
