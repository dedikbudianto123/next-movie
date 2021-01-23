import { GetServerSideProps } from 'next';
import { FC } from 'react';

/**
 * Movie Detail
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetail: FC<{ id: string }> = ({ id }) => (
  <div>Movie Detail {id}</div>
);

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

export default MovieDetail;
