/**
 * Search Item Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface ISearchItemAPIResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

/**
 * Root Object List Api Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRootObjectListAPIResponse {
  Search: ISearchItemAPIResponse[];
  totalResults: string;
  Response: string;
}
