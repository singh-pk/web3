import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import type { PostsProps } from '../../libs/interface/components';
import type { Post } from '../../libs/types/components';
import { USERS, TOPICS } from '../../utils/constants/ROUTE_CONST';
import { getOrderedListByTimestamp } from '../../utils';

import WithSpinner from '@web3/common/hoc/WithSpinner';

import classes from './Posts.module.scss';

const Posts: FC<PostsProps> = ({ posts }) => {
  const orderedPosts: Post[] = useMemo(
    () => getOrderedListByTimestamp(posts),
    [posts]
  );

  return (
    <>
      {orderedPosts.map((post, idx) => (
        <div key={idx} className={clsx(classes.post, 'font-sm')}>
          <div className={classes.postDetails}>
            <Link
              to={`${USERS}?q=${post.author}`}
              className='font-bold color-primary'
            >
              {post.authorDisplay}
            </Link>
            <span
              className={clsx(classes.postDetailsSeparator, 'color-secondary')}
            >
              ·
            </span>
            <span className='color-secondary'>{post.createdBefore}</span>
          </div>

          <div className={classes.postContent}>{post.content}</div>

          {!!post.topic.length && (
            <div className={classes.postTopic}>
              <Link to={`${TOPICS}?q=${post.topic}`}>#{post.topic}</Link>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default WithSpinner(Posts);
