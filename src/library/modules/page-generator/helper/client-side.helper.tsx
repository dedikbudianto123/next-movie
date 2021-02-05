import { ComponentType, FC } from 'react';

import { IDefaultPageProps } from '@/library/interface/general/base.interface';
import { SEOHTMLGenerator } from '@/library/modules/seo/helper/seo-html.helper';

/**
 * Generate HTML
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export const GenerateHTML = (
  Component: ComponentType
): FC<IDefaultPageProps> => (props) => {
  const { seo } = props;
  try {
    return (
      <>
        <SEOHTMLGenerator {...seo} />
        <Component {...props} />
      </>
    );
  } catch (e) {
    return (
      <div>
        404 Error
        <br />
        <p>{e.message}</p>
      </div>
    );
  }
};
