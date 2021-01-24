import { sign } from 'cookie-signature';
import { NextApiHandler } from 'next';

import BuilderAbstract from '@/utils/abstract/builder.abstract';
import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { CSRF_DEFAULT_OPTIONS } from '@/utils/modules/csrf/constant/csrf.constant';
import {
  ICSRFBuilder,
  ICSRFMiddleware,
  ICSRFOptions
} from '@/utils/modules/csrf/interface/csrf.interface';

import CSRFGenerator from '../helper/csrf-generator.helper';
import CSRFTokens from '../helper/csrf-tokens.helper';

/**
 * CSRF Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
class CSRFBuilder extends BuilderAbstract<ICSRFBuilder> {
  private options: Omit<ICSRFMiddleware, 'csrfSecret'>;

  private static instance: ICSRFBuilder;

  constructor() {
    super();

    this.execute = this.execute.bind(this);
  }

  /**
   * Getter CSRF Secret
   * @returns {string}
   */
  private get csrfSecret(): string {
    return CSRFTokens.getInstance().secretSync();
  }

  /**
   * Getter CSRF Token
   * @returns {string}
   */
  private get csrfToken(): string {
    const { csrfSecret, options } = this;

    return sign(CSRFTokens.getInstance().create(csrfSecret), options.secret);
  }

  /**
   * Setter Options
   * @param {ICSRFOptions} option - user options
   * @returns {CSRFBuilder}
   */
  public setOptions(option: ICSRFOptions): this {
    this.options = {
      ...CSRF_DEFAULT_OPTIONS,
      ...option
    };

    return this;
  }

  /**
   * Execute
   * @returns {ICSRFBuilder}
   */
  execute(): ICSRFBuilder {
    const { csrfSecret, csrfToken, options } = this;

    // generate options for the csrf middleware
    const csrfOptions: ICSRFMiddleware = {
      ...options,
      csrfSecret
    };

    // generate middleware to verify CSRF token with the CSRF as parameter
    return {
      csrfToken,
      csrf: (handler: NextApiHandler) => CSRFGenerator(handler, csrfOptions)
    };
  }

  /**
   * Generate CSRF Builder
   * @param {ICSRFOptions} option - user options
   * @returns {ICSRFBuilder}
   */
  public static singleton(option: ICSRFOptions): ICSRFBuilder {
    if (!VerifiedIsNotEmpty(CSRFBuilder.instance)) {
      CSRFBuilder.instance = new CSRFBuilder().setOptions(option).execute();
    }
    return CSRFBuilder.instance;
  }
}

export default CSRFBuilder;
