import { IDefaultPageProps } from '@/library/interface/general/base.interface';
import { IMovieDetail } from '@/library/model/movie/interface/movie-detail.interface';

/**
 * Movie Detail Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.01
 */
export interface IMovieDetailProps {
  movie?: IMovieDetail;
}

/**
 * Default Movie Detail Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IDefaultMovieDetailProps = IDefaultPageProps & IMovieDetailProps;
