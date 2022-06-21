import type { Post } from '../../types/components';
import type { InputProps } from '@web3/common/libs/interface';
import type { web3 } from '@project-serum/anchor';

interface HeaderProps {
  headerText: String;
}

interface PostsProps {
  posts: Post[];
}

interface AddPostProps {
  isWalletConnected: Boolean;
  addPost: ((...addPostArgs: any) => Promise<void>) | undefined;
}

interface LayoutProps extends PostsProps {
  headerProps: HeaderProps;
  addPostProps?: AddPostProps;
  searchBarProps?: InputProps;
  isLoading: Boolean;
}

export type { HeaderProps, PostsProps, LayoutProps, AddPostProps };
