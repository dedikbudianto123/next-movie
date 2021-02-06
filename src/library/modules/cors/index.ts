import { CorsDecoratorGenerator, CorsGenerator } from './helper';

const corsInstance = CorsGenerator();

export const UseCors = CorsDecoratorGenerator;
export const cors = corsInstance;
