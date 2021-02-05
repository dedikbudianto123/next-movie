import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IFetchAPIPromise } from '@/library/modules/fetch-api/interface/fetch-api.interface';

import {
  generateRequestWithData,
  generateRequestWithoutData
} from './fetch-api-request.helper';

/**
 * Get Request
 * @param {string} url - url api
 * @param {AxiosRequestConfig | undefined} config - axios request config
 * @param {AxiosInstance | undefined} instance - axios instance
 * @returns {IFetchAPIPromise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function Get<Response>(
  url: string,
  config?: AxiosRequestConfig,
  instance: AxiosInstance | undefined = undefined
): IFetchAPIPromise<Response> {
  return generateRequestWithoutData<Response>(`GET`, `get`)(
    url,
    config,
    instance
  );
}

/**
 * Delete Request
 * @param {string} url - url api
 * @param {AxiosRequestConfig | undefined} config - axios request config
 * @param {AxiosInstance | undefined} instance - axios instance
 * @returns {IFetchAPIPromise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function Delete<Response>(
  url: string,
  config?: AxiosRequestConfig,
  instance: AxiosInstance | undefined = undefined
): IFetchAPIPromise<Response> {
  return generateRequestWithoutData<Response>(`DELETE`, `delete`)(
    url,
    config,
    instance
  );
}

/**
 * Post Request
 * @param {string} url - url api
 * @param {Parameter} data - data will send to api
 * @param {AxiosRequestConfig | undefined} config - axios request config
 * @param {AxiosInstance | undefined} instance - axios instance
 * @returns {IFetchAPIPromise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function Post<Response, Parameter>(
  url: string,
  data: Parameter,
  config?: AxiosRequestConfig,
  instance: AxiosInstance | undefined = undefined
): IFetchAPIPromise<Response> {
  return generateRequestWithData<Response, Parameter>(`POST`, `post`)(
    url,
    data,
    config,
    instance
  );
}

/**
 * Put Request
 * @param {string} url - url api
 * @param {Parameter} data - data will send to api
 * @param {AxiosRequestConfig | undefined} config - axios request config
 * @param {AxiosInstance | undefined} instance - axios instance
 * @returns {IFetchAPIPromise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function Put<Response, Parameter>(
  url: string,
  data: Parameter,
  config?: AxiosRequestConfig,
  instance: AxiosInstance | undefined = undefined
): IFetchAPIPromise<Response> {
  return generateRequestWithData<Response, Parameter>(`PUT`, `put`)(
    url,
    data,
    config,
    instance
  );
}

/**
 * Post Request
 * @param {string} url - url api
 * @param {Parameter} data - data will send to api
 * @param {AxiosRequestConfig | undefined} config - axios request config
 * @param {AxiosInstance | undefined} instance - axios instance
 * @returns {IFetchAPIPromise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function Patch<Response, Parameter>(
  url: string,
  data: Parameter,
  config?: AxiosRequestConfig,
  instance: AxiosInstance | undefined = undefined
): IFetchAPIPromise<Response> {
  return generateRequestWithData<Response, Parameter>(`PATCH`, `patch`)(
    url,
    data,
    config,
    instance
  );
}
