import { AxiosResponse } from 'axios';

/**
 * Fetch API Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export interface IFetchAPIResponse<T> {
  data: T;
  additionalData: Omit<AxiosResponse<T>, 'data'>;
}

/**
 * Promise Fetch API Response
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export type IFetchAPIPromise<T> = Promise<IFetchAPIResponse<T>>;
