package com.bankapp.simplebankingapp.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Deque;
import java.util.LinkedList;

@Data
public class Account {
    private final long id;
    private final String ownerName;
    private BigDecimal balance = BigDecimal.ZERO;
    private final Deque<String> transfers = new LinkedList<>();
}