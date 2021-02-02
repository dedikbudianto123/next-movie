import { IErrorApps } from '@/utils/modules/error/interface/error.interface';

/**
 * Next API Method Type
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export type INextAPIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Next API Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.02
 */
export interface INextAPIResponse<T> extends Omit<IErrorApps, 'stack'> {
  data: T;
}
