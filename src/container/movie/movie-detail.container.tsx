import { FC } from 'react';

/**
 * Movie Detail
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetail: FC<{ id: string; isLoggedIn: boolean }> = ({
  id,
  isLoggedIn
}) => (
  <>
    <div>Movie Detail {id}</div>
    <div>is login ? {isLoggedIn ? `true` : `false`}</div>
  </>
);

export default MovieDetail;
