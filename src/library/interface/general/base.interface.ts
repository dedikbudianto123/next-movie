import { ILanguagePreset } from '@/library/interface/language/language.interface';

import { ISeoProps } from './seo.interface';

/**
 * Base Props Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export interface IBaseProps {
  csrfToken: string;
  language: ILanguagePreset;
  // TODO: will add aditional props
}

/**
 * Generate Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @description
 * @since 2021.02.05
 */
export interface IDefaultPageProps {
  base: IBaseProps;
  seo: ISeoProps;
}
