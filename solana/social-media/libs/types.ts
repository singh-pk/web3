import type {
  IdlTypes,
  Program,
  ProgramAccount,
  web3
} from '@project-serum/anchor';

import type { TypeDef } from '@project-serum/anchor/dist/cjs/program/namespace/types';
import type { IdlAccountDef } from '@project-serum/anchor/dist/cjs/idl';
import type { SocialMedia } from '../target/types/social_media';

type ProgramStruct = TypeDef<
  SocialMedia['accounts'] extends undefined
    ? IdlAccountDef
    : NonNullable<SocialMedia['accounts']>[number],
  IdlTypes<SocialMedia>
>;

type ProgramAccountReturn = ProgramAccount<ProgramStruct>;

export type { ProgramStruct, ProgramAccountReturn };
