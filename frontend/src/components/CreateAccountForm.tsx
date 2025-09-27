import { useState, type FormEvent } from "react";
import { createAccount } from "../services/accountService";
import type { Account } from "../types/Account";

interface CreateAccountFormProps {
  onAccountCreated: (newAccount: Account) => void;
}

const CreateAccountForm = ({ onAccountCreated }: CreateAccountFormProps) => {
  const [ownerName, setOwnerName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim()) {
      alert("Owner name cannot be empty.");
      return;
    }
    try {
      const newAccount = await createAccount(ownerName);
      onAccountCreated(newAccount);
      setOwnerName("");
    } catch (error) {
      console.error(error);
      alert("Failed to create account.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Account</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Enter owner's name"
          className="flex-grow bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
