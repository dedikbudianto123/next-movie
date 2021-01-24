import MovieDetailContainer from '@/container/movie/movie-detail.container';
import { setupWeb } from '@/utils/modules/csrf';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */

export const getServerSideProps = setupWeb(async ({ params: { movieID } }) => ({
  props: {
    id: movieID as string
  }
}));

export default MovieDetailContainer;
