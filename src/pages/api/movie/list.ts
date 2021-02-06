import MovieController from '@/app/api/movie.controller';

const service = MovieController.getInstance().getMovieList;

export default service;
