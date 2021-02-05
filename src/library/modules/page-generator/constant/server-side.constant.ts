import { GetServerSidePropsResult } from 'next';

import { IDefaulError500Props } from '@/app/views/error-500/interface';

export const DEFAULT_PROPS_ERROR: GetServerSidePropsResult<IDefaulError500Props> = {
  props: {
    base: {
      csrfToken: ``,
      language: `id`,
      withRedux: false
    },
    error: {
      message: `unknown error`
    },
    seo: {}
  }
};
