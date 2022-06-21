import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import PostModel from '../../model/PostModel';

import useQuery from '@web3/common/hooks/useQuery';
import usePost from '../../hooks/usePost';

import { fetchPostsByTopic } from '@web3/social-media/service';

import { HashtagIcon } from '../../assets';

const Topics = () => {
  const { posts, getPosts, isLoading, program } = usePost([
    { fn: fetchPostsByTopic, resultModifier: PostModel.fromAll }
  ]);

  const [query, setQuery] = useQuery();
  const [topic, setTopic] = useState<string>('');

  useEffect(() => {
    setTopic(query.q ?? '');
  }, [query]);

  useEffect(() => {
    if (query.q?.length && program) getPosts?.(query.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, program]);

  const handleKeyBoardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.type === 'keyup' && e.code === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    if (query.q !== topic) setQuery({ q: topic });
  };

  return (
    <Layout
      headerProps={{ headerText: 'Topics' }}
      posts={posts}
      searchBarProps={{
        icon: HashtagIcon,
        placeholder: 'Topic',
        value: topic,
        onChange: e => setTopic(e.target.value),
        onKeyUp: handleKeyBoardEvent,
        buttonProps: { text: 'Search', onClick: handleSubmit }
      }}
      isLoading={isLoading}
    />
  );
};

export default Topics;
