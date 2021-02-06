import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { VerifiedIsNotEmpty } from '@/library/helper';
import { INextAPIMethod } from '@/library/modules/next-api/interface';

import {
  NextAPICatchErrorHandler,
  NextAPIError404
} from './next-api-error.helper';

/**
 * Generate Method API
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {INextAPIMethod[]} methodType - method type
 * @description generate endpoint api
 * @since 2021.01.26
 */
const GenerateMethodAPI = (methodType: INextAPIMethod[]) => (
  _,
  __,
  descriptor: TypedPropertyDescriptor<NextApiHandler>
) => {
  const clone = { ...descriptor };
  const childFunction = clone.value;

  if (VerifiedIsNotEmpty(clone.value)) {
    clone.value = (...args: (NextApiRequest | NextApiResponse)[]) => {
      const { method } = args[0] as NextApiRequest;

      if (
        VerifiedIsNotEmpty(method) &&
        methodType.includes(method as INextAPIMethod)
      ) {
        try {
          return childFunction.apply(this, args);
        } catch (e) {
          return NextAPICatchErrorHandler(e).apply(this, args);
        }
      }

      return NextAPIError404.apply(this, args);
    };
  }

  return clone;
};

/**
 * Next API Get
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export const NextAPIGet = () => GenerateMethodAPI([`GET`]);

/**
 * Next API Post
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export const NextAPIPost = () => GenerateMethodAPI([`POST`]);

/**
 * Next API Put
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export function NextAPIPut() {
  return GenerateMethodAPI([`PUT`]);
}

/**
 * Next API Delete
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export const NextAPIDelete = () => GenerateMethodAPI([`DELETE`]);

/**
 * Next API Custom
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.26
 */
export const NextAPICustom = (methodType: INextAPIMethod[]) =>
  GenerateMethodAPI(methodType);
