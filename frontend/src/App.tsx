import { useState, useEffect } from "react";
import type { Account } from "./types/Account";
import { getAccounts } from "./services/accountService";
import AccountCard from "./components/AccountCard";
import CreateAccountForm from "./components/CreateAccountForm";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAccountCreated = (newAccount: Account) => {
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  };

  const handleTransactionSuccess = () => {
    fetchAccounts(); // Refresh account data after a transaction
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Fast & Reckless Bank
      </h1>

      <main className="max-w-4xl mx-auto">
        <CreateAccountForm onAccountCreated={handleAccountCreated} />

        <div className="grid grid-cols-1 gap-6 mt-8">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onTransactionSuccess={handleTransactionSuccess}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
