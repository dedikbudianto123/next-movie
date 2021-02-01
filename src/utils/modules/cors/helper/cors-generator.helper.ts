import { CorsOptions, CorsOptionsDelegate } from 'cors';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import CorsBuilder from '@/utils/modules/cors/builder/cors.builder';
import { ICorsHandler } from '@/utils/modules/cors/interface/cors.interface';
import { NextAPIError404 } from '@/utils/modules/next-api/helper/next-api-error.helper';

/**
 * Cors Generator
 * @returns {ICorsHandler}
 */
export function CorsGenerator(): ICorsHandler {
  return (req, res, options) =>
    new Promise((resolve, reject) => {
      new CorsBuilder().setOptions(options).execute()(req, res, (err) => {
        if (err instanceof Error) {
          return reject(err);
        }
        return resolve(err);
      });
    });
}

/**
 * Cors Generator Decorator
 * @param {CorsOptions | CorsOptionsDelegate} options - decorator options
 * @returns {MethodDecorator}
 */
export function CorsDecoratorGenerator(
  options: CorsOptions | CorsOptionsDelegate = {
    methods: [`GET`, `PUT`, `POST`],
    optionsSuccessStatus: 200
  }
): MethodDecorator {
  return <T = NextApiHandler>(
    _: Record<string, unknown>,
    __: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const clone = { ...descriptor };
    const childFunction = (clone.value as unknown) as NextApiHandler;

    if (VerifiedIsNotEmpty(clone.value)) {
      clone.value = (((req: NextApiRequest, res: NextApiResponse) => {
        new CorsBuilder().setOptions(options).execute()(req, res, (err) => {
          if (err instanceof Error) {
            return NextAPIError404.apply(this, [req, res]);
          }

          return childFunction.apply(this, [req, res]);
        });
      }) as unknown) as T;
    }

    return clone;
  };
}
