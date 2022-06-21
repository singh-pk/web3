import { useState, useEffect } from 'react';
import type { web3 } from '@project-serum/anchor';

import Layout from '../../components/Layout';
import PostModel from '../../model/PostModel';

import useQuery from '@web3/common/hooks/useQuery';
import usePost from '../../hooks/usePost';

import { fetchPostsByUser } from '@web3/social-media/service';

import { KeyIcon } from '../../assets';

const Users = () => {
  const { posts, getPosts, isLoading, program } = usePost([
    { fn: fetchPostsByUser, resultModifier: PostModel.fromAll }
  ]);

  const [query, setQuery] = useQuery();
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    setUser(query.q ?? '');
  }, [query]);

  useEffect(() => {
    if (query.q?.length && program) getPosts?.(query.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, program]);

  const handleKeyBoardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.type === 'keyup' && e.code === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    if (query.q !== user) setQuery({ q: user });
  };

  return (
    <Layout
      headerProps={{ headerText: 'Users' }}
      posts={posts}
      searchBarProps={{
        icon: KeyIcon,
        placeholder: 'Public Key',
        value: user,
        onChange: e => setUser(e.target.value),
        onKeyUp: handleKeyBoardEvent,
        buttonProps: { text: 'Search' }
      }}
      isLoading={isLoading}
    />
  );
};

export default Users;
