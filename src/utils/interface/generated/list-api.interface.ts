/**
 * Search Item Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface ISearchItemAPIResponse {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

/**
 * Root Object List Api Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRootObjectListAPIResponse {
  Response: string;
  Search: ISearchItemAPIResponse[];
  totalResults: string;
}
