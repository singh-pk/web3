import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai';
import { SocialMedia } from '../target/types/social_media';
import {
  fetchPostsByTopic,
  fetchPostsByUser,
  fetchPosts,
  sendPost
} from '../service';

const { AnchorProvider, setProvider, workspace } = anchor;

describe('Tests: Social Media', () => {
  const provider = AnchorProvider.env();
  setProvider(provider);

  const program = workspace.SocialMedia as Program<SocialMedia>;

  it('sending a post', async () => {
    const content = 'Goku is the most powerful Saiyan';
    const topic = 'dbz';

    const postAccount = await sendPost(
      program,
      topic,
      content,
      provider.wallet.publicKey
    );

    expect(postAccount.author.toBase58()).to.equal(
      provider.wallet.publicKey.toBase58()
    );
    expect(postAccount.content).to.equal(content);
    expect(postAccount.topic).to.equal(topic);
    expect(postAccount.timestamp);
  });

  it('sending a post without topic', async () => {
    const content = 'Goku is the most powerful Saiyan';
    const topic = '';

    const postAccount = await sendPost(
      program,
      topic,
      content,
      provider.wallet.publicKey
    );

    expect(postAccount.author.toBase58()).to.equal(
      provider.wallet.publicKey.toBase58()
    );
    expect(postAccount.content).to.equal(content);
    expect(postAccount.topic).to.equal(topic);
    expect(postAccount.timestamp);
  });

  it('content should not be empty', async () => {
    const content = '';
    const topic = '';

    try {
      await sendPost(program, topic, content, provider.wallet.publicKey);
    } catch (err) {
      expect(err.error.errorMessage).to.equal('Content should not be empty.');
    }
  });

  it('content should not be longer than 280 characters', async () => {
    const content = 't'.repeat(281);
    const topic = 'test';

    try {
      await sendPost(program, topic, content, provider.wallet.publicKey);
    } catch (err) {
      expect(err.error.errorMessage).to.equal(
        'Content should not be longer than 280 characters.'
      );
    }
  });

  it('topic should not be longer than 12 characters', async () => {
    const content = 'Testing out topic';
    const topic = 't'.repeat(13);

    try {
      await sendPost(program, topic, content, provider.wallet.publicKey);
    } catch (err) {
      expect(err.error.errorMessage).to.equal(
        'Topic should not be longer than 12 characters.'
      );
    }
  });

  it('can fetch all posts', async () => {
    const posts = await fetchPosts(program);
    expect(posts.length).greaterThan(1);
  });

  it('can fetch posts from a particular user', async () => {
    const allPostsByAuthor = await fetchPostsByUser(
      program,
      provider.wallet.publicKey.toString()
    );

    expect(allPostsByAuthor.length).greaterThan(0);
    expect(
      allPostsByAuthor.every(
        postAccount =>
          postAccount.account.author.toBase58() ===
          provider.wallet.publicKey.toBase58()
      )
    ).to.be.true;
  });

  it('can fetch posts by a particular topic', async () => {
    const allPostsByTopic = await fetchPostsByTopic(program, 'dbz');

    expect(allPostsByTopic.length).greaterThan(0);
    expect(
      allPostsByTopic.every(postAccount => postAccount.account.topic === 'dbz')
    ).to.be.true;
  });
});
