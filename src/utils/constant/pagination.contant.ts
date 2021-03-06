import { IPagination } from '@/utils/model/general/interface/pagination.interface';

export const PER_PAGE = 10;

export const DEFAULT_PAGINATION: IPagination = {
  page: 1,
  perPage: 10,
  totalPage: 0,
  totalResult: 0
};
