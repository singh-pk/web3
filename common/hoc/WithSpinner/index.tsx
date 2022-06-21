import type { ComponentType, FC } from 'react';

import Spinner from '../../ui/Spinner';

import { SpinnerProps } from '../../libs/interface';

type WithSpinnerProps<T> = T & {
  spinnerProps?: SpinnerProps;
  isLoading: Boolean;
};

function WithSpinner<T>(WrappedComponent: ComponentType<T>) {
  return (props: WithSpinnerProps<T>) => {
    const { isLoading, spinnerProps } = props;

    return isLoading ? (
      <Spinner {...spinnerProps} />
    ) : (
      <WrappedComponent {...(props as T)} />
    );
  };
}

export default WithSpinner;
