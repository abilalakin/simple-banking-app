import { useState, type FormEvent } from "react";
import type { Account } from "../types/Account";
import { deposit, withdraw, transfer } from "../services/accountService";

interface AccountCardProps {
  account: Account;
  onTransactionSuccess: () => void;
}

const AccountCard = ({ account, onTransactionSuccess }: AccountCardProps) => {
  const [amount, setAmount] = useState("");
  const [transferToId, setTransferToId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const handleDeposit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deposit(account.id, Number(amount));
      onTransactionSuccess();
      setAmount("");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleWithdraw = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await withdraw(account.id, Number(amount));
      onTransactionSuccess();
      setAmount("");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await transfer(account.id, Number(transferToId), Number(transferAmount));
      onTransactionSuccess();
      setTransferToId("");
      setTransferAmount("");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6">
      {/* Account Info Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            {account.ownerName}
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Account ID: {account.id}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg text-slate-300">Balance</p>
          <p className="text-3xl font-bold text-green-400">
            ${account.balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transaction Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deposit & Withdraw Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex gap-4">
            <button
              onClick={handleDeposit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Withdraw
            </button>
          </div>
        </form>

        {/* Transfer Form */}
        <form onSubmit={handleTransfer} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={transferToId}
              onChange={(e) => setTransferToId(e.target.value)}
              placeholder="To Account ID"
              className="w-1/2 bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Amount"
              className="w-1/2 bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Transfer
          </button>
        </form>
      </div>

      {/* Transfer History */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-bold mb-2">Outgoing Transfer History</h3>
        {account.transfers.length > 0 ? (
          <ul className="list-disc list-inside font-mono text-sm text-slate-400">
            {account.transfers.map((transfer, index) => (
              <li key={`${account.id}-transfer-${index}`}>{transfer}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            No recent outgoing transfers.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountCard;
