import { BulkVerifiedIsNotEmpty } from '@/library/helper';
import { IAdapter } from '@/library/interface/general';
import { IRootObjectDetailAPIResponse } from '@/library/interface/generated';
import { IScore } from '@/library/model/general/interface';

/**
 * Score API Adapter
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {IRatingApiResponse} param - param api
 * @returns {IScore | undefined}
 * @since 2021.01.27
 */
export const ScoreAPIAdapter: IAdapter<
  Pick<IRootObjectDetailAPIResponse, 'Metascore' | 'imdbRating' | 'imdbVotes'>,
  IScore
> = ({ imdbRating, imdbVotes, Metascore: metaScore }) => {
  if (BulkVerifiedIsNotEmpty([imdbRating, imdbVotes, metaScore])) {
    return {
      imdbRating,
      imdbVotes,
      metaScore
    };
  }

  return undefined;
};
