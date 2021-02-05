import {
  DEFAULT_PAGINATION,
  PER_PAGE
} from '@/library/constant/pagination.contant';
import {
  BulkVerifiedIsNotEmpty,
  VerifiedIsNotEmpty
} from '@/library/helper/validator.helper';
import { IAdapter } from '@/library/interface/general/adapter.interface';
import { IRootObjectAPIErrorResponse } from '@/library/interface/generated/error-api.interface';
import { IRootObjectListAPIResponse } from '@/library/interface/generated/list-api.interface';
import { PaginationAPIAdapter } from '@/library/model/general/adapter/pagination.adapter';
import { IMovieList } from '@/library/model/movie/interface/movie-list.interface';

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
