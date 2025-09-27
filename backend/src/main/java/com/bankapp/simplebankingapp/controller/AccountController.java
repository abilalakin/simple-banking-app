package com.bankapp.simplebankingapp.controller;

import com.bankapp.simplebankingapp.model.Account;
import com.bankapp.simplebankingapp.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Collection;

record CreateAccountRequest(String ownerName) {
}

record TransactionRequest(BigDecimal amount) {
}

record TransferRequest(long toAccountId, BigDecimal amount) {
}

/**
 * This controller handles all incoming web requests related to bank accounts.
 * It exposes endpoints for creating, viewing, and managing accounts.
 */
@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public Account createAccount(@RequestBody CreateAccountRequest request) {
        return accountService.createAccount(request.ownerName());
    }

    @GetMapping
    public Collection<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable long id) {
        return accountService.getAccount(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/deposit")
    public Account deposit(@PathVariable long id, @RequestBody TransactionRequest request) {
        return accountService.deposit(id, request.amount());
    }

    @PostMapping("/{id}/withdraw")
    public Account withdraw(@PathVariable long id, @RequestBody TransactionRequest request) {
        return accountService.withdraw(id, request.amount());
    }

    @PostMapping("/{id}/transfer")
    public ResponseEntity<Void> transfer(@PathVariable long id, @RequestBody TransferRequest request) {
        accountService.transfer(id, request.toAccountId(), request.amount());
        return ResponseEntity.ok().build();
    }
}