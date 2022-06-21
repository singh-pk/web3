import type { Program } from '@project-serum/anchor';
import type { SocialMedia } from '@web3/social-media/target/types/social_media';
import type { Post } from '../../types/components';

interface UsePostProps {
  fn: (...args: any) => Promise<Post[] | Post>;
  resultModifier?: (result: any) => any;
}

interface UsePostResult {
  posts: Post[];
  getPosts: ((...getPostsArgs: any) => Promise<void>) | undefined;
  addPost: ((...addPostArgs: any) => Promise<void>) | undefined;
  isLoading: Boolean;
  program: Program<SocialMedia> | null;
}

export type { UsePostProps, UsePostResult };
