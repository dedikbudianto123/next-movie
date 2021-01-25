import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Fetch API Instance
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export const FetchAPIInstance = (config: AxiosRequestConfig): AxiosInstance =>
  axios.create(config);
