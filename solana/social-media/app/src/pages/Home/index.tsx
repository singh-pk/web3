import { useEffect } from 'react';

import Layout from '../../components/Layout';
import PostModel from '../../model/PostModel';

import usePost from '../../hooks/usePost';

import { fetchPosts, sendPost } from '@web3/social-media/service';

const Home = () => {
  const { posts, getPosts, addPost, isLoading, program } = usePost([
    { fn: fetchPosts, resultModifier: PostModel.fromAll },
    { fn: sendPost, resultModifier: PostModel.from }
  ]);

  useEffect(() => {
    if (!posts.length && program && getPosts) getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, getPosts]);

  return (
    <Layout
      headerProps={{ headerText: 'Home' }}
      posts={posts}
      addPostProps={{ isWalletConnected: !!program, addPost }}
      isLoading={isLoading}
    />
  );
};

export default Home;
