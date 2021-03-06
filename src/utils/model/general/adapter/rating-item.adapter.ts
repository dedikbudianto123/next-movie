import { BulkVerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { IRatingApiResponse } from '@/utils/interface/generated/detail-api.interface';
import { IRatingItem } from '@/utils/model/general/interface/rating.interface';

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
