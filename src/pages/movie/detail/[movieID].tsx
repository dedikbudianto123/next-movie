import { GetServerSideProps } from 'next';

import MovieDetailContainer from '@/container/movie-detail/client-side';
import { GetMovieDetailProps } from '@/container/movie-detail/server-side';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */
export const getServerSideProps: GetServerSideProps = async (param) => {
  const { setupWeb } = require(`@/utils/modules/csrf`);

  return setupWeb(async ({ params: { movieID } }) => ({
    props: await GetMovieDetailProps(movieID || ``)
  }))(param);
};

export default MovieDetailContainer;
