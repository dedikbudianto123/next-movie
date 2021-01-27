import { IMovieType } from '@/utils/interface/movie/movie-type.interface';
import { IPagination } from '@/utils/model/general/interface/pagination.interface';

/**
 * Movie List Model Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IMovieList {
  item: IMovieListItem[];
  pagination: IPagination;
}

/**
 * Movie List Model Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IMovieListItem {
  title: string;
  year: string;
  type: IMovieType;
  poster: string;
}
