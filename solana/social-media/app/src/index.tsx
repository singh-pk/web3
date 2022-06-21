import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Users from './pages/Users';

import { HOME, TOPICS, USERS } from './utils/constants/ROUTE_CONST';

import classes from './index.module.scss';

const SocialMedia = () => {
  return (
    <div className={classes.socialMedia}>
      <Sidebar />

      <main>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={TOPICS} element={<Topics />} />
          <Route path={USERS} element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export default SocialMedia;
