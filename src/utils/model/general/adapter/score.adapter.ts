import { BulkVerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { IAdapter } from '@/utils/interface/general/adapter.interface';
import { IRootObjectDetailAPIResponse } from '@/utils/interface/generated/detail-api.interface';
import { IScore } from '@/utils/model/general/interface/score.interface';

/**
 * Rating API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {IRatingApiResponse} param - param api
 * @returns {IScore | undefined}
 * @since 2021.01.27
 */
export const RatingAPIAdapter: IAdapter<
  Pick<IRootObjectDetailAPIResponse, 'Metascore' | 'imdbRating' | 'imdbVotes'>,
  IScore
> = ({ imdbRating, imdbVotes, Metascore: metaScore }) => {
  if (BulkVerifiedIsNotEmpty([imdbRating, imdbVotes, metaScore])) {
    return {
      imdbRating,
      metaScore,
      imdbVotes
    };
  }

  return undefined;
};
