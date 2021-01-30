import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { IRootObjectDetailAPIResponse } from '@/utils/interface/generated/detail-api.interface';
import { IMovieDetail } from '@/utils/model/movie/interface/movie-detail.interface';
import { IMovieListItem } from '@/utils/model/movie/interface/movie-list.interface';
import { ErrorApps } from '@/utils/modules/error';

import { RatingAPIAdapter } from '../../general/adapter/rating.adapter';
import { ScoreAPIAdapter } from '../../general/adapter/score.adapter';
import { MovieFigureAPIAdapter } from './movie-figure.adapter';
import { MovieListItemAPIAdapter } from './movie-list-item.adapter';

/**
 * Tanslate Basic Movie Info
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {IMovieListItem | undefined}
 * @since 2021.01.28
 */
const TranslateBasicMovieInfo = ({
  imdbID,
  Poster,
  Title,
  Type,
  Year
}: IRootObjectDetailAPIResponse): IMovieListItem | undefined =>
  MovieListItemAPIAdapter({
    Poster,
    Title,
    Type,
    Year,
    imdbID
  });

/**
 * Tanslate Genre Movie
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {Pick<IMovieDetail, 'genre' | 'plot'>}
 * @since 2021.01.28
 */
const TranslateGenreMovieInfo = ({
  Genre,
  Plot
}: IRootObjectDetailAPIResponse): Pick<IMovieDetail, 'genre' | 'plot'> => ({
  genre: VerifiedIsNotEmpty(Genre) ? Genre : `N/A`,
  plot: VerifiedIsNotEmpty(Plot) ? Plot : `N/A`
});

/**
 * Tanslate Additional Movie Info
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {Pick<IMovieDetail, 'production' | 'rated' | 'released' | 'runtime'>}
 * @since 2021.01.28
 */
const TranslateAdditionalMovieInfo = ({
  Production: production,
  Rated: rated,
  Released: released,
  Runtime: runtime
}: IRootObjectDetailAPIResponse): Pick<
  IMovieDetail,
  'production' | 'rated' | 'released' | 'runtime'
> => ({
  production: VerifiedIsNotEmpty(production) ? production : `N/A`,
  rated: VerifiedIsNotEmpty(rated) ? rated : `N/A`,
  released: VerifiedIsNotEmpty(released) ? released : `N/A`,
  runtime: VerifiedIsNotEmpty(runtime) ? runtime : `N/A`
});

/**
 * Movie List API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {ISearchItemAPIResponse} param - param api
 * @returns {IMovieListItem | undefined}
 * @since 2021.01.28
 */
export const MovieDetailAPIAdapter: IAdapter<
  IRootObjectDetailAPIResponse,
  IMovieDetail
> = (param) => {
  const basicInfo = TranslateBasicMovieInfo(param);

  if (basicInfo) {
    const { poster, title, type, year } = basicInfo;
    const { genre, plot } = TranslateGenreMovieInfo(param);
    const {
      production,
      rated,
      released,
      runtime
    } = TranslateAdditionalMovieInfo(param);
    const {
      Actors,
      Director,
      imdbRating,
      imdbVotes,
      Metascore,
      Ratings,
      Writer
    } = param;

    return {
      figure: MovieFigureAPIAdapter({
        Actors,
        Director,
        Writer
      }),
      genre,
      plot,
      poster,
      production,
      rated,
      ratings: RatingAPIAdapter({
        Ratings
      }),
      released,
      runtime,
      score: ScoreAPIAdapter({
        Metascore,
        imdbRating,
        imdbVotes
      }),
      title,
      type,
      year
    };
  }

  throw new ErrorApps(500, `basic info not generated`);
};
