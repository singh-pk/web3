import WalletConnectButton from '@web3/common/ui/WalletConnectButton';
import WithSpinner from '@web3/common/hoc/WithSpinner';

import classes from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={classes.auth}>
      <div className={classes.header}>Hello, Fellow Wanderer! 👋</div>
      <div className={classes.subHeader}>
        💳 Please connect your wallet to continue 💳
      </div>

      <div className={classes.btnContainer}>
        <WalletConnectButton />
      </div>

      <div>
        * This is a demo application. Make sure you have airdropped some SOL in{' '}
        <strong>devnet</strong>.
      </div>
    </div>
  );
};

export default WithSpinner(Auth);
