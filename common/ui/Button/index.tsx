import { FC } from 'react';
import clsx from 'clsx';

import type { ButtonProps } from '@web3/common/libs/interface';
import Spinner from '../Spinner';

import classes from './Button.module.scss';

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <button {...props} className={clsx(classes.button, props.className)}>
      {children}

      {isLoading && <Spinner classes={{ spinner: classes.btnSpinner }} />}
    </button>
  );
};

export default Button;
