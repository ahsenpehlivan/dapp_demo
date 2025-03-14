import React, { useEffect, useState } from "react";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ContractInfo from "./components/ContractInfo";
import ContractActions from "./components/ContractActions";
import { requestAccount } from "./utils/contractServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => { //trigger metamask pop up
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => { //listener
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <div className="app">
      <ToastContainer />
      {!account ? (
        <ConnectWalletButton setAccount={setAccount} />
      ) : (
        <div className="contract-interactions">
          <ContractInfo account={account} />
          <ContractActions />
        </div>
      )}
    </div>
  );
}

export default App;