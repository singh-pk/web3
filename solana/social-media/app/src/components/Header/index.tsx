import { FC, memo } from 'react';

import { HeaderProps } from '../../libs/interface/components';

import classes from './Header.module.scss';

const Header: FC<HeaderProps> = ({ headerText }) => {
  return <div className={classes.header}>{headerText}</div>;
};

export default memo(Header);
