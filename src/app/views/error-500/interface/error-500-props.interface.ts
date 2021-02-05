import { IDefaultPageProps } from '@/library/interface/general/base.interface';

/**
 * Error 500 Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export interface IError500 {
  message: string;
  stack?: string;
}

/**
 * Error 500 Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.01
 */
export interface IError500Props {
  error: IError500;
}

/**
 * Default Error 500 Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IDefaulError500Props = IDefaultPageProps & IError500Props;
