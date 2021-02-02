import Head from 'next/head';
import { FC } from 'react';

/**
 * Movie Detail Head
 * @param {props} props - props page
 * @returns {ReactNode}
 */
const MovieDetailHead: FC<{ title: string }> = ({ title }) => (
  <Head>
    <title>Movie Detail : {title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export default MovieDetailHead;
