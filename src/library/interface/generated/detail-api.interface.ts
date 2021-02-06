/**
 * Rating Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRatingApiResponse {
  Source: string;
  Value: string;
}

/**
 * Root Object Detail Api Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRootObjectDetailAPIResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: IRatingApiResponse[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}
