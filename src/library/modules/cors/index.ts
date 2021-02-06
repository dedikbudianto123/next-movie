import { CorsDecoratorGenerator, CorsGenerator } from './helper';

const corsInstance = CorsGenerator();

export const cors = corsInstance;
export const UseCors = CorsDecoratorGenerator;
