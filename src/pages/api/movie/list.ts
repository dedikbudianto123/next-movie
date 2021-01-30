import MovieController from '@/controller/movie.controller';

const service = MovieController.getInstance().getMovieList;

export default service;
