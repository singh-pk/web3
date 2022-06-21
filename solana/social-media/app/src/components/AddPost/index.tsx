import { FC, useState, useRef, useEffect } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import type { AddPostProps } from '../../libs/interface/components';

import Input from '@web3/common/ui/Input';
import Button from '@web3/common/ui/Button';

import { HashtagIcon } from '../../assets';

import classes from './AddPost.module.scss';

const AddPost: FC<AddPostProps> = ({ isWalletConnected, addPost }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useAnchorWallet();

  const handleChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLTextAreaElement;

    if (value.length > 280) {
      setContent(value.substring(0, 280));
    } else {
      setContent(value);
    }
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setContent(value.trim());
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await addPost?.(topics, content, wallet?.publicKey);
    setTopics('');
    setContent('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '0px';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <form className={classes.addPost} onSubmit={handleSubmit}>
      {!isWalletConnected ? (
        'Connect your wallet to start posting...'
      ) : (
        <>
          <textarea
            ref={ref}
            className={classes.textarea}
            onChange={handleChange}
            onBlur={handleBlur}
            value={content}
            placeholder="What's happening?"
          />

          <div className={classes.topics}>
            <Input
              icon={HashtagIcon}
              type='text'
              value={topics}
              onChange={(e: React.SyntheticEvent) =>
                setTopics((e.target as HTMLInputElement).value)
              }
              placeholder='Topics'
            />

            <div className={classes.actions}>
              <span>{280 - content.length} left</span>
              <Button
                isLoading={isLoading}
                disabled={isLoading || !content.trim().length}
              >
                Add Post
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default AddPost;
