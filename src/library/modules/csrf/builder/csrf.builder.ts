import { sign } from 'cookie-signature';
import {
  GetServerSideProps,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse
} from 'next';

import BuilderAbstract from '@/library/abstract/builder.abstract';
import { VerifiedIsNotEmpty } from '@/library/helper/validator.helper';
import { CSRF_DEFAULT_OPTIONS } from '@/library/modules/csrf/constant/csrf.constant';
import CSRFGenerator from '@/library/modules/csrf/helper/csrf-generator.helper';
import {
  CSRFSetupAPIHelper,
  CSRFSetupWebHelper
} from '@/library/modules/csrf/helper/csrf-setup.helper';
import CSRFTokens from '@/library/modules/csrf/helper/csrf-tokens.helper';
import {
  ICSRFBuilder,
  ICSRFMiddleware,
  ICSRFOptions
} from '@/library/modules/csrf/interface/csrf.interface';

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
   * Setter Options
   * @param {ICSRFOptions} option - user options
   * @returns {CSRFBuilder}
   */
  public setOptions(option: ICSRFOptions): this {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    this.options = {
      ...CSRF_DEFAULT_OPTIONS,
      ...option
    };

    this.options.cookieOptions.expires = date;
    return this;
  }

  /**
   * CSRF Decorator
   * @param {ICSRFMiddleware} csrfOptions - csrf option
   * @returns {MethodDecorator}
   */
  private csrfDecorator(csrfOptions: ICSRFMiddleware): MethodDecorator {
    return <T = NextApiHandler>(
      _: Record<string, unknown>,
      __: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ) => {
      const clone = { ...descriptor };
      const childFunction = (clone.value as unknown) as NextApiHandler;

      if (VerifiedIsNotEmpty(clone.value)) {
        clone.value = (((
          request: NextApiRequest,
          response: NextApiResponse
        ) => {
          CSRFGenerator(
            (req, res) => childFunction.apply(this, [req, res]),
            csrfOptions
          )(request, response);
        }) as unknown) as T;
      }

      return clone;
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
   * Execute
   * @returns {ICSRFBuilder}
   */
  execute(): ICSRFBuilder {
    const { csrfDecorator, options, setupCSRFWeb } = this;

    // generate CSRF secret
    const csrfSecret = CSRFTokens.getInstance().secretSync();

    // generate CSRF token
    const csrfToken = sign(
      CSRFTokens.getInstance().create(csrfSecret),
      options.secret
    );

    // generate options for the csrf middleware
    const csrfOptions: ICSRFMiddleware = {
      ...options,
      csrfSecret
    };

    // generate middleware to verify CSRF token with the CSRF as parameter
    return {
      csrf: (handler: NextApiHandler) => CSRFGenerator(handler, csrfOptions),
      csrfDecorator: csrfDecorator(csrfOptions),
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
