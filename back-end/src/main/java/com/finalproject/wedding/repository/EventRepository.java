package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, String> {
    Event findByEidx(int eidx);

    Page<Event> findByEidxGreaterThan(int i, Pageable pb);
}
