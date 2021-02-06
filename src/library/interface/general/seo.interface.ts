/**
 * Seo Handler Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @description
 * @since 2021.02.06
 */
export type ISeoHandler<Parameter> = (p: Parameter) => Promise<ISeoProps>;

/**
 * SEO Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export interface ISeoProps {
  linkTag?: React.LinkHTMLAttributes<HTMLLinkElement>[];
  metaTag?: React.MetaHTMLAttributes<HTMLMetaElement>[];
  title?: string;
}
