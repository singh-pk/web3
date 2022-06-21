import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import WalletConnectButton from '@web3/common/ui/WalletConnectButton';

import { HOME, TOPICS, USERS } from '../../utils/constants/ROUTE_CONST';
import {
  HomeIcon,
  HomeActiveIcon,
  TopicsIcon,
  TopicsActiveIcon,
  UsersIcon,
  UsersActiveIcon,
  SocialIcon
} from '../../assets';

import classes from './Sidebar.module.scss';

const navElements = [
  { label: 'Home', path: HOME, icon: HomeIcon, activeIcon: HomeActiveIcon },
  {
    label: 'Topics',
    path: TOPICS,
    icon: TopicsIcon,
    activeIcon: TopicsActiveIcon
  },
  { label: 'Users', path: USERS, icon: UsersIcon, activeIcon: UsersActiveIcon }
];

const Sidebar = () => {
  return (
    <aside className={classes.sidebarContainer}>
      <nav className={classes.sidebar}>
        <SocialIcon height={40} width={40} className={classes.appIcon} />

        {navElements.map(({ label, path, icon, activeIcon }) => (
          <NavLink className={classes.navlink} key={label} to={path}>
            {({ isActive }) => {
              const IconComp = isActive ? activeIcon : icon;

              return (
                <div className={clsx(isActive && classes.active)}>
                  <span>
                    <IconComp height={28} width={28} />
                  </span>
                  <span>{label}</span>
                </div>
              );
            }}
          </NavLink>
        ))}

        <WalletConnectButton />
      </nav>
    </aside>
  );
};

export default Sidebar;
