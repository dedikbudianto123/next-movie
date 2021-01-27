/**
 * Pagination Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IPagination {
  page: number;
  perPage: number;
  totalPage: number;
  totalResult: number;
}
