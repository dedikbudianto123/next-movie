import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';
import { IAdapter } from '@/library/interface/general/adapter.interface';
import { IRootObjectDetailAPIResponse } from '@/library/interface/generated/detail-api.interface';
import { IRating } from '@/library/model/general/interface/rating.interface';

import { RatingItemAPIAdapter } from './rating-item.adapter';

/**
 * Rating API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {IRatingApiResponse} param - param api
 * @returns {IRating | undefined}
 * @since 2021.01.27
 */
export const RatingAPIAdapter: IAdapter<
  Pick<IRootObjectDetailAPIResponse, 'Ratings'>,
  IRating
> = ({ Ratings }) => {
  if (VerifiedIsNotEmpty(Ratings)) {
    return {
      item: Ratings.map(RatingItemAPIAdapter).filter(VerifiedIsNotEmpty)
    };
  }

  return undefined;
};
