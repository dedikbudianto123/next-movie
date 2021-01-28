import { IRating } from '@/utils/model/general/interface/rating.interface';
import { IScore } from '@/utils/model/general/interface/score.interface';

import { IMovieFigure } from './movie-figure.interface';
import { IMovieListItem } from './movie-list.interface';

/**
 * Movie Detail Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IMovieDetail extends IMovieListItem {
  figure?: IMovieFigure;
  genre: string;
  plot: string;
  poster: string;
  production: string;
  rated: string;
  ratings?: IRating;
  released: string;
  runtime: string;
  score?: IScore;
}
