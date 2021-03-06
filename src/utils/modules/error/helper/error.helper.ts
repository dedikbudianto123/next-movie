import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';

/**
 * Error
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export class ErrorApps extends Error {
  constructor(private status = 403, message: string, ...params: undefined[]) {
    super(...params);

    if (VerifiedIsNotEmpty(Error.captureStackTrace)) {
      Error.captureStackTrace(this, ErrorApps);
    }

    this.name = `ErrorApps`;
    this.status = status;
    this.message = message;
  }
}
