import { useState } from 'react';

import useWorkspace from '@web3/common/hooks/useWorkspace';
import idl from '@web3/social-media/target/idl/social_media.json';
import { IDL } from '@web3/social-media/target/types/social_media';

import type { Post } from '../libs/types/components';
import type { UsePostProps, UsePostResult } from '../libs/interface/hooks';

function usePost(args: UsePostProps[]): UsePostResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { program } = useWorkspace({
    clusterUrl: 'https://api.devnet.solana.com',
    idl: IDL,
    address: idl.metadata.address
  });

  let getPosts;
  let addPost;

  for (const arg of args) {
    if (arg.fn.name.includes('fetchPosts')) {
      getPosts = async (...getPostsArgs: any) => {
        setIsLoading(true);
        const fnArgs = getPostsArgs.length > 0 ? getPostsArgs : [[]];
        const result = (await arg.fn(
          program,
          ...fnArgs,
          arg.resultModifier
        )) as Post[];
        setPosts(result ?? []);
        setIsLoading(false);
      };

      continue;
    }

    if (arg.fn.name.includes('sendPost')) {
      addPost = async (...addPostArgs: any) => {
        const result = (await arg.fn(
          program,
          ...addPostArgs,
          arg.resultModifier
        )) as Post;
        setPosts(d => [...d, result ?? []]);
      };
    }
  }

  return { posts, getPosts, addPost, isLoading, program };
}

export default usePost;
