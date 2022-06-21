import { useState, useEffect } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Idl } from '@project-serum/anchor';

function useWorkspace<T extends Idl>({
  clusterUrl,
  idl,
  address
}: {
  clusterUrl: string;
  idl: T;
  address: String;
}) {
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<typeof idl> | null>(null);

  useEffect(() => {
    if (wallet) {
      const options = AnchorProvider.defaultOptions();
      const connection = new Connection(clusterUrl, options.commitment);
      const programId = new PublicKey(address);
      const provider = new AnchorProvider(connection, wallet, options);

      setProgram(new Program(idl, programId, provider));
    }
  }, [wallet]);

  return { program, wallet };
}

export default useWorkspace;
