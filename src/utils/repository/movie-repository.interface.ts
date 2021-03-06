import { IMovieDetail } from '@/utils/model/movie/interface/movie-detail.interface';
import { IMovieList } from '@/utils/model/movie/interface/movie-list.interface';
import { ErrorApps } from '@/utils/modules/error';

/**
 * Movie Repository Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.28
 */
export interface IMovieRepository {
  getMovieDetail(movieId: string): Promise<IMovieDetail | ErrorApps>;
  getMovieList(keyword: string, page: number): Promise<IMovieList | ErrorApps>;
}
