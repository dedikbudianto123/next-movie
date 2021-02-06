import { IAdapter } from '@/library/interface/general';
import { ErrorApps } from '@/library/modules/error';
import { IGNORE_ERROR_CODE } from '@/library/modules/error/constant';
import { IErrorApps } from '@/library/modules/error/interface';

/**
 * Error Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {IRatingApiResponse} param - param api
 * @returns {IRating | undefined}
 * @since 2021.01.27
 */
export const ErrorAdapter: IAdapter<ErrorApps, IErrorApps> = (error) => {
  if (error instanceof ErrorApps) {
    return {
      code: error.status,
      message: error.message,
      stack:
        !IGNORE_ERROR_CODE.includes(error.status) &&
        process.env.NEXT_PUBLIC_IS_PRODUCTION === `false`
          ? error.stack
          : undefined
    } as IErrorApps;
  }

  if ((error as Error) instanceof Error) {
    return {
      code: 500,
      message: (error as Error).message,
      stack: (error as Error).stack
    };
  }

  return {
    code: 500,
    message: `Unknown Error`
  };
};
