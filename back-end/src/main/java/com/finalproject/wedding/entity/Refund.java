package com.finalproject.wedding.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "refund" )
@Data
public class Refund {
    @Id
    @Column(nullable = false)
    private String merchant_uid;
    @Column
    private int cancel_request_amount;
    @Column
    private String reason;
    @Column
    private String refund_holder;
    @Column
    private String refund_bank;
    @Column
    private String refund_account;
}
