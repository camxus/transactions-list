import React, { useCallback, useState } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard, { WalletState } from "@web3-onboard/core";

import SendTransaction from "./SendTransaction";

const onboard = Onboard({
  wallets: [injectedModule()],
  chains: [
    {
      id: "123456",
      token: "ETH",
      label: "Local Ganache",
      rpcUrl: "http://localhost:8545",
    },
  ],
});

const Navigation: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>();

  const handleConnect = useCallback(async () => {
    const wallets = await onboard.connectWallet();

    const [metamaskWallet] = wallets;

    if (
      metamaskWallet.label === "MetaMask" &&
      metamaskWallet.accounts[0].address
    ) {
      setWallet(metamaskWallet);
    }
  }, []);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-ful text-sm py-4 bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap max-[320px]:block items-center justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="."
          >
            Transactions List
          </a>
        </div>

        <div className="flex gap-5 justify-end sm:justify-end flex-1 flex-row sm:items-center sm:pl-5">
          {wallet && (
            <>
              <SendTransaction />
              <p className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 text-sm">
                {wallet.accounts[0].address}
              </p>
            </>
          )}
          {!wallet && (
            <button
              type="button"
              onClick={handleConnect}
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
