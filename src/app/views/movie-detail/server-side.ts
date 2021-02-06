import { IMovieDetailProps } from '@/app/views/movie-detail/interface';
import ServerSideBuilder from '@/library/modules/page-generator/builder/server-side.builder';

import MovieDetailBusinessLogic from './business-logic';
import { MovieDetailSeoHandler } from './seo';

export const getServerSideProps = new ServerSideBuilder<IMovieDetailProps>()
  .setBusinessLayer(MovieDetailBusinessLogic.singleton)
  .setSEOHandler(MovieDetailSeoHandler)
  .execute();
