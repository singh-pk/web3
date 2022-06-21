import { Program, web3 } from '@project-serum/anchor';
import * as bs58 from 'bs58';

import { PublicKey } from '@solana/web3.js';
import type { SocialMedia } from '../target/types/social_media';
import type { ProgramAccountReturn, ProgramStruct } from '../libs/types';

function fetchPosts(
  program: Program<SocialMedia>,
  filters?: Buffer | web3.GetProgramAccountsFilter[]
): Promise<ProgramAccountReturn[]>;
function fetchPosts<T>(
  program: Program<SocialMedia>,
  filters?: Buffer | web3.GetProgramAccountsFilter[],
  resultModifier?: (result: ProgramAccountReturn[]) => T
): Promise<T>;
async function fetchPosts<T>(
  program: Program<SocialMedia>,
  filters?: Buffer | web3.GetProgramAccountsFilter[],
  resultModifier?: (result: ProgramAccountReturn[]) => T
) {
  const result = await program.account.post.all(filters);
  return resultModifier?.(result) ?? result;
}

function fetchPostsByUser(
  program: Program<SocialMedia>,
  publicKey: string
): Promise<ProgramAccountReturn[]>;
function fetchPostsByUser<T>(
  program: Program<SocialMedia>,
  publicKey: string,
  resultModifier?: (result: ProgramAccountReturn[]) => T
): Promise<T>;
function fetchPostsByUser<T>(
  program: Program<SocialMedia>,
  publicKey: string,
  resultModifier?: (result: ProgramAccountReturn[]) => T
) {
  return fetchPosts<T>(
    program,
    [{ memcmp: { offset: 8, bytes: publicKey } }],
    resultModifier
  );
}

function fetchPostsByTopic(
  program: Program<SocialMedia>,
  topic: String
): Promise<ProgramAccountReturn[]>;
function fetchPostsByTopic<T>(
  program: Program<SocialMedia>,
  topic: String,
  resultModifier?: (result: ProgramAccountReturn[]) => T
): Promise<T>;
function fetchPostsByTopic<T>(
  program: Program<SocialMedia>,
  topic: String,
  resultModifier?: (result: ProgramAccountReturn[]) => T
) {
  return fetchPosts<T>(
    program,
    [{ memcmp: { offset: 52, bytes: bs58.encode(Buffer.from(topic)) } }],
    resultModifier
  );
}

function sendPost(
  program: Program<SocialMedia>,
  topic: string,
  content: string,
  author: PublicKey
): Promise<ProgramStruct>;
function sendPost<T>(
  program: Program<SocialMedia>,
  topic: string,
  content: string,
  author: PublicKey,
  resultModifier?: (result: ProgramAccountReturn) => T
): Promise<T>;
async function sendPost<T>(
  program: Program<SocialMedia>,
  topic: string,
  content: string,
  author: PublicKey,
  resultModifier?: (result: ProgramAccountReturn) => T
) {
  try {
    const post = web3.Keypair.generate();

    await program.methods
      .sendPost(topic, content)
      .accounts({ post: post.publicKey, author })
      .signers([post])
      .rpc();

    const result = await program.account.post.fetch(post.publicKey);

    if (resultModifier) {
      const modifiedResult = {
        publicKey: post.publicKey,
        account: result
      } as ProgramAccountReturn;

      return resultModifier(modifiedResult);
    }

    return result;
  } catch (err) {
    throw err;
  }
}

export { sendPost, fetchPosts, fetchPostsByUser, fetchPostsByTopic };
