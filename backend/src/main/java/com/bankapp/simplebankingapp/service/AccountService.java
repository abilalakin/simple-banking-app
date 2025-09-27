package com.bankapp.simplebankingapp.service;

import com.bankapp.simplebankingapp.model.Account;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * This service class holds all the core business logic for the bank.
 * It also manages the in-memory storage of accounts.
 */
@Service
public class AccountService {

    private final ConcurrentHashMap<Long, Account> accounts = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong();
    private static final int MAX_TRANSFERS = 50;

    public Account createAccount(String ownerName) {
        if (ownerName == null || ownerName.isBlank()) {
            throw new IllegalArgumentException("Owner name cannot be empty.");
        }
        long newId = idCounter.incrementAndGet();
        Account account = new Account(newId, ownerName);
        accounts.put(newId, account);
        return account;
    }

    public Optional<Account> getAccount(long id) {
        return Optional.ofNullable(accounts.get(id));
    }

    public Collection<Account> getAllAccounts() {
        return accounts.values();
    }

    public Account deposit(long accountId, BigDecimal amount) {
        Account account = getAccount(accountId).orElseThrow(() -> new IllegalArgumentException("Account not found."));
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive.");
        }
        synchronized (account) {
            account.setBalance(account.getBalance().add(amount));
        }
        return account;
    }

    public Account withdraw(long accountId, BigDecimal amount) {
        Account account = getAccount(accountId).orElseThrow(() -> new IllegalArgumentException("Account not found."));
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive.");
        }
        synchronized (account) {
            if (account.getBalance().compareTo(amount) < 0) {
                throw new IllegalArgumentException("Insufficient funds.");
            }
            account.setBalance(account.getBalance().subtract(amount));
        }
        return account;
    }

    public void transfer(long fromId, long toId, BigDecimal amount) {
        Account fromAccount = getAccount(fromId)
                .orElseThrow(() -> new IllegalArgumentException("Source account not found."));
        Account toAccount = getAccount(toId)
                .orElseThrow(() -> new IllegalArgumentException("Destination account not found."));

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Transfer amount must be positive.");
        }

        Object lock1 = fromId < toId ? fromAccount : toAccount;
        Object lock2 = fromId < toId ? toAccount : fromAccount;

        synchronized (lock1) {
            synchronized (lock2) {
                if (fromAccount.getBalance().compareTo(amount) < 0) {
                    throw new IllegalArgumentException("Insufficient funds for transfer.");
                }
                fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
                toAccount.setBalance(toAccount.getBalance().add(amount));

                String transferRecord = String.format("Transferred %s to account %d", amount, toId);
                if (fromAccount.getTransfers().size() >= MAX_TRANSFERS) {
                    fromAccount.getTransfers().removeFirst();
                }
                fromAccount.getTransfers().addLast(transferRecord);
            }
        }
    }
}