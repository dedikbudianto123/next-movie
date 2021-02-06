import { BulkVerifiedIsNotEmpty } from '@/library/helper';
import { IAdapter } from '@/library/interface/general';
import { IRatingApiResponse } from '@/library/interface/generated';
import { IRatingItem } from '@/library/model/general/interface';

/**
 * Rating Item API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {IRatingApiResponse} param - param api
 * @returns {IRatingItem | undefined}
 * @since 2021.01.27
 */
export const RatingItemAPIAdapter: IAdapter<
  IRatingApiResponse,
  IRatingItem
> = ({ Source: source, Value: value }) => {
  if (BulkVerifiedIsNotEmpty([source, value])) {
    return {
      source,
      value
    };
  }

  return undefined;
};
