import SocialMedia from '@web3/social-media-client';

import WithAuth from './hoc/WithAuth';

import { GithubIcon, LinkedInIcon } from './assets';

import classes from './App.module.scss';

const links = [
  {
    icon: GithubIcon,
    fill: '#fff',
    height: 28,
    path: 'https://github.com/singh-pk/web3'
  },
  {
    icon: LinkedInIcon,
    fill: '#fff',
    height: 30,
    path: 'https://linkedin.com/in/pksn'
  }
];

const App = () => {
  return (
    <div className={classes.app}>
      <WithAuth>
        <SocialMedia />
      </WithAuth>

      <div className={classes.links}>
        {links.map(({ icon: Icon, fill, height, path }, i) => (
          <a target='_blank' href={path} rel='noreferrer'>
            <Icon key={i} fill={fill} height={height} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;
