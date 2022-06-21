import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@project-serum/anchor';

export function getWorkspace({
  clusterUrl,
  idl
}: {
  clusterUrl: string;
  idl: any;
}) {
  const wallet = useAnchorWallet();

  if (!wallet) return {};

  const options = AnchorProvider.defaultOptions();
  const connection = new Connection(clusterUrl, options.commitment);
  const programID = new PublicKey(idl.metadata.address);

  const provider = new AnchorProvider(connection, wallet, options);

  const program = new Program(idl, programID, provider) as Program<typeof idl>;

  return {
    wallet,
    connection,
    provider,
    program
  };
}
