import Head from 'next/head';
import PropTypes from 'prop-types';
import { FC } from 'react';

import { IDefaultPageProps } from '@/library/interface/general';

/**
 * SEO Generator
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export const SEOHTMLGenerator: FC<IDefaultPageProps> = ({
  seo: { linkTag, metaTag, title }
}) => (
  <>
    <Head>
      {title && <title {...title} />}
      {linkTag &&
        linkTag.map(({ href, rel, ...res }) => (
          <link key={`${href}-${rel}`} href={href} rel={rel} {...res} />
        ))}
      {metaTag &&
        metaTag.map(({ content, name, ...res }) => (
          <meta
            key={`${content}-${name}`}
            content={content}
            name={name}
            {...res}
          />
        ))}
    </Head>
  </>
);

SEOHTMLGenerator.propTypes = {
  seo: PropTypes.shape({
    linkTag: PropTypes.arrayOf(PropTypes.shape({})),
    metaTag: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.shape({})
  }).isRequired
};
