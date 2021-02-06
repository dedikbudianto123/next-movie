import MovieController from '@/app/api/movie.controller';

const service = MovieController.getInstance().getMovieDetail;

export default service;
