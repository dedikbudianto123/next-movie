import { GetServerSideProps } from 'next';

import MovieDetailContainer from '@/container/movie/movie-detail.container';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */
export const getServerSideProps: GetServerSideProps = async (param) => {
  const { setupWeb } = require(`@/utils/modules/csrf`);

  return setupWeb(async ({ params: { movieID } }) => ({
    props: {
      id: movieID as string
    }
  }))(param);
};

export default MovieDetailContainer;
