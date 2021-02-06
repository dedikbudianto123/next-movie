import { IDefaultPageProps } from '@/library/interface/general';
import { IMovieDetail } from '@/library/model/movie/interface';

/**
 * Default Movie Detail Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IDefaultMovieDetailProps = IDefaultPageProps & IMovieDetailProps;

/**
 * Movie Detail Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.01
 */
export interface IMovieDetailProps {
  movie?: IMovieDetail;
}
