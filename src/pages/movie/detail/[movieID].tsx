import { GetServerSideProps } from 'next';

import MovieDetailContainer from '@/container/movie/movie-detail.container';

/**
 * Get Server Side Props Lifecycle
 * @param {GetServerSidePropsContext} context - context page
 * @returns {Promise<GetServerSidePropsResult>}
 */
export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async ({ params: { movieID } }) => ({
  props: {
    id: movieID as string
  }
});

export default MovieDetailContainer;
