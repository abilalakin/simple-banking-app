package com.bankapp.simplebankingapp.service;

import com.bankapp.simplebankingapp.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;

class AccountServiceTest {

    private AccountService accountService;

    @BeforeEach
    void setUp() {
        accountService = new AccountService();
    }

    @Test
    void shouldCreateAccountSuccessfully() {
        // Arrange: Prepare the input data
        String ownerName = "John Doe";

        // Act: Call the method under test
        Account createdAccount = accountService.createAccount(ownerName);

        // Assert: Verify the results
        assertNotNull(createdAccount, "The created account should not be null");
        assertEquals(ownerName, createdAccount.getOwnerName(), "The owner's name should match");
        assertEquals(BigDecimal.ZERO, createdAccount.getBalance(), "The initial balance should be zero");
        assertTrue(createdAccount.getId() > 0, "The account ID should be positive");
    }

    @Test
    void shouldThrowExceptionWhenOwnerNameIsEmpty() {
        // Arrange
        String ownerName = "";

        // Act & Assert: Verify that an exception is thrown
        assertThrows(IllegalArgumentException.class, () -> {
            accountService.createAccount(ownerName);
        }, "Should throw IllegalArgumentException for an empty owner name");
    }
}