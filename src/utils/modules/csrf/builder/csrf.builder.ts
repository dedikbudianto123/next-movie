import { sign } from 'cookie-signature';
import { GetServerSideProps, NextApiHandler } from 'next';

import BuilderAbstract from '@/utils/abstract/builder.abstract';
import { VerifiedIsNotEmpty } from '@/utils/helper/validator.helper';
import { CSRF_DEFAULT_OPTIONS } from '@/utils/modules/csrf/constant/csrf.constant';
import CSRFGenerator from '@/utils/modules/csrf/helper/csrf-generator.helper';
import {
  CSRFSetupAPIHelper,
  CSRFSetupWebHelper
} from '@/utils/modules/csrf/helper/csrf-setup.helper';
import CSRFTokens from '@/utils/modules/csrf/helper/csrf-tokens.helper';
import {
  ICSRFBuilder,
  ICSRFMiddleware,
  ICSRFOptions
} from '@/utils/modules/csrf/interface/csrf.interface';

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
    if (typeof window === `undefined`) {
      return CSRFTokens.getInstance().secretSync();
    }

    return ``;
  }

  /**
   * Getter CSRF Token
   * @returns {string}
   */
  private get csrfToken(): string {
    if (typeof window === `undefined`) {
      const { csrfSecret, options } = this;
      return sign(CSRFTokens.getInstance().create(csrfSecret), options.secret);
    }

    return ``;
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
    const { csrfSecret, csrfToken, options, setupCSRFWeb } = this;

    // generate options for the csrf middleware
    const csrfOptions: ICSRFMiddleware = {
      ...options,
      csrfSecret
    };

    // generate middleware to verify CSRF token with the CSRF as parameter
    return {
      csrf: (handler: NextApiHandler) => CSRFGenerator(handler, csrfOptions),
      csrfToken,
      setupAPI: (handler: NextApiHandler) =>
        CSRFSetupAPIHelper(handler, {
          cookieOptions: csrfOptions.cookieOptions,
          csrfSecret: csrfOptions.csrfSecret,
          secret: csrfOptions.secret,
          tokenKey: csrfOptions.tokenKey
        }),
      setupWeb: setupCSRFWeb<any>(csrfOptions)
    };
  }

  /**
   * Setup CSRF Web
   * @param {ICSRFMiddleware} options - csrf options
   * @returns {(handler: GetServerSideProps<P>) => GetServerSideProps<P>}
   */
  public setupCSRFWeb<P>(
    options: ICSRFMiddleware
  ): (handler: GetServerSideProps<P>) => GetServerSideProps<P> {
    return (handler: GetServerSideProps<P>): GetServerSideProps<P> =>
      CSRFSetupWebHelper<P>(handler, {
        cookieOptions: options.cookieOptions,
        csrfSecret: options.csrfSecret,
        secret: options.secret,
        tokenKey: options.tokenKey
      });
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
