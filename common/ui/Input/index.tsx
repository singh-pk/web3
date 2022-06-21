import { FC } from 'react';
import clsx from 'clsx';

import type { InputProps } from '@web3/common/libs/interface';

import Button from '../Button';

import classes from './Input.module.scss';

const Input: FC<InputProps> = ({
  icon: Icon,
  value,
  buttonProps,
  ...props
}) => {
  return (
    <div
      className={clsx(
        classes.inputContainer,
        !!value?.toString().length && classes.populatedTopics
      )}
    >
      <Icon className={classes.icon} />

      <input className={clsx(classes.input)} value={value} {...props} />

      {!!buttonProps && (
        <Button
          {...buttonProps}
          className={classes.inputBtn}
          disabled={!value?.toString().length}
        >
          {buttonProps.text}
        </Button>
      )}
    </div>
  );
};

export default Input;
