import { IRating } from '@/utils/model/general/interface/rating.interface';
import { IScore } from '@/utils/model/general/interface/score.interface';

import { IMovieFigure } from './movie-figure.interface';
import { IMovieList } from './movie-list.interface';

/**
 * Movie Detail Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IMovieDetail extends IMovieList {
  plot: string;
  rated: string;
  genre: string;
  poster: string;
  runtime: string;
  released: string;
  production: string;
  score: IScore;
  ratings: IRating;
  figure: IMovieFigure;
}
