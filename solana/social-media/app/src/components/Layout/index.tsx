import { FC } from 'react';

import type { LayoutProps } from '../../libs/interface/components';

import Header from '../Header';
import Posts from '../Posts';
import AddPost from '../AddPost';
import Input from '@web3/common/ui/Input';

const Layout: FC<LayoutProps> = ({
  headerProps,
  addPostProps,
  searchBarProps,
  posts,
  isLoading
}) => {
  return (
    <>
      <Header {...headerProps} />

      {!!addPostProps && <AddPost {...addPostProps} />}

      {!!searchBarProps && (
        <Input
          {...searchBarProps}
          style={{ borderRadius: 0, height: 56, paddingLeft: 50 }}
        />
      )}

      <Posts posts={posts} isLoading={isLoading} />
    </>
  );
};

export default Layout;
