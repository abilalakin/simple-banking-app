import type { Account } from "../types/Account";

const API_BASE_URL = "http://localhost:8080/api/accounts";

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const createAccount = async (ownerName: string): Promise<Account> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerName }),
  });
  if (!response.ok) {
    throw new Error("Failed to create account");
  }
  return response.json();
};

export const deposit = async (id: number, amount: number): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/${id}/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!response.ok) {
    throw new Error("Deposit failed");
  }
  return response.json();
};

export const withdraw = async (
  id: number,
  amount: number
): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/${id}/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Withdrawal failed");
  }
  return response.json();
};

export const transfer = async (
  fromId: number,
  toAccountId: number,
  amount: number
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${fromId}/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toAccountId, amount }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Transfer failed");
  }
};
