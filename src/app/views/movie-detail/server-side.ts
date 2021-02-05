import { GetServerSideProps } from 'next';

import { IMovieDetailProps } from '@/app/views/movie-detail/interface';
import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';
import { IMovieDetail as Detail } from '@/library/model/movie/interface/movie-detail.interface';
// import { csrfToken, setupWeb } from '@/library/modules/csrf';
import { csrfToken } from '@/library/modules/csrf';
import { Get } from '@/library/modules/fetch-api';
import { IFetchAPIWithoutData } from '@/library/modules/fetch-api/interface/fetch-api.interface';
import { INextAPIResponse as API } from '@/library/modules/next-api/interface/next-api.interface';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */
export const getServerSideProps: GetServerSideProps = async ({
  params: { movieID }
}) => {
  /**
   * Get Movie Detail Props
   * @returns {Promise<IMovieDetailProps>}
   */
  const GetMovieDetailProps = (id: string): Promise<IMovieDetailProps> =>
    (Get as IFetchAPIWithoutData<API<Detail>>)(
      `http://localhost:3000/api/movie/detail`,
      {
        params: {
          id
        }
      }
    )
      .then(({ data: { code, data } }) => {
        if (code === 200 && VerifiedIsNotEmpty(data)) {
          return {
            movie: data
          };
        }

        throw new Error(`Movie not found`);
      })
      .catch(() => ({}));

  // return setupWeb(async ({ params: { movieID } }) => ({
  //   props: { ...(await GetMovieDetailProps(`${movieID}` || ``)), csrfToken }
  // }))(param);

  return {
    props: { ...(await GetMovieDetailProps(`${movieID}` || ``)), csrfToken }
  };
};
