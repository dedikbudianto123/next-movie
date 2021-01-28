import {
  DEFAULT_PAGINATION,
  PER_PAGE
} from '@/utils/constant/pagination.contant';
import {
  BulkVerifiedIsNotEmpty,
  VerifiedIsNotEmpty
} from '@/utils/helper/validator.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { IRootObjectListAPIResponse } from '@/utils/interface/generated/list-api.interface';
import { PaginationAPIAdapter } from '@/utils/model/general/adapter/pagination.adapter';
import { IMovieList } from '@/utils/model/movie/interface/movie-list.interface';

import { MovieListItemAPIAdapter } from './movie-list-item.adapter';

/**
 * Movie List API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {IMovieListItem | undefined}
 * @since 2021.01.28
 */
export const MovieListAPIAdapter: IAdapter<
  IRootObjectListAPIResponse,
  IMovieList
> = ({ Response, Search, totalResults }) => {
  if (
    Response === `True` &&
    BulkVerifiedIsNotEmpty([Search, totalResults]) &&
    Search.length > 0
  ) {
    return {
      item: Search.map(MovieListItemAPIAdapter).filter(VerifiedIsNotEmpty),
      pagination: PaginationAPIAdapter({
        page: 1,
        perPage: PER_PAGE,
        totalResults
      })
    };
  }

  return {
    item: [],
    pagination: DEFAULT_PAGINATION
  };
};
