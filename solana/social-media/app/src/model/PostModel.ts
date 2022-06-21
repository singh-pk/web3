import dayjs from 'dayjs';

import type { Post } from '../libs/types/components';
import type { ProgramAccountReturn } from '@web3/social-media/libs/types';

dayjs.extend(require('dayjs/plugin/relativeTime'));

class PostModel implements Post {
  author: String;
  content: String;
  topic: String;
  publicKey: String;
  timestamp: any;

  constructor(obj: ProgramAccountReturn) {
    this.publicKey = obj.publicKey.toString();
    this.author = obj.account.author.toString();
    this.timestamp = obj.account.timestamp;
    this.topic = obj.account.topic;
    this.content = obj.account.content;
  }

  get authorDisplay() {
    const author = this.author;
    return author.slice(0, 4) + '..' + author.slice(-4);
  }

  get createdBefore() {
    return (dayjs.unix(this.timestamp) as any).fromNow();
  }

  static from(obj: ProgramAccountReturn): Post {
    return new PostModel(obj);
  }

  static fromAll(obj: ProgramAccountReturn[]): Post[] {
    return obj?.map((data: any) => new PostModel(data)) ?? [];
  }
}

export default PostModel;
