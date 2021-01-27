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
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRatingApiResponse[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
