import { AxiosError } from 'axios';

import { ErrorApps } from '@/utils/modules/error';

/**
 * Fetch API Error Helper
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export const FetchApiErrorHelper = (error: AxiosError): ErrorApps => {
  if (error instanceof Error) {
    const { message } = error;
    return new ErrorApps(500, message);
  }

  return new ErrorApps(500, `Error Unknown`);
};

export default NameClass;
