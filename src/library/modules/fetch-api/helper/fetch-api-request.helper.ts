/* eslint-disable sort-exports/sort-exports */
// TODO: will disable sort-exports for this file

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  Method
} from 'axios';

import {
  IFetchAPIPromise,
  IFetchAPIResponse
} from '@/library/modules/fetch-api/interface';

import { FetchApiErrorHelper } from './fetch-api-error.helper';

/**
 * Request API
 * @param {AxiosPromise<Response>} instance - instance include promise from axios
 * @returns {Promise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
function request<Response>(
  instance: AxiosPromise<Response>
): IFetchAPIPromise<Response> {
  return new Promise<IFetchAPIResponse<Response>>((resolve, reject) => {
    instance
      .then(({ data, ...res }) => resolve({ additionalData: res, data }))
      .catch((err: AxiosError) => {
        reject(FetchApiErrorHelper(err));
      });
  });
}

/**
 * Generate Request Without Data
 * @param {Method} methodInstance - method name if we use axios instance
 * @param {'get' | 'delete'} methodAxios - method name if we use axios default e.g get, delete func
 * @returns {Promise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function generateRequestWithoutData<Response>(
  methodInstance: Method,
  methodAxios: 'get' | 'delete'
) {
  return (
    url: string,
    config?: AxiosRequestConfig,
    instance: AxiosInstance | undefined = undefined
  ): IFetchAPIPromise<Response> => {
    let promiseInstance: AxiosPromise<Response>;
    if (instance) {
      promiseInstance = instance({
        ...config,
        method: methodInstance,
        url
      }) as AxiosPromise<Response>;
    } else {
      promiseInstance = axios[methodAxios](url, config);
    }

    return request<Response>(promiseInstance);
  };
}

/**
 * Generate Request With Data
 * @param {Method} methodInstance - method name if we use axios instance
 * @param {'post' | 'put' | 'patch'} methodAxios - method name if we use axios default e.g get, delete func
 * @returns {Promise<Response>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export function generateRequestWithData<Response, Parameter>(
  methodInstance: Method,
  methodAxios: 'post' | 'put' | 'patch'
) {
  return (
    url: string,
    data: Parameter,
    config?: AxiosRequestConfig,
    instance: AxiosInstance | undefined = undefined
  ): IFetchAPIPromise<Response> => {
    let promiseInstance: AxiosPromise<Response>;
    if (instance) {
      promiseInstance = instance({
        ...config,
        data,
        method: methodInstance,
        url
      }) as AxiosPromise<Response>;
    } else {
      promiseInstance = axios[methodAxios](url, data, config);
    }

    return request<Response>(promiseInstance);
  };
}
