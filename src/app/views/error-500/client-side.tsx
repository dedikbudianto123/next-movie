import PropTypes from 'prop-types';
import { FC, Validator } from 'react';

import {
  IDefaulError500Props,
  IError500
} from '@/app/views/error-500/interface';

/**
 * Error 500 Pages
 * @param {IDefaulError500Props} props - props page
 * @returns {ReactNode}
 */
const Error500Pages: FC<IDefaulError500Props> = ({
  error: { message, stack }
}) => (
  <>
    <h1>Error</h1>
    <p>{message}</p>
    {process.env.NEXT_PUBLIC_IS_DEVELOPMENT === `true` && stack && (
      <p>{stack}</p>
    )}
  </>
);

Error500Pages.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  }).isRequired as Validator<IError500>
};

Error500Pages.defaultProps = {
  error: undefined
};

export default Error500Pages;
