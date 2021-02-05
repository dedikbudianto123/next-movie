import { GetServerSideProps } from 'next';

import { VerifiedKeyIsExist } from '@/library/helper/validator.helper';
import { IDefaultPageProps } from '@/library/interface/general/base.interface';
import { csrfToken, setupWeb } from '@/library/modules/csrf';
import { ErrorApps } from '@/library/modules/error';
import { DEFAULT_PROPS_ERROR } from '@/library/modules/page-generator/constant';
import { IDefaultServerSideProps } from '@/library/modules/page-generator/interface';

/**
 * Generate Server Side Props
 * @param {string} path - folder path
 * @param {boolean} withRedux - using redux on client side
 * @returns {GetServerSideProps<IDefaultPageProps>}
 */
export const GenerateServerSideProps = (
  getServerSideProps: GetServerSideProps
): GetServerSideProps<IDefaultServerSideProps> => async (param) => {
  try {
    const response = await setupWeb(getServerSideProps)(param);

    if (VerifiedKeyIsExist(response, `props`)) {
      const { base, ...res } = (response as any).props as IDefaultPageProps;

      return {
        props: {
          ...res,
          base: {
            ...base,
            csrfToken,
            withRedux: true
          },
          seo: {}
        }
      };
    }

    throw new ErrorApps(500, `Props Not Found`);
  } catch (e) {
    if (e instanceof Error || e instanceof ErrorApps) {
      return {
        ...DEFAULT_PROPS_ERROR,
        props: {
          ...(DEFAULT_PROPS_ERROR as any).props
        }
      };
    }

    return DEFAULT_PROPS_ERROR;
  }
};
