import Cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

import BuilderAbstract from '@/utils/abstract/builder.abstract';
import { ICorsFunction } from '@/utils/modules/cors/interface/cors.interface';

/**
 * Cors Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
class CorsBuilder extends BuilderAbstract<ICorsFunction<Cors.CorsRequest>> {
  public options?: CorsOptions | CorsOptionsDelegate;

  /**
   * Setter Options
   * @param {CorsOptions | CorsOptionsDelegate}
   */
  public setOptions(options?: CorsOptions | CorsOptionsDelegate): this {
    this.options = options;

    return this;
  }

  /**
   * Execute
   * @returns {ICorsFunction<Cors.CorsRequest>}
   */
  execute(): ICorsFunction<Cors.CorsRequest> {
    return Cors(this.options);
  }
}

export default CorsBuilder;
