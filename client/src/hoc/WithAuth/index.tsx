import React, { FC } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';

import Auth from '../../component/Auth';

import classes from './WithAuth.module.scss';

interface WithAuthProps {
  children: JSX.Element;
}

const WithAuth: FC<WithAuthProps> = ({ children }): JSX.Element => {
  const wallet = useWallet();

  return !wallet.connected ? (
    <Auth
      isLoading={wallet.connecting}
      spinnerProps={{ classes: { root: classes.spinnerContainer } }}
    />
  ) : (
    children
  );
};

export default WithAuth;
