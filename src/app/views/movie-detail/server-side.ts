import { VerifiedIsNotEmpty } from '@/library/helper';
import { IMovieDetail as Detail } from '@/library/model/movie/interface';
import { Get } from '@/library/modules/fetch-api';
import { INextAPIResponse as API } from '@/library/modules/next-api/interface';
import { GenerateServerSideProps } from '@/library/modules/page-generator/helper';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */
export const getServerSideProps = GenerateServerSideProps(
  async ({ params: { movieID } }) => {
    const response = await Get<API<Detail>>(
      `http://localhost:3000/api/movie/detail`,
      {
        params: {
          id: `${movieID}`
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

    return {
      props: { ...response }
    };
  }
);
