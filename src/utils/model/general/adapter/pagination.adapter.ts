import { ValidateNumberAndParsedToInteger } from '@/utils/helper/string.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { IRootObjectListAPIResponse } from '@/utils/interface/generated/list-api.interface';

import { IPagination } from '../interface/pagination.interface';

/**
 * Pagination API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {Pick<IRootObjectListAPIResponse, 'totalResults'>} param - param api
 * @returns {IPagination | undefined}
 * @since 2021.01.27
 */
export const PaginationAPIAdapter: IAdapter<
  Pick<IRootObjectListAPIResponse, 'totalResults'> & {
    page: number;
    perPage: number;
  },
  IPagination
> = ({ page, perPage, totalResults }) => {
  const result = ValidateNumberAndParsedToInteger(totalResults);
  const totalPage = Math.ceil(result / perPage);

  return {
    page,
    perPage,
    totalPage,
    totalResult: result
  };
};
