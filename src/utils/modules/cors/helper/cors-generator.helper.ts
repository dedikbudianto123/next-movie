import CorsBuilder from '@/utils/modules/cors/builder/cors.builder';
import { ICorsHandler } from '@/utils/modules/cors/interface/cors.interface';

/**
 * Cors Generator
 * @returns {ICorsHandler}
 */
function CorsGenerator(): ICorsHandler {
  return (req, res, options) =>
    new Promise((resolve, reject) => {
      new CorsBuilder().setOptions(options).execute()(req, res, (err) => {
        if (err instanceof Error) {
          return reject(err);
        }
        return resolve(err);
      });
    });
}

const corsInstance = CorsGenerator();

export default corsInstance;
