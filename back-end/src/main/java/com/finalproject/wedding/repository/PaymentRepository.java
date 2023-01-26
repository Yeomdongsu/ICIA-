package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Planner;
import com.finalproject.wedding.entity.Refund;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Refund, String> {
}
