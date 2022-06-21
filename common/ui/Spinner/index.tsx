import clsx from 'clsx';

import { SpinnerProps } from '../../libs/interface';

import styles from './Spinner.module.scss';

const Spinner: React.FC<SpinnerProps> = ({ classes, ...props }) => {
  return (
    <div className={clsx(styles.spinnerContainer, classes?.root)} {...props}>
      <div className={clsx(styles.spinner, classes?.spinner)} />
    </div>
  );
};

export default Spinner;
