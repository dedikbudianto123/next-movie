import {
  CorsDecoratorGenerator,
  CorsGenerator
} from './helper/cors-generator.helper';

const corsInstance = CorsGenerator();

export const cors = corsInstance;
export const UseCors = CorsDecoratorGenerator;
