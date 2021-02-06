import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import BuilderAbstract from '@/library/abstract/builder.abstract';
import { IDefaultBussinessLayer } from '@/library/abstract/interface';
import { ISeoHandler, ISeoProps } from '@/library/interface/general';
import { csrfToken, setupWeb } from '@/library/modules/csrf';
import { IDefaultServerSideProps } from '@/library/modules/page-generator/interface';

type paramHandler<P> = (
  param: GetServerSidePropsContext<ParsedUrlQuery>
) => IDefaultBussinessLayer<P>;

/**
 * Server Side Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.06
 */
class ServerSideBuilder<P> extends BuilderAbstract<
  GetServerSideProps<IDefaultServerSideProps>
> {
  private businessLayerHandler?: paramHandler<P>;

  private seoHandler?: ISeoHandler<P>;

  constructor() {
    super();

    this.generateProps = this.generateProps.bind(this);
    this.generateSEO = this.generateSEO.bind(this);
    this.execute = this.execute.bind(this);
  }

  /**
   * Set Business Layer
   * @param {paramHandler<P>} handler - handler for generate props
   * @returns {ServerSideBuilder}
   */
  public setBusinessLayer(handler: paramHandler<P>): this {
    this.businessLayerHandler = handler;

    return this;
  }

  /**
   * Set Business Layer
   * @param {ISeoHandler<P>} handler - handler for generate seo props
   * @returns {ServerSideBuilder}
   */
  public setSEOHandler(handler: ISeoHandler<P>): this {
    this.seoHandler = handler;

    return this;
  }

  /**
   * Generate Props
   * @param {GetServerSidePropsContext<ParsedUrlQuery>} context - server side props
   * @returns {Promise<P>}
   */
  private generateProps(
    param: GetServerSidePropsContext<ParsedUrlQuery>
  ): Promise<P> {
    const { businessLayerHandler } = this;

    return businessLayerHandler(param).execute();
  }

  /**
   * Generate SEO
   * @param {P} props - page props
   * @returns {Promise<ISeoProps>}
   */
  private async generateSEO(param: P): Promise<ISeoProps> {
    const { seoHandler } = this;

    return seoHandler(param);
  }

  /**
   * Execute Builder
   * @returns {GetServerSideProps<IDefaultServerSideProps>}
   */
  execute(): GetServerSideProps<IDefaultServerSideProps> {
    const { generateProps, generateSEO } = this;

    /**
     * Fn
     * @param {GetServerSidePropsContext<ParsedUrlQuery>} context - server side props
     * @returns {Promise<GetServerSidePropsResult>}
     */
    const fn: GetServerSideProps = async (context) => {
      const props = await generateProps(context);

      return {
        props: {
          ...props,
          base: {
            csrfToken,
            language: `en`
          },
          seo: await generateSEO(props)
        }
      };
    };

    return setupWeb(fn);
  }
}

export default ServerSideBuilder;
